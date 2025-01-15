from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# .envファイルの読み込み
load_dotenv()

app = Flask(__name__)

# メール設定（環境変数から取得）
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

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
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        city = request.form.get('city')
        postal = request.form.get('postal')
        return redirect(url_for('success'))
    return render_template('pay.html')

@app.route('/success')
def success():
    return render_template('succsess.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        question = request.form['question']
        
        subject = f"お問い合わせ: {name}さんより"
        body = f"名前: {name}\nメールアドレス: {email}\n\n質問内容:\n{question}"

        try:
            recipient = os.getenv('MAIL_RECIPIENT')  # 受信者のメールアドレスを環境変数から取得
            msg = Message(subject, recipients=[recipient])  # メール送信先
            msg.body = body
            mail.send(msg)
            # 成功メッセージを表示
            success_message = "お問い合わせが送信されました。"
            return render_template('contact.html', success_message=success_message)
        except Exception as e:
            # エラーメッセージを表示
            error_message = f"メール送信中にエラーが発生しました: {e}"
            return render_template('contact.html', error_message=error_message)

    return render_template('contact.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/main2')
def main2():
    # main2 ページを表示する処理
    return render_template('main2.html')




if __name__ == "__main__":
    app.run(port=5001)

