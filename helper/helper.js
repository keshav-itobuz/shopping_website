import dbData from '../storage.js'
export function addToCart(e, counter, countDisplay, obj, itemCount) {
    if (e.target.className === "add_cart") {
        if (obj === -1)
            window.location.href = "../login/login.html";
        else {
            let selectedIndex = e.target.dataset.add_to_cart - 1;
            e.target.style.display = "none";
            counter[selectedIndex].style.display = "block";
            let item = {
                id: selectedIndex + 1,
                qty: countDisplay[selectedIndex].innerText,
                title: dbData[selectedIndex].title,
                image: dbData[selectedIndex].image,
                price: dbData[selectedIndex].price,
            };
            obj = JSON.parse(localStorage.getItem('currentUser'));
            const index = obj.cartItems.findIndex(value => value.id === item.id);
            if (index === -1) {
                obj.cartItems.push(item);
                countDisplay[selectedIndex].innerText = 1;
            }
            else {
                countDisplay[selectedIndex].innerText = obj.cartItems[index].qty;
            }
            localStorage.setItem('currentUser', JSON.stringify(obj));
            itemCount.innerHTML = obj.cartItems.length;
        }
    }
}
export function addItem(e, countDisplay, obj) {
    if (e.target.className === "addItem") {
        let selectedIndex = obj.findIndex((value) => value.id == e.target.dataset.add_item);
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
        obj = JSON.parse(localStorage.getItem('currentUser'));
        let localStorageIndex = obj.cartItems.findIndex((value) => value.id == e.target.dataset.add_item);
        obj.cartItems[localStorageIndex].qty = Number(countDisplay[selectedIndex].innerText);
        localStorage.setItem('currentUser', JSON.stringify(obj));

    }
}

export function removeItem(e, countDisplay, addCartButton, counter, itemCount) {
    if (e.target.className === 'removeItem') {
        let selectedIndex = e.target.dataset.remove_item - 1;
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) === 0 ? 0 : Number(countDisplay[selectedIndex].innerText) - 1;
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        const index = obj.cartItems.find(value => value.id === selectedIndex + 1);
        if (index.qty < 2) {
            index.qty = 0;
            obj.cartItems = obj.cartItems.filter(ob => ob.id !== index.id)
            addCartButton[selectedIndex].style.display = "block";
            counter[selectedIndex].style.display = "none";
        } else {
            index.qty--;
        }
        localStorage.setItem('currentUser', JSON.stringify(obj));
        itemCount.innerHTML = obj.cartItems.length;
    }
}

export function addcartItem(e, countDisplay, price) {
    if (e.target.className === "addItem") {
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        let selectedIndex = obj.cartItems.findIndex((value) => value.id == e.target.dataset.add_item);
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
        obj.cartItems[selectedIndex].qty = Number(countDisplay[selectedIndex].innerText);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        price[selectedIndex].innerText = `$ ${obj.cartItems[selectedIndex].price * obj.cartItems[selectedIndex].qty}`;
    }
}

export function removeCartItem(e, countDisplay, price, card) {
    if (e.target.className === "removeItem") {
        let obj = JSON.parse(localStorage.getItem('currentUser'));
        let selectedIndex = obj.cartItems.findIndex((value) => value.id == e.target.dataset.remove_item);
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) - 1;
        if (obj.cartItems[selectedIndex].qty < 2) {
            obj.cartItems = obj.cartItems.filter(ob => ob.id !== obj.cartItems[selectedIndex].id);
            localStorage.setItem('currentUser', JSON.stringify(obj));
            card[selectedIndex].remove();
        } else {
            obj.cartItems[selectedIndex].qty--;
            price[selectedIndex].innerText = `$ ${obj.cartItems[selectedIndex].price * obj.cartItems[selectedIndex].qty}`;
            localStorage.setItem('currentUser', JSON.stringify(obj));
        }

    }
}