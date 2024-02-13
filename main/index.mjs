import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
import { addToCart, addItem, removeItem } from '../helper/helper.js';


let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
if (obj === -1)
    window.location.href = "../login/login.html";
let container = document.getElementById('data-container');

elementCreator(dbData, container);

const user = document.getElementById('user');
let addCartButton = document.getElementsByClassName('add_cart');
let counter = document.getElementsByClassName('counter');
let countDisplay = document.getElementsByClassName('display');
let itemCount = document.getElementById('cart_items');
let logout = document.getElementById('logout');
let currentUserData = JSON.parse(localStorage.getItem('currentUser'));

itemCount.innerText = obj.cartItems?.length;
user.innerText=`Welcome ${currentUserData.name}`;

container.addEventListener('click', (e) => {
    let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
    addToCart(e, counter, countDisplay, obj, itemCount);
    addItem(e, countDisplay, dbData);
    removeItem(e, countDisplay, addCartButton, counter, itemCount)
})

logout.addEventListener('click', (e) => {
    currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    let userCartData = JSON.parse(localStorage.getItem('userCartData')) || {};

    userCartData[currentUserData.email] = currentUserData.cartItems;

    localStorage.setItem('userCartData', JSON.stringify(userCartData));
    localStorage.removeItem('currentUser');
    window.location.href = "../login/login.html";
})