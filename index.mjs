import dbData from './storage.js';
let container = document.getElementById('data-container');
dbData.forEach((item) => {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    let image = document.createElement('img');
    image.setAttribute("src", item.image);
    image.setAttribute("alt", "product_image");
    card.appendChild(image);

    let name = document.createElement('h3');
    name.innerText = item.title;
    card.appendChild(name);

    let price = document.createElement('h4');
    price.innerText = `$ ${item.price}`;
    price.setAttribute('class', 'price')
    card.appendChild(price);

    let btn = document.createElement("button")
    btn.setAttribute('class', "add_cart");
    btn.innerText = "Add to cart"

    let counter = document.createElement('div');
    counter.setAttribute('class', 'counter');

    let sub = document.createElement("button")
    sub.setAttribute('class', "sub");
    sub.innerText = "-";
    counter.appendChild(sub);

    let display = document.createElement('span');
    display.setAttribute('class', 'display');
    display.innerText = "1";
    counter.appendChild(display);

    let add = document.createElement("button")
    add.setAttribute('class', "add");
    add.innerText = "+";
    counter.appendChild(add);

    card.appendChild(counter);
    card.appendChild(btn);

    container.appendChild(card);
});

let addCartButton = document.getElementsByClassName('add_cart');
let plusMinus = document.getElementsByClassName('counter');
let addCart = document.getElementsByClassName('add_cart')
let plus = document.getElementsByClassName('add');
let minus = document.getElementsByClassName('sub');
let count = document.getElementsByClassName('display');
let cartItems = document.getElementById('cart_items');

let obj = JSON.parse(localStorage.getItem('key') || '[]');
cartItems.innerText = obj.length;

for (let i = 0; i < addCartButton.length; i++) {
    addCartButton[i].addEventListener('click', () => {
        addCartButton[i].style.display = "none";
        plusMinus[i].style.display = "block";

        let item = {
            id: dbData[i].id,
            qty: count[i].innerText,
            title: dbData[i].title,
            image: dbData[i].image,
            price: dbData[i].price,
        };
        obj = JSON.parse(localStorage.getItem('key') || '[]');
        const index = obj.findIndex(value => value.id === item.id);
        if (index === -1) {
            obj.push(item);
            count[i].innerText = 1;
        }
        else {
            count[i].innerText = obj[index].qty;
        }
        localStorage.setItem('key', JSON.stringify(obj));
        cartItems.innerHTML = obj.length;
    })
    plus[i].addEventListener('click', () => {
        count[i].innerText = Number(count[i].innerText) + 1;
        let item = {
            id: dbData[i].id,
            qty: count[i].innerText,
        };
        obj = JSON.parse(localStorage.getItem('key') || '[]');
        const index = obj.find(value => value.id === item.id);
        index === -1 ? obj.push(item) : index.qty = item.qty;
        localStorage.setItem('key', JSON.stringify(obj));
        cartItems.innerHTML = obj.length;
    })
    minus[i].addEventListener('click', () => {
        count[i].innerText = Number(count[i].innerText) === 0 ? 0 : Number(count[i].innerText) - 1;
        obj = JSON.parse(localStorage.getItem('key') || '[]');
        const index = obj.find(value => value.id === dbData[i].id);
        if (index.qty < 2) {
            index.qty = 0;
            obj = obj.filter(ob => ob.id !== index.id)
            addCart[i].style.display = "block";
            plusMinus[i].style.display = "none"

        } else {
            index.qty--
        }
        localStorage.setItem('key', JSON.stringify(obj));
        cartItems.innerHTML = obj.length;
    })
}




