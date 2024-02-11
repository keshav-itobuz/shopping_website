export function elementCreator(data , container){
    data.forEach((item) => {
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
        btn.setAttribute('data-add_to_cart', item.id);
        btn.innerText = "Add to cart"
    
        let counter = document.createElement('div');
        counter.setAttribute('class', 'counter');
        counter.setAttribute('data-counter', item.id)
    
        let sub = document.createElement("button")
        sub.setAttribute('class', "sub");
        sub.setAttribute('data-remove_item', item.id);
        sub.innerText = "-";
        counter.appendChild(sub);
    
        let display = document.createElement('span');
        display.setAttribute('class', 'display');
        display.innerText = "1";
        counter.appendChild(display);
    
        let add = document.createElement("button")
        add.setAttribute('class', "add");
        add.setAttribute('data-add_item', item.id);
        add.innerText = "+";
        counter.appendChild(add);
    
        card.appendChild(counter);
        card.appendChild(btn);
    
        container.appendChild(card);
    });
}