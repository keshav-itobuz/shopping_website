import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
import { addToCart, addItem, removeItem } from '../helper/helper.js';

const user = document.getElementById('user');
const itemCount = document.getElementById('cartItems');
const logout = document.getElementById('logout');
const container = document.getElementById('dataContainer');
const categories = document.getElementById('categories');
const allProducts = document.getElementById('all');
const searchItems = document.getElementById('searchItems');


let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
if (obj === -1)
    window.location.href = "../login/login.html";

elementCreator(dbData, container, "all");

let currentUserData = JSON.parse(localStorage.getItem('currentUser'));

itemCount.innerText = obj.cartItems?.length;
user.innerText = `Welcome ${currentUserData.name}`;

container.addEventListener('click', (e) => {
    let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
    addToCart(e, container, obj, itemCount);
    addItem(e, container, dbData);
    removeItem(e, container, itemCount)
})

logout.addEventListener('click', (e) => {
    currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    let userCartData = JSON.parse(localStorage.getItem('userCartData')) || {};

    userCartData[currentUserData.email] = currentUserData.cartItems;

    localStorage.setItem('userCartData', JSON.stringify(userCartData));
    localStorage.removeItem('currentUser');
    window.location.href = "../login/login.html";
})

let previousCategory = all;
allProducts.style.borderBottom = "3px solid grey"

categories.addEventListener('click', (e) => {
    if (e.target.tagName !== "SPAN") {
        return;
    }
    container.innerHTML = "";
    previousCategory.style.borderBottom = "white";
    elementCreator(dbData, container, e.target.id);
    e.target.style.borderBottom = "3px solid grey"
    previousCategory = e.target;
})

searchItems.addEventListener('keyup', (e) => {
    container.innerHTML = "";
    elementCreator(dbData, container, e.target.value);
})
