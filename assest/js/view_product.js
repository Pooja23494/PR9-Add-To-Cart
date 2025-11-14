import header from "../utils/utils.js";

let productTbl = document.querySelector("#productTbl tbody");
let search = document.getElementById("search");
let products = JSON.parse(localStorage.getItem("products")) || [];

const displayProduct = (data = products) => {
    productTbl.innerHTML = "";

    data.forEach((product, index) => {
        const { image, pname, price, description, id } = product;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${image}" height="100px" width="100px" alt="${pname}" />
            </td>
            <td>${pname}</td>
            <td>₹ ${price}</td>
            <td>${description}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button>
                <button class="btn btn-warning" onclick="editProduct(${id})">Edit</button>
            </td>
        `;
        productTbl.appendChild(row);
    });
};

displayProduct();

const deleteProduct = (id) => {
    products = products.filter((val) => val.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProduct();
};
window.deleteProduct = deleteProduct;

const editProduct = (id) => {
    let data = products.find((val) => val.id == id);
    localStorage.setItem("editData", JSON.stringify(data));
    window.location.href = "./edit_product.html";
};
window.editProduct = editProduct;

search.addEventListener("input", function () {

    let filterData = products.filter(product =>
        product.pname.toLowerCase().includes(this.value.toLowerCase().trim())
    );

    displayProduct(filterData);
});
