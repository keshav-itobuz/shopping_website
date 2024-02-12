export function elementCreator(data, container) {
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

        let addToCart = document.createElement("button")
        addToCart.setAttribute('class', "add_cart");
        addToCart.setAttribute('data-add_to_cart', item.id);
        addToCart.innerText = "Add to cart"

        let counter = document.createElement('div');
        counter.setAttribute('class', 'counter');
        counter.setAttribute('data-counter', item.id)

        let removeItem = document.createElement("button")
        removeItem.setAttribute('class', "removeItem");
        removeItem.setAttribute('data-remove_item', item.id);
        removeItem.innerText = "-";
        counter.appendChild(removeItem);

        let display = document.createElement('span');
        display.setAttribute('class', 'display');
        display.innerText = "1";
        counter.appendChild(display);

        let addItem = document.createElement("button")
        addItem.setAttribute('class', "addItem");
        addItem.setAttribute('data-add_item', item.id);
        addItem.innerText = "+";
        counter.appendChild(addItem);

        card.appendChild(counter);
        card.appendChild(addToCart);

        container.appendChild(card);
    });
}