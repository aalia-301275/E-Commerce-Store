//////////////////////////////
// PRODUCTS DATA
//////////////////////////////
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        description: "High-performance laptop for gaming and work.",
        category: "Electronics",
        stock: 5
    },
    {
        id: 2,
        name: "Phone",
        price: 800,
        description: "Latest smartphone with great camera.",
        category: "Electronics",
        stock: 10
    },
    {
        id: 3,
        name: "Headphones",
        price: 150,
        description: "Noise cancelling headphones.",
        category: "Accessories",
        stock: 15
    },
    {
        id: 4,
        name: "Watch",
        price: 200,
        description: "Smart watch with fitness tracking.",
        category: "Wearables",
        stock: 8
    },
    {
        id: 5,
        name: "Tablet",
        price: 600,
        description: "Portable tablet for study, entertainment, and work.",
        category: "Electronics",
        stock: 7
    },
    {
        id: 6,
        name: "Keyboard",
        price: 80,
        description: "Mechanical keyboard with fast response for gaming and typing.",
        category: "Accessories",
        stock: 20
    },
    {
        id: 7,
        name: "Mouse",
        price: 50,
        description: "Wireless ergonomic mouse with smooth tracking.",
        category: "Accessories",
        stock: 25
    },
    {
        id: 8,
        name: "Monitor",
        price: 300,
        description: "Full HD 24-inch monitor for work and gaming.",
        category: "Electronics",
        stock: 6
    }
    ];

//////////////////////////////
// DISPLAY PRODUCTS (HOME)
//////////////////////////////
const productList = document.getElementById("product-list");

function displayProducts(list = products) {
    if (!productList) return;

    productList.innerHTML = "";

    list.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="viewProduct(${product.id})">View Product</button>
            </div>
        `;
    });
}

if (productList) {
    displayProducts();
}

//////////////////////////////
// SEARCH
//////////////////////////////
const searchBar = document.getElementById("searchBar");

if (searchBar) {
    searchBar.addEventListener("input", function () {
        const value = this.value.toLowerCase();

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        displayProducts(filtered);
    });
}

//////////////////////////////
// VIEW PRODUCT PAGE
//////////////////////////////
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

//////////////////////////////
// PRODUCT DETAILS PAGE
//////////////////////////////
const productDetails = document.getElementById("product-details");

if (productDetails) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = products.find(p => p.id === id);

    if (product) {
        productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Stock:</b> ${product.stock}</p>
            <p>${product.description}</p>

            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    } else {
        productDetails.innerHTML = `<p>Product not found</p>`;
    }
}

//////////////////////////////
// ADD TO CART
//////////////////////////////
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(p => p.id === id);

    if (!product) return;

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}

//////////////////////////////
// CART PAGE
//////////////////////////////
const cartContainer = document.getElementById("cart-items");

if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        total += item.price;

        cartContainer.innerHTML += `
            <div class="product">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>
        `;
    });

    const totalEl = document.getElementById("total");
    if (totalEl) {
        totalEl.innerText = "Total: $" + total;
    }
}

//////////////////////////////
// PLACE ORDER (IMPORTANT FIX)
//////////////////////////////
function placeOrder() {

    const name = document.getElementById("name")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    if (!name || !address) {
        alert("Please fill all details");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href = "index.html";
}