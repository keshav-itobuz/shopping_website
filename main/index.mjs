import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
import { addToCart } from '../helper/addToCart.js';
import { addItem } from '../helper/addItem.js';
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

    if (e.target.className === 'removeItem') {
        let selectedIndex = e.target.dataset.remove_item - 1;
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) === 0 ? 0 : Number(countDisplay[selectedIndex].innerText) - 1;
        obj = JSON.parse(localStorage.getItem('key'));
        const index = obj.find(value => value.id === selectedIndex +1);
        if (index.qty < 2) {
            index.qty = 0;
            obj = obj.filter(ob => ob.id !== index.id)
            addCartButton[selectedIndex].style.display = "block";
            counter[selectedIndex].style.display = "none";
        } else {
            index.qty--;
        }
        localStorage.setItem('key', JSON.stringify(obj));
        itemCount.innerHTML = obj.length;
    }

})