import dbData from '../storage.js'
export function addToCart(e ,counter,countDisplay,obj,itemCount) {
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