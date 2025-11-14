import header from "../utils/utils.js";

let productTbl = document.querySelector(".product-data .row");
const search = document.getElementById("search");


const defaultProducts = [
    {
        id: 1762266516205,
        pname: "SMTLIGHT Pendant Wall Lamp Without Bulb",
        price: 495,
        description: "Elevate your home decor with this exquisite Modern Decorative Wall Sconce.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/q/i/0/1-10-wl-213-smtlight-1-26-original-imahhafzskejaeze.jpeg?q=70"
    },
    {
        id: 1762266698880,
        pname: "Adwait Pendant Wall Lamp Without Bulb",
        price: 350,
        description: "A Useful Addition To Your Home Decor Arsenal.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/x/u/j/1-12-ad-new-wall-lamp-1049-adwait-1-14-original-imagqrfs5ap4twgk.jpeg?q=70"
    },
    {
        id: 1762266815561,
        pname: "Pachauri Swing Arm Wall Light Wall Lamp Without Bulb",
        price: 398,
        description: "Elevate your space with the LEDDiT Up Down Wall Lights.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/a/y/2/1-6-fancy-wall-light-wood-pachauri-1-6-original-imahhc4tnbyzhzdt.jpeg?q=70"
    },
    {
        id: 1762266882410,
        pname: "Mehta Woodpecker Enterprises Picture Light Wall Lamp With Bulb",
        price: 249,
        description: "Extremely cool and 3D illusion.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/v/e/c/1-7-1-mehta-woodpecker-enterprises-1-9-original-imahhbu7zp4m4wby.jpeg?q=70"
    },
    {
        id: 1762268184946,
        pname: "THE UJALAVISTA Wallchiere Wall Lamp With Bulb",
        price: 999,
        description: "Elevate your home décor with this stunning and luxurious Modern Wall Sconce.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/n/1/g/1-21-led-circle-wall-light-pack-of-1-the-ujalavista-1-13-original-imahhfpjxarhrhtk.jpeg?q=70"
    },
    {
        id: 1762268274574,
        pname: "SMTLIGHT Wallchiere Wall Lamp Without Bulb",
        price: 490,
        description: "Illuminate your space with a touch of timeless elegance.",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/b/z/s/1-22-wl-555-smtlight-1-26-original-imahh9uncx8hq6zw.jpeg?q=70"
    },
    {
        id: 1762325662057,
        pname: "Blissbells Wallchiere Wall Lamp With Bulb",
        price: 689,
        description: "It has three color light (white, warm white, natural white).",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/wall-lamp/0/w/h/1-14-florence-crystal-wall-lamp-6-watt-led-with-three-colour-led-original-imahhghgeq73h9jj.jpeg?q=70"
    }
];

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
}

let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

const displayProduct = (data = products) => {
    productTbl.innerHTML = "";

    data.forEach((product) => {
        const { image, pname, price, description, id } = product;

        let col = document.createElement("div");
        col.classList.add("col-md-3", "mb-4");

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${image}" class="card-img-top" height="250px" alt="${pname}">
                <div class="card-body">
                    <h5 class="card-title">${pname}</h5>
                    <h6 class="card-subtitle pt-2 text-success fw-bold">₹ ${price}</h6>
                    <p class="card-text pt-2 text-muted">${description}</p>
                </div>
                <div class="card-footer border-0 text-center bg-transparent">
                    <button class="btn btn-danger w-100" onclick="addToCart(${id})">Add to Cart</button>
                </div>
            </div>
       `;
        productTbl.appendChild(col);
    });
};

displayProduct();

const addToCart = (id) => {
    let product = products.find((p) => p.id == id);
    let index = cartData.findIndex((item) => item.id == id);

    if (index !== -1) {
        cartData[index].qty++;
    } else {
        product.qty = 1;
        cartData.push(product);
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    alert("✅ Product added to cart!");
    updateCartCount();
};
window.addToCart = addToCart;

const updateCartCount = () => {
    let badge = document.querySelector(".badge.bg-danger");
    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("cartData")) || [];
    badge.textContent = cart.length;
};

updateCartCount();

search.addEventListener("input", function () {

    let filterData = products.filter(product =>
        product.pname.toLowerCase().includes(this.value.toLowerCase())
    );

    displayProduct(filterData);
});
