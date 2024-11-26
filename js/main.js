// 商品リストのデータ（在庫状況含む）
const products = [
    { id: 1, name: "シャツ", price: 2500, inStock: true },
    { id: 2, name: "ジーンズ", price: 3000, inStock: false },
    { id: 3, name: "ジャケット", price: 5000, inStock: false },
    { id: 4,name:"ジャケット",price:5000,inStock:true},
    { id: 5, name: "シャツ", price: 2500, inStock: true },
    { id: 6, name: "ジーンズ", price: 3000, inStock: false },
    { id: 7, name: "ジャケット", price: 5000, inStock: false },
    { id: 8,name:"ジャケット",price:5000,inStock:true},
    { id: 9, name: "シャツ", price: 2500, inStock: true },
    { id: 10, name: "ジーンズ", price: 3000, inStock: false },
];

// カートデータの取得
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ページの読み込み時に商品状態を設定
document.addEventListener("DOMContentLoaded", () => {
    const productElements = document.querySelectorAll('.product');

    productElements.forEach((productElement, index) => {
        const product = products[index];
        const button = productElement.querySelector('button');

        if (product.inStock) {
            button.textContent = "カートに追加";
            button.disabled = false;
        } else {
            button.textContent = "売り切れ";
            button.disabled = true; // 売り切れのボタンは無効に
        }

        // クリックイベントの追加
        button.addEventListener('click', () => {
            if (product.inStock) {
                addToCart(product);
            }
        });
    });

    // カートアイコンの更新
    updateCartIcon();
});

// カートへの追加
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartIcon();
    showAddedMessage();
}

// カートアイコンの更新
function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Update the cart icon with the number of items
}

// カートの中身を表示
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>カートに商品がありません。</p>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.innerText = `${item.name} - ¥${item.price}`;
            cartItems.appendChild(itemElement);
        });
    }
}

// 購入手続きボタン
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('購入手続きが完了しました！');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart)); // Clear cart from localStorage
        updateCart();
        updateCartIcon();
    } else {
        alert('カートに商品を追加してください。');
    }
});

// カートにアイテムを追加した時のメッセージ
function showAddedMessage() {
    const message = document.createElement('div');
    message.textContent = 'カートに入れました';
    message.classList.add('added-message');
    document.body.appendChild(message);

    // メッセージが2秒後に消える
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// ページ読み込み時にカートを更新
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});
