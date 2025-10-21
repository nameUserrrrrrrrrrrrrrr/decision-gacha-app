/// 選択肢を画面にレンダリング
function renderOptions() {
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";
    categories[currentCategory].forEach((item) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item;
        checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(item));
        container.appendChild(label);
    });
}

// 「ジャンル選択を表示」ボタンの処理（index.htmlのみ）
const showGenresBtn = document.getElementById("showGenresBtn");
if (showGenresBtn) {
    showGenresBtn.addEventListener("click", () => {
        const genreList = document.getElementById("genreList");
        if (genreList.classList.contains("hidden")) {
            genreList.classList.remove("hidden");
            setTimeout(() => {
                genreList.classList.add("show");
            }, 10);
        } else {
            genreList.classList.remove("show");
            genreList.classList.add("hidden");
        }
    });
}

// 新しい選択肢の追加
const addOptionBtn = document.getElementById("addOptionBtn");
if (addOptionBtn) {
    addOptionBtn.addEventListener("click", () => {
        const input = document.getElementById("customOptionInput");
        const val = input.value.trim();
        if (val) {
            if (!categories[currentCategory].includes(val)) {
                categories[currentCategory].push(val);
            }
            input.value = "";
            renderOptions();
        }
    });
}

// ガチャの実行処理
const gachaForm = document.getElementById("gachaForm");
if (gachaForm) {
    gachaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkedOptions = Array.from(document.querySelectorAll("#optionsContainer input[type=checkbox]:checked"))
            .map(el => el.value);

        if (checkedOptions.length === 0) {
            alert("選択肢を1つ以上選んでください");
            return;
        }

        fetch("/gacha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ options: checkedOptions })
        })
            .then(res => res.json())
            .then(data => {
                const resultArea = document.getElementById("resultArea");
                if (data.result) {
                    resultArea.textContent = `🎉 結果：${data.result}`;
                } else {
                    resultArea.textContent = `⚠️ エラー：${data.error}`;
                }
            })
            .catch(() => {
                alert("通信エラー");
            });
    });
}

// ページロード時に選択肢を描画（category.html 用）
if (typeof renderOptions === "function" && typeof categories !== "undefined") {
    renderOptions();
}
