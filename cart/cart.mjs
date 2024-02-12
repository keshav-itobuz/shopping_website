import { elementCreator } from "../helper/elementCreator.js";
import { addcartItem, removeCartItem } from "../helper/helper.js";

let obj = JSON.parse(localStorage.getItem('key'));
let cartData = document.getElementById("cart-container");
let counter = document.getElementsByClassName('counter');
let card = document.getElementsByClassName('card');
let countDisplay = document.getElementsByClassName('display');
let price = document.getElementsByClassName('price');
let totalPrice = document.getElementById('totalCost');
let totalItem = document.getElementById('totalItem');
let addToCart = document.getElementsByClassName('add_cart');

obj.length === 0 ? cartData.innerText = "You have nothig to buy in your cart ; )"
    : elementCreator(obj, cartData);

let total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0);

for (let i = 0; i < obj.length; i++) {
    countDisplay[i].innerText = obj[i].qty;
    counter[i].style.display = "block";
    addToCart[i].style.display = "none";
    price[i].innerText = `$ ${obj[i].price * obj[i].qty}`;
};
totalPrice.innerHTML = `Total cost : $ ${total}`;
totalItem.innerHTML = `Total Items : ${obj.length}`;

cartData.addEventListener('click', (e) => {
    addcartItem(e, countDisplay, price)
    removeCartItem(e, countDisplay, price, card)
    obj = JSON.parse(localStorage.getItem('key'));
    total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)
    totalPrice ? totalPrice.innerHTML = `Total cost :$ ${total}` : "";
    if (obj.length === 0) cartData.innerText = "You have nothig to buy in your cart ; )";
})






