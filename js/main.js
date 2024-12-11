/*在庫状態をinstockでここに保存
productsとしてid,nameなどのデータを保持*/
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
 
//cart.htmlのid-cartをcartとして定義して使いまわす//
let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
 
document.addEventListener("DOMContentLoaded", () => {
    const productElements = document.querySelectorAll('.product');
 
    //productsのindexをproductとして定義
    productElements.forEach((productElement, index) => { //??????
        const product = products[index];
        const button = productElement.querySelector('button');
 
        /*if文でカートに追加か売り切れかの分岐clickイベントで在庫があるなら*/
        if (product.inStock) {
            button.textContent = "カートに追加";
            button.disabled = false;
        } else {
            button.textContent = "売り切れ";
            button.disabled = true; // 売り切れのボタンは無効に
        }
 
        // ifで在庫があればクリックで下のaddtocart関数を実行
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
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage ??????????
    updateCartIcon();
    showAddedMessage();
}
 
// カートアイコンの更新
//<span id="cart-count">0</span>を変数cartCountとして定義
 
function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; //textContentでcartCountのなかのテキストをcart.lengthに更新している
    /*addtocart関数でcartにproductをpushしていて
そのcartのながさをcartCount.textContent=const cartCount = ('cart-count')にいれて表示*/
 
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
 
// 購入て続き（id=checkout-btn)をおすとクリックイベントで下のifが実行
const checkoutBtn = document.getElementById('checkout-btn2');
checkoutBtn.addEventListener('click', () => {
    //カートの中身が0以上なら以下を実行
    if (cart.length > 0) {
        window.open('succsess.html');
        localStorage.setItem('cart', JSON.stringify(cart)); // Clear cart from localStorage
        updateCart();
        updateCartIcon();
        
    } else { //カートの中身が0以下なら以下を実行
        alert('カートに商品を追加してください。');
        window.open('main.html');
    }
});



// カートにアイテムを追加した時のメッセージ
function showAddedMessage() {
    const message = document.createElement('div');
    message.textContent = 'カートに入れました';
    message.classList.add('added-message');
    document.body.appendChild(message);
 
    // じかんで表示を変える組み込み関数で変数messageを表示
    setTimeout(() => {
        message.remove();
    }, 2000);
}
 
// 組み込み関数てきなのをつかってページがロードされたらupdata関数を実行
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});