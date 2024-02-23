export function elementCreator(data, container, category) {
    if (category === "all") {
        data.forEach((item) => {
            filteredProducts(item, container)
        });
    }

    else if (category === "men" || category === "women" || category === "electronics") {
        data.forEach((item) => {
            if (item.category === category) {
                filteredProducts(item, container)
            }
        });
    }

    else {
        data.forEach((item) => {
            const name = item.title.toLowerCase()
            if (name.includes(category)) {
                filteredProducts(item, container)
            }
        });
    }
}

function filteredProducts(item, container) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const image = document.createElement('img');
    image.setAttribute("src", item.image);
    image.setAttribute("alt", "product_image");
    card.appendChild(image);

    const name = document.createElement('h3');
    name.innerText = item.title;
    card.appendChild(name);

    const price = document.createElement('h4');
    price.innerText = `$ ${item.price}`;
    price.setAttribute('class', 'price')
    card.appendChild(price);

    const addToCart = document.createElement("button")
    addToCart.setAttribute('class', "addToCart");
    addToCart.setAttribute('data-add_to_cart', item.id);
    addToCart.innerText = "Add to cart"

    const counter = document.createElement('div');
    counter.setAttribute('class', 'counter');
    counter.setAttribute('data-counter', item.id)

    const removeItem = document.createElement("button")
    removeItem.setAttribute('class', "removeItem");
    removeItem.setAttribute('data-remove_item', item.id);
    removeItem.innerText = "-";
    counter.appendChild(removeItem);

    const display = document.createElement('span');
    display.setAttribute('class', 'display');
    display.setAttribute('data-display', item.id);
    display.innerText = "1";
    counter.appendChild(display);

    const addItem = document.createElement("button")
    addItem.setAttribute('class', "addItem");
    addItem.setAttribute('data-add_item', item.id);
    addItem.innerText = "+";
    counter.appendChild(addItem);

    card.appendChild(counter);
    card.appendChild(addToCart);

    container.appendChild(card);
}