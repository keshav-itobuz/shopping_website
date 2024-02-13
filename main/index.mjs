import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
import { addToCart, addItem, removeItem } from '../helper/helper.js';


let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
if (obj === -1)
    window.location.href = "../login/login.html";
let container = document.getElementById('data-container');

elementCreator(dbData, container);


let addCartButton = document.getElementsByClassName('add_cart');
let counter = document.getElementsByClassName('counter');
let countDisplay = document.getElementsByClassName('display');
let itemCount = document.getElementById('cart_items');
let logout = document.getElementById('logout');

itemCount.innerText = obj.length;

container.addEventListener('click', (e) => {
    let obj = JSON.parse(localStorage.getItem('currentUser') || -1);
    addToCart(e, counter, countDisplay, obj, itemCount);
    addItem(e, countDisplay, dbData);
    removeItem(e, countDisplay, addCartButton, counter, itemCount)
})

logout.addEventListener('click',(e)=>{
    let cartData=JSON.parse(localStorage.getItem('cartData') || {});
    let userCartData=JSON.parse(localStorage.getItem('currentUser'));
    
    localStorage.setItem('cartData' ,  JSON.stringify(userCartData));

    localStorage.removeItem('currentUser');
    window.location.href('../login/login.html');
})