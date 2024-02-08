import dbData from './storage.js'
let name=document.getElementById('name');
let price=document.getElementById('price');
let color=document.getElementById('category');


dbData.map((value,index)=>{
    name.insertAdjacentHTML=dbData[index].title
    price.insertAdjacentHTML=dbData[index].price
    color.insertAdjacentHTML=dbData[index].category
})



