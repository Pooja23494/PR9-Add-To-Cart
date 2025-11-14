let base_url = window.location.pathname;
let preFix = "";

if (base_url.includes("assest/pages")) {
    preFix = "./";
} else {
    preFix = "./assest/pages/";
}

window.onload = function () {
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
};

const isIndexPage = base_url.endsWith("/") || base_url.endsWith("index.html");

let cartIcon = "";
if (isIndexPage) {
    cartIcon = `
        <a href="${preFix}cart.html" class="text-decoration-none text-black position-relative mx-4">
            <i class="bi bi-cart3 fs-4"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
            </span>
        </a>
    `;
}

let nav = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand fs-2 fw-semibold" href="/">Wall<span class="text-danger"> Lamp</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end align-items-center"
            id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${preFix}add_product.html">Add Product</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${preFix}view_product.html">View Product</a>
                    </li>
                </ul>
                 ${cartIcon}
                <form class="d-flex" role="search">
                    <input class="form-control me-2" id="search" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-danger" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
`;

const header = document.querySelector('header').innerHTML = nav;

export default header;

let p = `
    <p class="bg-body-tertiary py-3 d-flex align-items-center justify-content-center mb-0">
        2025 @ Copyright |
        Developed by :
        <a href="javascript:void(0)" class="text-decoration-none">
            <span class="text-danger ms-1">Pooja Patel</span>
        </a>
    </p>
`;

export const footer = document.querySelector('footer').innerHTML = p;



