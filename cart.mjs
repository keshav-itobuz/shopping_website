obj = JSON.parse(localStorage.getItem('key') || '[]');

let cartData = document.getElementById( "data-container" );

obj.map((item)=>{

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
    price.inneText = `$ ${item.price}`;
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
for(let i=0;i<counter.length;i++){
    counter[i].style.display="block";

}
let plus = document.getElementsByClassName('add');
let minus = document.getElementsByClassName('sub');
let count = document.getElementsByClassName('display');

plus[i].addEventListener('click', () => {
    count[i].innerText = Number(count[i].innerText) + 1;
    let item = {
        id: dbData[i].id,
        qty: count[i].innerText,
    };
    obj = JSON.parse(localStorage.getItem('key') || '[]');
    const index = obj.findIndex(value => value.id === item.id);
    index === -1 ? obj.push(item) : obj[index].qty = item.qty;
    localStorage.setItem('key', JSON.stringify(obj));
    cartItems.innerHTML = obj.length;
})
minus[i].addEventListener('click', () => {
    count[i].innerText = Number(count[i].innerText) === 0 ? 0 : Number(count[i].innerText) - 1;
    let item = {
        id: dbData[i].id,
        qty: count[i].innerText,
    };
    obj = JSON.parse(localStorage.getItem('key') || '[]');
    const index = obj.findIndex(value => value.id === item.id);
    item.qty == 0 ? obj.splice(index, 1) : obj[index].qty = item.qty;
    localStorage.setItem('key', JSON.stringify(obj));
    cartItems.innerHTML = obj.length;
})