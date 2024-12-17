/*在庫状態をinstockでここに保存
productsとしてid,nameなどのデータを保持*/
const products = [
    { id: 1, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 2, name: "ジーンズ", price: 3000, inStock: true, stock: 2 },
    { id: 3, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 4, name: "ジャケット", price: 5000, inStock: true, stock: 5 },
    { id: 5, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 6, name: "ジーンズ", price: 3000, inStock: true, stock: 1 },
    { id: 7, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 8, name: "ジャケット", price: 5000, inStock: true, stock: 4 },
    { id: 9, name: "シャツ", price: 2500, inStock: true, stock: 2 },
    { id: 10, name: "ジーンズ", price: 3000, inStock: false, stock: 0 },
];

 
//cart.htmlのid-cartをcartとして定義して使いまわす//
let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
 
document.addEventListener("DOMContentLoaded", () => {
    const productElements = document.querySelectorAll('.product');
 
    productElements.forEach((productElement, index) => {
        const product = products[index];
        const button = productElement.querySelector('button');
 
        if (product.inStock && product.stock > 0) {
            button.textContent = "カートに追加";
            button.disabled = false;
        } else {
            button.textContent = "売り切れ";
            button.disabled = true; // 売り切れのボタンは無効に
        }
 
        button.addEventListener('click', () => {
            if (product.stock > 0) {
                addToCart(product);
            }
        });
    });

    // カートアイコンの更新
    updateCartIcon();
});

// カートへの追加
function addToCart(product) {
    // 在庫があればカートに追加
    if (product.stock > 0) {
        cart.push(product);
        product.stock--;  // 購入された商品の在庫を減らす
        if (product.stock === 0) {
            product.inStock = false;  // 在庫が0になった場合は売り切れ
        }

        if (product.stock === 0) {
            const  add = document.getElementById(`add-${product.id}`);
            add.disabled = true;
            add.textContent = "売り切れ";
            console.log(product.stock)

            /*
            const  add = document.getElementById(`add-${product.id}`);
            add.innerHTML = "<button>売り切れ</button>"; // "Sold out" button
            add.stock==0
            // Assuming `product.id` holds the unique product ID
            const addButton = document.getElementById(`add-${product.id}`);
            
            // Change the background color for this specific button
            if (addButton) {
                addButton.style.backgroundColor = 'red';
            
        }*/}
        

        // localStorageにカートを保存
        localStorage.setItem('cart', JSON.stringify(cart));

        // カートアイコンの更新
        updateCartIcon();
        
        // 追加メッセージの表示
        showAddedMessage();

        console.log(product.stock)
    } else {
        alert('在庫がありません。');
    }
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
        localStorage.setItem('cart', JSON.stringify(cart)); // Clear cart from localStorage
        updateCart();
        updateCartIcon();
        
    } else { //カートの中身が0以下なら以下を実行
        alert('カートに商品を追加してください。');
        window.open('main.html');
    }
});

const test=cart


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



// カートを空にする処理
function clearCart() {
    cart = []; // カートの内容をリセット
    localStorage.setItem('cart', JSON.stringify(cart)); // localStorageのカートも更新
    updateCart(); // カートの中身を表示
    updateCartIcon(); // カートアイコンの更新
}

// カートを空にするボタンのイベントリスナー
const clearCartBtn = document.getElementById('clear-cart-btn');
clearCartBtn.addEventListener('click', () => {
    if (confirm('本当にカートを空にしますか？')) {
        clearCart(); // カートを空にする関数を実行
    }
});

