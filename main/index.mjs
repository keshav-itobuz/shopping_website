import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
import { addToCart , addItem, removeItem } from '../helper/helper.js';
let obj = JSON.parse(localStorage.getItem('key') || '[]');
let container = document.getElementById('data-container');

elementCreator(dbData , container);

let addCartButton = document.getElementsByClassName('add_cart');
let counter = document.getElementsByClassName('counter');
let countDisplay = document.getElementsByClassName('display');
let itemCount = document.getElementById('cart_items');

itemCount.innerText = obj.length;

container.addEventListener('click', (e) => {
    addToCart(e,counter,countDisplay,obj,itemCount);
    addItem(e,countDisplay,dbData);
    removeItem(e, countDisplay, addCartButton, counter, itemCount)
})