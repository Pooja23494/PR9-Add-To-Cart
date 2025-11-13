import header from "../utils/utils.js";
const inputs = document.querySelectorAll('#product input');
const form = document.querySelector('#product');
inputs[0].focus();
let products = JSON.parse(localStorage.getItem('products')) || [];
let data = {};

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        let { name, value } = e.target;
        data = { ...data, [name]: value };
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    products.push({ ...data, id: Date.now() });
    localStorage.setItem('products', JSON.stringify(products));
    inputs[0].focus();
    form.reset();
})