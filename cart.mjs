var obj = JSON.parse(localStorage.getItem('key') || '[]');
var cartData = document.getElementById("data-container");

function renderCard() {
    cartData.innerHTML = "";
    obj.forEach((item) => {

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
        price.innerText = `$ ${item.price * item.qty}`;
        price.setAttribute('class', 'price')
        card.appendChild(price);


        let counter = document.createElement('div');
        counter.setAttribute('class', 'counter');

        let sub = document.createElement("button")
        sub.setAttribute('class', "sub");
        sub.innerText = "-";
        counter.appendChild(sub);

        let display = document.createElement('span');
        display.setAttribute('class', 'display');
        display.innerText = item.qty;
        counter.appendChild(display);

        let add = document.createElement("button")
        add.setAttribute('class', "add");
        add.innerText = "+";
        counter.appendChild(add);

        card.appendChild(counter);

        cartData.appendChild(card);

    });
    let counter = document.getElementsByClassName('counter');
    let plus = document.getElementsByClassName('add');
    let minus = document.getElementsByClassName('sub');
    let count = document.getElementsByClassName('display');
    let price = document.getElementsByClassName('price');
    let card = document.getElementsByClassName('card')
    let totalPrice = document.getElementById('totalCost');
    let totalItem = document.getElementById('totalItem');
    let total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)

    for (let i = 0; i < counter.length; i++) {
        counter[i].style.display = "block";
    }

    for (let i = 0; i < obj.length; i++) {
        plus[i].addEventListener('click', () => {
            count[i].innerText = Number(count[i].innerText) + 1;
            obj = JSON.parse(localStorage.getItem('key') || '[]');
            obj[i].qty = Number(count[i].innerText);
            localStorage.setItem('key', JSON.stringify(obj));
            price[i].innerText = `$ ${obj[i].price * obj[i].qty}`;
            total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)
            totalPrice ? totalPrice.innerHTML = `Total cost : ${total}` : "";
        })
        minus[i].addEventListener('click', () => {
            count[i].innerText = Number(count[i].innerText) - 1;
            obj = JSON.parse(localStorage.getItem('key') || '[]');
            if (obj[i].qty < 2) {
                obj[i].qty = 0;
                obj = obj.filter(ob => ob.id !== obj[i].id)
                card[i].style.display = "none";
                renderCard();
            } else {
                obj[i].qty--;
                price[i].innerText = `$ ${obj[i].price * obj[i].qty}`;
            }
            localStorage.setItem('key', JSON.stringify(obj));
            total = obj.reduce((accumlator, value) => accumlator += (value.qty * value.price), 0)
            totalPrice ? totalPrice.innerHTML = `Total cost : ${total}` : "";

        })
    }
    totalPrice ? totalPrice.innerHTML = `Total cost : ${total}` : "";
    totalItem ? totalItem.innerHTML = `Total Items : ${obj.length}` : "";
};
renderCard();





