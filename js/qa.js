// main.js

document.getElementById("qa-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const question = form.question.value.trim();

    if (!name || !email || !question) {
        alert("すべてのフィールドを入力してください！");
        return;
    }

    // フォームのデータを送信
    const formData = {
        name: name,
        email: email,
        question: question
    };

    fetch("/submit_question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Question submitted successfully!") {
            alert("ご質問ありがとうございました！送信が完了しました。");
            form.reset();
        } else {
            alert("送信に失敗しました。再試行してください。");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("送信中にエラーが発生しました。");
    });
});
