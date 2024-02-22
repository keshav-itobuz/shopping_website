import dbData from '../storage.js'
export function addToCart(e, container, obj, itemCount) {
    if (e.target.className === "addToCart") {
        if (obj === -1)
            window.location.href = "../login/login.html";

        else {
            let counter = container.querySelector(`[data-counter="${e.target.dataset.add_to_cart}"]`)
            let countDisplay = container.querySelector(`[data-display="${e.target.dataset.add_to_cart}"]`)
            e.target.style.display = "none";
            counter.style.display = "block";
            let product = dbData.find((value) => value.id === Number(e.target.dataset.add_to_cart));
            let item = {
                id: product.id,
                qty: countDisplay.innerText,
                title: product.title,
                image: product.image,
                price: product.price,
            };
            obj = JSON.parse(localStorage.getItem('currentUser'));
            const index = obj.cartItems.findIndex(value => value.id === item.id);
            
            if (index === -1) {
                obj.cartItems.push(item);
                countDisplay.innerText = 1;
            }

            else {
                countDisplay.innerText = obj.cartItems[index].qty;
            }
            localStorage.setItem('currentUser', JSON.stringify(obj));
            itemCount.innerHTML = obj.cartItems.length;
        }
    }
}

export function addItem(e, container, obj) {

    if (e.target.className === "addItem") {
        let countDisplay = container.querySelector(`[data-display="${e.target.dataset.add_item}"]`)
        countDisplay.innerText = Number(countDisplay.innerText) + 1;
        obj = JSON.parse(localStorage.getItem('currentUser'));
        let localStorageIndex = obj.cartItems.findIndex((value) => value.id === Number(e.target.dataset.add_item));
        obj.cartItems[localStorageIndex].qty = Number(countDisplay.innerText);
        localStorage.setItem('currentUser', JSON.stringify(obj));
    }
}

export function removeItem(e, container, itemCount) {
    if (e.target.className === 'removeItem') {
        let addCartButton = container.querySelector(`[data-add_to_cart="${e.target.dataset.remove_item}"]`)
        let counter = container.querySelector(`[data-counter="${e.target.dataset.remove_item}"]`)
        let countDisplay = container.querySelector(`[data-display="${e.target.dataset.remove_item}"]`)
        countDisplay.innerText = Number(countDisplay.innerText) === 0 ? 0 : Number(countDisplay.innerText) - 1;
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        const index = obj.cartItems.find(value => value.id === Number(e.target.dataset.remove_item));

        if (index.qty < 2) {
            index.qty = 0;
            obj.cartItems = obj.cartItems.filter(ob => ob.id !== index.id)
            addCartButton.style.display = "block";
            counter.style.display = "none";
        } 
        
        else {
            index.qty--;
        }
        localStorage.setItem('currentUser', JSON.stringify(obj));
        itemCount.innerHTML = obj.cartItems.length;
    }
}

export function addcartItem(e, countDisplay, price) {
    if (e.target.className === "addItem") {
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        let selectedIndex = obj.cartItems.findIndex((value) => value.id === Number(e.target.dataset.add_item));
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
        obj.cartItems[selectedIndex].qty = Number(countDisplay[selectedIndex].innerText);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        price[selectedIndex].innerText = `$ ${obj.cartItems[selectedIndex].price * obj.cartItems[selectedIndex].qty}`;
    }
}

export function removeCartItem(e, countDisplay, price, card) {
    if (e.target.className === "removeItem") {
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        let selectedIndex = obj.cartItems.findIndex((value) => value.id === Number(e.target.dataset.remove_item));
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) - 1;

        if (obj.cartItems[selectedIndex].qty < 2) {
            obj.cartItems = obj.cartItems.filter(ob => ob.id !== obj.cartItems[selectedIndex].id);
            localStorage.setItem('currentUser', JSON.stringify(obj));
            card[selectedIndex].remove();
        }

        else {
            obj.cartItems[selectedIndex].qty--;
            price[selectedIndex].innerText = `$ ${obj.cartItems[selectedIndex].price * obj.cartItems[selectedIndex].qty}`;
            localStorage.setItem('currentUser', JSON.stringify(obj));
        }

    }
}