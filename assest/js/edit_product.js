import header from "../utils/utils.js";
const inputs = document.querySelectorAll('#product input');
const form = document.querySelector('#product');
inputs[0].focus();
let products = JSON.parse(localStorage.getItem('products')) || [];
let data = JSON.parse(localStorage.getItem('editData')) || {};

inputs.forEach((input) => {
    input.value = data[input.name];
})

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        let { name, value } = e.target;
        data = { ...data, [name]: value };
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    products = products.map((value) => {
        if (value.id == data.id) {
            return data;
        }
        return value;
    })
    localStorage.setItem('products', JSON.stringify(products));
    window.location.href = './view_product.html';
})