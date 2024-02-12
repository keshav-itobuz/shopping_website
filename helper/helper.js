import dbData from '../storage.js'
export function addToCart(e, counter, countDisplay, obj, itemCount) {
    if (e.target.className === "add_cart") {
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
        obj = JSON.parse(localStorage.getItem('key') || '[]');
        const index = obj.findIndex(value => value.id === item.id);
        if (index === -1) {
            obj.push(item);
            countDisplay[selectedIndex].innerText = 1;
        }
        else {
            countDisplay[selectedIndex].innerText = obj[index].qty;
        }
        localStorage.setItem('key', JSON.stringify(obj));
        itemCount.innerHTML = obj.length;
    }

}

export function addItem(e, countDisplay, obj) {
    if (e.target.className === "addItem") {
        let selectedIndex = obj.findIndex((value) => value.id == e.target.dataset.add_item);
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
        obj = JSON.parse(localStorage.getItem('key'));
        let localStorageIndex = obj.findIndex((value) => value.id == e.target.dataset.add_item);
        obj[localStorageIndex].qty = Number(countDisplay[selectedIndex].innerText);
        localStorage.setItem('key', JSON.stringify(obj));
    }
}

export function removeItem(e, countDisplay, addCartButton, counter, itemCount) {
    if (e.target.className === 'removeItem') {
        let selectedIndex = e.target.dataset.remove_item - 1;
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) === 0 ? 0 : Number(countDisplay[selectedIndex].innerText) - 1;
        let obj = JSON.parse(localStorage.getItem('key'));
        const index = obj.find(value => value.id === selectedIndex + 1);
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
}