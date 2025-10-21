from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# ジャンル一覧
CATEGORIES = {
    "food": "食べるもの",
    "place": "行き先",
    "play": "遊び",
    "activity": "何をするか",
    "custom": "カスタム"
}

# 初期選択肢（custom は空のリスト）
INITIAL_OPTIONS = {
    "food": ["ラーメン", "カレー", "寿司", "パスタ", "サラダ"],
    "place": ["公園", "映画館", "カフェ", "ショッピングモール", "美術館"],
    "play": ["カラオケ", "ボウリング", "散歩", "ゲームセンター", "カードゲーム"],
    "activity": ["読書", "ゲーム", "映画鑑賞"],
    "custom": []
}

@app.route('/')
def index():
    return render_template('index.html', categories=CATEGORIES)

@app.route('/category/<category>')
def category_page(category):
    if category not in CATEGORIES:
        return "存在しないジャンルです", 404
    options = INITIAL_OPTIONS.get(category, [])
    return render_template('category.html', category=category, category_name=CATEGORIES[category], options=options)

@app.route('/gacha', methods=['POST'])
def gacha():
    data = request.get_json()
    options = data.get('options', [])
    if not options:
        return jsonify({'error': '選択肢がありません'}), 400

    result = random.choice(options)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)

