import { elementCreator } from "../helper/elementCreator.js";

const cartData = document.getElementById("cartContainer");
const counter = document.getElementsByClassName('counter');
const countDisplay = document.getElementsByClassName('display');
const price = document.getElementsByClassName('price');
const totalPrice = document.getElementById('totalCost');
const totalItem = document.getElementById('totalItem');
const addToCart = document.getElementsByClassName('addToCart');
let obj = JSON.parse(localStorage.getItem('currentUser'));

obj.cartItems.length === 0 ? cartData.innerText = "You have nothig to buy in your cart ; )"
    : elementCreator(obj.cartItems, cartData, "all", "cart");

let total = obj.cartItems.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0);

for (let i = 0; i < obj.cartItems.length; i++) {
    countDisplay[i].innerText = obj.cartItems[i].qty;
    counter[i].style.display = "block";
    addToCart[i].style.display = "none";
    price[i].innerText = `$ ${obj.cartItems[i].price * obj.cartItems[i].qty}`;
};

totalPrice.innerHTML = `Total cost : $ ${total}`;
totalItem.innerHTML = `Total Items : ${obj.cartItems.length}`;

cartData.addEventListener('click', (e) => {
    obj = JSON.parse(localStorage.getItem('currentUser'));
    total = obj.cartItems.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)
    totalPrice ? totalPrice.innerHTML = `Total cost :$ ${total}` : "";
    if (obj.cartItems.length === 0) cartData.innerText = "You have nothig to buy in your cart ; )";
    totalItem.innerHTML = `Total Items : ${obj.cartItems.length}`;
})






