import dbData from '../storage.js';
import { elementCreator } from '../helper/elementCreator.js';
let obj = JSON.parse(localStorage.getItem('key') || '[]');
let container = document.getElementById('data-container');

elementCreator(dbData , container);



let addCartButton = document.getElementsByClassName('add_cart');
let plusMinus = document.getElementsByClassName('counter');
let plus = document.getElementsByClassName('add');
let minus = document.getElementsByClassName('sub');
let count = document.getElementsByClassName('display');
let itemCount = document.getElementById('cart_items');

itemCount.innerText = obj.length;



container.addEventListener('click', (e) => {
    if (e.target.className === "add_cart") {

        let selectedIndex = e.target.dataset.add_to_cart - 1;
        e.target.style.display = "none";
        plusMinus[selectedIndex].style.display = "block";
        let item = {
            id: selectedIndex + 1,
            qty: count[selectedIndex].innerText,
            title: dbData[selectedIndex].title,
            image: dbData[selectedIndex].image,
            price: dbData[selectedIndex].price,
        };
        obj = JSON.parse(localStorage.getItem('key') || '[]');
        const index = obj.findIndex(value => value.id === item.id);
        if (index === -1) {
            obj.push(item);
            count[selectedIndex].innerText = 1;
        }
        else {
            count[selectedIndex].innerText = obj[index].qty;
        }
        localStorage.setItem('key', JSON.stringify(obj));
        itemCount.innerHTML = obj.length;
    }

    if (e.target.className === "add") {
        let selectedIndex = e.target.dataset.add_item - 1;
        count[selectedIndex].innerText = Number(count[selectedIndex].innerText) + 1;
        let item = {
            id: selectedIndex + 1,
            qty: count[selectedIndex].innerText,
        };
        obj = JSON.parse(localStorage.getItem('key'));
        const index = obj.findIndex(value => value.id === item.id);
        obj[index].qty = item.qty;
        localStorage.setItem('key', JSON.stringify(obj));
        itemCount.innerHTML = obj.length;

    }

    if (e.target.className === 'sub') {
        let selectedIndex = e.target.dataset.remove_item - 1;
        count[selectedIndex].innerText = Number(count[selectedIndex].innerText) === 0 ? 0 : Number(count[selectedIndex].innerText) - 1;
        obj = JSON.parse(localStorage.getItem('key'));
        const index = obj.find(value => value.id === selectedIndex +1);
        if (index.qty < 2) {
            index.qty = 0;
            obj = obj.filter(ob => ob.id !== index.id)
            addCartButton[selectedIndex].style.display = "block";
            plusMinus[selectedIndex].style.display = "none";
        } else {
            index.qty--;
        }
        localStorage.setItem('key', JSON.stringify(obj));
        itemCount.innerHTML = obj.length;
    }


})