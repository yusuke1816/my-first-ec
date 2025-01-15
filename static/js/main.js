/*在庫状態をinstockでここに保存
productsとしてid,nameなどのデータを保持*/
const initialProducts = [
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
    { id: 11, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 12, name: "ジーンズ", price: 3000, inStock: true, stock: 2 },
    { id: 13, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 14, name: "ジャケット", price: 5000, inStock: true, stock: 5 },
    { id: 15, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 16, name: "ジーンズ", price: 3000, inStock: true, stock: 1 },
    { id: 17, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 18, name: "ジャケット", price: 5000, inStock: true, stock: 4 },
    { id: 19, name: "シャツ", price: 2500, inStock: true, stock: 2 },
    { id: 20, name: "ジーンズ", price: 3000, inStock: false, stock: 0 },
    { id: 21, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 22, name: "ジーンズ", price: 3000, inStock: true, stock: 2 },
    { id: 23, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 24, name: "ジャケット", price: 5000, inStock: true, stock: 5 },
    { id: 25, name: "シャツ", price: 2500, inStock: true, stock: 3 },
    { id: 26, name: "ジーンズ", price: 3000, inStock: true, stock: 1 },
    { id: 27, name: "ジャケット", price: 5000, inStock: false, stock: 0 },
    { id: 28, name: "ジャケット", price: 5000, inStock: true, stock: 4 },
    { id: 29, name: "シャツ", price: 2500, inStock: true, stock: 2 },
    { id: 30, name: "ジーンズ", price: 3000, inStock: false, stock: 0 },
];

const products = JSON.parse(localStorage.getItem('products')) || initialProducts; 
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
        localStorage.setItem('products', JSON.stringify(products));
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
 
/// カートの中身を表示
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // カートが空の場合
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>カートに商品がありません。</p>';
        totalPriceElement.innerText = '合計金額: ¥0';  // 合計金額を0円に設定
    } else {
        cartItems.innerHTML = '';
        let total = 0;  // 合計金額を初期化
        
        // カート内の各アイテムをリストとして表示
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            // 商品名と価格を表示
            const itemText = document.createElement('p');
            itemText.innerText = `${item.name} - ¥${item.price}`;
            itemElement.appendChild(itemText);
            
            // 削除ボタンを作成
            const removeButton = document.createElement('button');
            removeButton.textContent = '削除';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => removeFromCart(index));  // 削除ボタンがクリックされたときにremoveFromCartを呼び出す
            
            itemElement.appendChild(removeButton);
            cartItems.appendChild(itemElement);
            
            total += item.price;  // アイテムの価格を合計に加算
        });
        
        // 合計金額を表示
        totalPriceElement.innerText = `合計金額: ¥${total}`;
    }
}

// 商品をカートから削除
function removeFromCart(index) {
    // 指定したインデックスの商品をカートから削除
    cart.splice(index, 1);
    
    // localStorageのカートを更新
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // カートの中身を再表示
    updateCart();
    
    // カートアイコンを更新
    updateCartIcon();
}

// カートアイコンの更新
function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;  // カート内の商品数を更新
}

 
// 購入て続き（id=checkout-btn)をおすとクリックイベントで下のifが実行
// 購入手続きボタンのイベントリスナー
// 購入手続きボタンのイベントリスナー
const checkoutBtn = document.getElementById('checkout-btn2');
checkoutBtn.addEventListener('click', () => {
    // カートが空でない場合
    if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart)); // カートをlocalStorageに保存
        updateCart();  // カート内容を更新
        updateCartIcon();  // カートアイコンを更新

        // ページ遷移
        window.location.href = '/pay';  // pay.htmlへ遷移
    } else {
        alert('カートに商品を追加してください。');  // カートが空の場合
        window.location.href = '/';  // ホームページに戻る
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


// 在庫を初期化する関数
function resetStock() {
    products.length = 0;
    initialProducts.forEach(product => products.push({ ...product }));
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}

// 在庫初期化ボタンのイベントリスナー
const resetb=document.getElementById('reset-stock-btn')
resetb.addEventListener('click', () => {
    if (confirm('本当に在庫を初期化しますか？')) {
        resetStock();
    }
});
