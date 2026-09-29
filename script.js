// ==========================================
// USEDMART CLASSIFIED MARKETPLACE
// ==========================================


// ==========================================
// DEFAULT PRODUCTS
// ==========================================

const defaultProducts = [

    {
        id: 1,
        title: "iPhone 13 128GB",
        category: "Mobiles",
        price: 32000,
        location: "Sathyamangalam",
        condition: "Like New",
        description: "Excellent condition. Battery health 92%.",
        emoji: "📱",
        date: "2026-09-10"
    },

    {
        id: 2,
        title: "Honda Activa 6G",
        category: "Bikes",
        price: 72000,
        location: "Erode",
        condition: "Good",
        description: "Well maintained. Single owner vehicle.",
        emoji: "🏍️",
        date: "2026-09-09"
    },

    {
        id: 3,
        title: "Dell Inspiron Laptop",
        category: "Electronics",
        price: 28000,
        location: "Coimbatore",
        condition: "Good",
        description: "Intel i5, 8GB RAM, 512GB SSD.",
        emoji: "💻",
        date: "2026-09-08"
    },

    {
        id: 4,
        title: "Wooden Sofa Set",
        category: "Furniture",
        price: 15000,
        location: "Sathyamangalam",
        condition: "Good",
        description: "Premium wooden sofa set. Very comfortable.",
        emoji: "🛋️",
        date: "2026-09-07"
    },

    {
        id: 5,
        title: "Maruti Swift 2019",
        category: "Cars",
        price: 650000,
        location: "Erode",
        condition: "Good",
        description: "Petrol car, excellent condition.",
        emoji: "🚗",
        date: "2026-09-06"
    },

    {
        id: 6,
        title: "Engineering Books Bundle",
        category: "Books",
        price: 1200,
        location: "Coimbatore",
        condition: "Used",
        description: "Collection of engineering textbooks.",
        emoji: "📚",
        date: "2026-09-05"
    },

    {
        id: 7,
        title: "Men's Denim Jacket",
        category: "Fashion",
        price: 900,
        location: "Sathyamangalam",
        condition: "Like New",
        description: "Worn only a few times. Size L.",
        emoji: "👕",
        date: "2026-09-04"
    },

    {
        id: 8,
        title: "Sony Bluetooth Speaker",
        category: "Electronics",
        price: 4500,
        location: "Erode",
        condition: "Good",
        description: "Powerful sound and good battery life.",
        emoji: "🔊",
        date: "2026-09-03"
    }

];


// ==========================================
// LOAD PRODUCTS FROM LOCAL STORAGE
// ==========================================

let savedProducts =
    JSON.parse(localStorage.getItem("usedMartProducts"));

let products = savedProducts || defaultProducts;


// ==========================================
// HTML ELEMENTS
// ==========================================

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const sortProducts =
    document.getElementById("sortProducts");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const sellModal =
    document.getElementById("sellModal");

const openSellForm =
    document.getElementById("openSellForm");

const heroSellButton =
    document.getElementById("heroSellButton");

const closeModal =
    document.getElementById("closeModal");

const sellForm =
    document.getElementById("sellForm");


// ==========================================
// CURRENT FILTER
// ==========================================

let currentCategory = "All";


// ==========================================
// CATEGORY ICONS
// ==========================================

const categoryIcons = {

    Mobiles: "📱",

    Cars: "🚗",

    Bikes: "🏍️",

    Electronics: "💻",

    Furniture: "🛋️",

    Books: "📚",

    Fashion: "👕",

    Other: "📦"

};


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {

    productGrid.innerHTML = "";


    if (productList.length === 0) {

        noResults.style.display = "block";

        resultCount.textContent = "0 products";

        return;

    }


    noResults.style.display = "none";


    resultCount.textContent =
        `${productList.length} products`;


    productList.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className = "product-card";


        const icon =
            categoryIcons[product.category] ||
            product.emoji ||
            "📦";


        card.innerHTML = `

            <div class="product-image">

                ${
                    product.image
                    ?
                    `<img
                        src="${product.image}"
                        alt="${product.title}"
                        onerror="this.style.display='none';
                        this.nextElementSibling.style.display='block';"
                    >`
                    :
                    ""
                }

                <span
                    class="placeholder-image"
                    style="
                        display:
                        ${product.image ? "none" : "block"};
                    "
                >
                    ${icon}
                </span>


                <button
                    class="favorite-button"
                    data-id="${product.id}"
                >
                    ♡
                </button>

            </div>


            <div class="product-details">

                <div class="product-price">
                    ₹${formatPrice(product.price)}
                </div>

                <div class="product-title">
                    ${escapeHTML(product.title)}
                </div>

                <div class="product-description">
                    ${escapeHTML(product.description)}
                </div>

                <div class="product-meta">

                    <span class="condition">
                        ${escapeHTML(product.condition)}
                    </span>

                    <span>
                        📍 ${escapeHTML(product.location)}
                    </span>

                </div>

                <button
                    class="contact-button"
                    data-title="${escapeHTML(product.title)}"
                >
                    Contact Seller
                </button>

            </div>
        `;


        productGrid.appendChild(card);

    });


    addFavoriteEvents();

    addContactEvents();

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    return Number(price).toLocaleString("en-IN");

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// SEARCH + FILTER
// ==========================================

function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        products.filter(function (product) {

            const matchesCategory =
                currentCategory === "All" ||
                product.category === currentCategory;


            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchText) ||

                product.description
                    .toLowerCase()
                    .includes(searchText) ||

                product.location
                    .toLowerCase()
                    .includes(searchText) ||

                product.category
                    .toLowerCase()
                    .includes(searchText);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    sortProductList(filtered);

}


// ==========================================
// SORT PRODUCTS
// ==========================================

function sortProductList(list) {

    const sortValue =
        sortProducts.value;


    if (sortValue === "low") {

        list.sort(function (a, b) {
            return a.price - b.price;
        });

    }


    if (sortValue === "high") {

        list.sort(function (a, b) {
            return b.price - a.price;
        });

    }


    if (sortValue === "latest") {

        list.sort(function (a, b) {

            return new Date(b.date) -
                   new Date(a.date);

        });

    }


    displayProducts(list);

}


// ==========================================
// SEARCH EVENTS
// ==========================================

searchInput.addEventListener(
    "input",
    filterProducts
);


searchButton.addEventListener(
    "click",
    filterProducts
);


sortProducts.addEventListener(
    "change",
    filterProducts
);


// ==========================================
// CATEGORY FILTER
// ==========================================

document
    .querySelectorAll("[data-category]")
    .forEach(function (element) {

        element.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                currentCategory =
                    element.dataset.category;

                filterProducts();

                window.scrollTo({
                    top: 500,
                    behavior: "smooth"
                });

            }
        );

    });


// ==========================================
// FAVORITES
// ==========================================

function addFavoriteEvents() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle("active");

                if (
                    button.classList.contains("active")
                ) {

                    button.textContent = "♥";

                } else {

                    button.textContent = "♡";

                }

            }
        );

    });

}


// ==========================================
// CONTACT SELLER
// ==========================================

function addContactEvents() {

    const buttons =
        document.querySelectorAll(
            ".contact-button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const title =
                    button.dataset.title;


                alert(
                    `You selected "${title}".\n\n` +
                    `In a real application, this would ` +
                    `open a chat with the seller.`
                );

            }
        );

    });

}


// ==========================================
// OPEN SELL MODAL
// ==========================================

function openModal() {

    sellModal.classList.add("show");

}


openSellForm.addEventListener(
    "click",
    openModal
);


heroSellButton.addEventListener(
    "click",
    openModal
);


// ==========================================
// CLOSE SELL MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        sellModal.classList.remove("show");

    }
);


// Close when clicking outside
sellModal.addEventListener(
    "click",
    function (event) {

        if (event.target === sellModal) {

            sellModal.classList.remove("show");

        }

    }
);


// ==========================================
// POST NEW PRODUCT
// ==========================================

sellForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            document.getElementById(
                "productTitle"
            ).value.trim();


        const category =
            document.getElementById(
                "productCategory"
            ).value;


        const price =
            Number(
                document.getElementById(
                    "productPrice"
                ).value
            );


        const location =
            document.getElementById(
                "productLocation"
            ).value.trim();


        const condition =
            document.getElementById(
                "productCondition"
            ).value;


        const description =
            document.getElementById(
                "productDescription"
            ).value.trim();


        const image =
            document.getElementById(
                "productImage"
            ).value.trim();


        const newProduct = {

            id: Date.now(),

            title: title,

            category: category,

            price: price,

            location: location,

            condition: condition,

            description: description,

            image: image,

            emoji:
                categoryIcons[category] || "📦",

            date:
                new Date().toISOString()

        };


        products.unshift(newProduct);


        // Save to browser
        localStorage.setItem(
            "usedMartProducts",
            JSON.stringify(products)
        );


        // Reset form
        sellForm.reset();


        // Close modal
        sellModal.classList.remove("show");


        // Reset category
        currentCategory = "All";


        // Display
        filterProducts();


        // Message
        alert(
            "Your product has been posted successfully! 🎉"
        );

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

displayProducts(products);
