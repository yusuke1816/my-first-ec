from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/qa')
def qa():
    return render_template('qa.html')

@app.route('/process')
def process():
    return render_template('process.html')

@app.route('/pay', methods=['GET', 'POST'])
def pay():
    if request.method == 'POST':
        # フォームのデータを受け取る
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        city = request.form.get('city')
        postal = request.form.get('postal')
        
        # 必要に応じて、データを処理（例: データベース保存、支払い処理など）

        # 注文完了画面にリダイレクト
        return redirect(url_for('success'))  # 成功ページへリダイレクト

    return render_template('pay.html')

@app.route('/success')
def success():
    return render_template('succsess.html')

if __name__ == '__main__':
    app.run(debug=True)
