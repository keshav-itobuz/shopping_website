import { elementCreator } from "../helper/elementCreator.js";
var check = true;
function renderCard() {
    let obj = JSON.parse(localStorage.getItem('key'));
    let cartData = document.getElementById("cart-container");
    cartData.innerHTML = '';

    obj.length === 0 ? cartData.innerText = "You have nothig to buy in your cart ; )"
        : elementCreator(obj, cartData);


    let counter = document.getElementsByClassName('counter');
    let countDisplay = document.getElementsByClassName('display');
    let price = document.getElementsByClassName('price');
    let totalPrice = document.getElementById('totalCost');
    let totalItem = document.getElementById('totalItem');
    let addToCart = document.getElementsByClassName('add_cart');
    let total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0);


    for (let i = 0; i < obj.length; i++) {
        countDisplay[i].innerText = obj[i].qty;
        counter[i].style.display = "block";
        addToCart[i].style.display = "none";
        price[i].innerText = `$ ${obj[i].price * obj[i].qty}`;
    };
    totalPrice.innerHTML = `Total cost : $ ${total}`;
    totalItem.innerHTML = `Total Items : ${obj.length}`;

    check && cartData.addEventListener('click', (e) => {
        if (e.target.className === "addItem") {

            obj = JSON.parse(localStorage.getItem('key'));
            let selectedIndex = obj.findIndex((value) => value.id == e.target.dataset.add_item);
            countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
            obj[selectedIndex].qty = Number(countDisplay[selectedIndex].innerText);
            localStorage.setItem('key', JSON.stringify(obj));
            price[selectedIndex].innerText = `$ ${obj[selectedIndex].price * obj[selectedIndex].qty}`;
        }


        if (e.target.className === "removeItem") {
            obj = JSON.parse(localStorage.getItem('key'));
            let selectedIndex = obj.findIndex((value) => value.id == e.target.dataset.remove_item);
            countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) - 1;
            if (obj[selectedIndex].qty < 2) {
                obj = obj.filter(ob => ob.id !== obj[selectedIndex].id);
                localStorage.setItem('key', JSON.stringify(obj));
                check = false;
                renderCard();
            } else {
                obj[selectedIndex].qty--;
                price[selectedIndex].innerText = `$ ${obj[selectedIndex].price * obj[selectedIndex].qty}`;
                localStorage.setItem('key', JSON.stringify(obj));
            }

        }
        total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)
        totalPrice ? totalPrice.innerHTML = `Total cost : ${total}` : "";
    })
}


renderCard();





