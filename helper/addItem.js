export function addItem(e,countDisplay,obj){
    if (e.target.className === "addItem") {

        let selectedIndex = obj.findIndex((value) => value.id == e.target.dataset.add_item);
        countDisplay[selectedIndex].innerText = Number(countDisplay[selectedIndex].innerText) + 1;
        obj = JSON.parse(localStorage.getItem('key'));
        obj[selectedIndex].qty = Number(countDisplay[selectedIndex].innerText);
        localStorage.setItem('key', JSON.stringify(obj));
    }
}