const cart = [];
let allProducts = [];

// fetch all products
const fetchProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Fetch categories from the API
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        populateCategoryFilter(categories);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}

// Populate category filter dropdown
function populateCategoryFilter(categories) {
    const categoryFilter = document.getElementById('category-filter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = capitalizeFirstLetter(category);
        categoryFilter.appendChild(option);
    });
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const displayProducts = (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {

        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.id = product.id;

        const h3 = document.createElement("h3");
        h3.textContent = product.title;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.className = "imageProd";

        const priceH3 = document.createElement("h3");
        priceH3.textContent = `$${product.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.className = "addButton";
        button.addEventListener('click', () => addToCart(product.id));

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        const maxChars = 50; // Limite de caracteres
        const truncatedDescription = product.description.length > maxChars ? 
            product.description.substring(0, maxChars) + "..." : product.description;

        // Create truncated paragraph
        const truncatedP = document.createElement("p");
        truncatedP.className = "truncated";
        truncatedP.textContent = truncatedDescription;

        // Create full paragraph
        const fullP = document.createElement("p");
        fullP.className = "full";
        fullP.textContent = product.description;
        fullP.style.display = "none";

        const moreButton = document.createElement("button");
        moreButton.textContent = "Ver más";
        moreButton.className = "moreButton"
        moreButton.addEventListener('click', () => {
            if (truncatedP.style.display !== "none") {
                truncatedP.style.display = "none";
                fullP.style.display = "block";
                moreButton.textContent = "Ver menos";
            } else {
                truncatedP.style.display = "block";
                fullP.style.display = "none";
                moreButton.textContent = "Ver más";
            }
        });

        descriptionDiv.appendChild(truncatedP);
        descriptionDiv.appendChild(fullP);
        descriptionDiv.appendChild(moreButton); 

        productDiv.appendChild(h3);
        productDiv.appendChild(img);
        productDiv.appendChild(priceH3);
        productDiv.appendChild(button);
        productDiv.appendChild(descriptionDiv); 

        productList.appendChild(productDiv);
    });
};


// Funciones generales del filtro
const filterItems = (items, searchTerm) => {
    return items.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        (item.category && item.category.toLowerCase().includes(searchTerm)) || 
        item.id.toString().includes(searchTerm)
    );
};

// Filtro (Nombre o categoría)
const filterProducts = () => {
    const searchTerm = document.getElementById("search-products").value.toLowerCase();
    const filteredProducts = filterItems(allProducts, searchTerm);
    displayProducts(filteredProducts);
};


const addToCart = (productId) => {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = allProducts.find(p => p.id === productId);
        cart.push({ id: productId, title: product.title, price: product.price,image: product.image, quantity: 1 });
    }
    updateCart();
};


const updateCart = (product) => {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = ""; 
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";

        const productTitle = document.createElement("h4");
        productTitle.textContent = `${item.title} (ID: ${item.id})`;

      // Crear y añadir la imagen del producto
      const productImage = document.createElement("img");
        productImage.src = item.image;  // Aquí asegúrate de que esté usando 'item.image'
        productImage.alt = item.title;
        productImage.className = "imageProd";

        const productQuantity = document.createElement("p");
        productQuantity.textContent = `Quantity: ${item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', () => removeFromCart(item.id));

        // Botón para aumentar la cantidad
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener('click', () => changeQuantity(item.id, 'increase'));

        // Botón para disminuir la cantidad
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener('click', () => changeQuantity(item.id, 'decrease'));

        cartItemDiv.appendChild(productTitle);
        cartItemDiv.appendChild(productImage);
        cartItemDiv.appendChild(productQuantity);
        cartItemDiv.appendChild(removeButton);
        cartItemDiv.appendChild(increaseButton);
        cartItemDiv.appendChild(decreaseButton);

        cartDiv.appendChild(cartItemDiv);
    });

 //   const cart = [];
// let allProducts = [];

const fetchProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Renderizar productos
const displayProducts = (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.id = product.id;

        const h3 = document.createElement("h3");
        h3.textContent = product.title;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.className = "imageProd";

        const priceH3 = document.createElement("h3");
        priceH3.textContent = `$${product.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.className = "addButton";
        button.addEventListener('click', () => addToCart(product.id));

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        const maxChars = 50;
        const truncatedDescription = product.description.length > maxChars ? 
            product.description.substring(0, maxChars) + "..." : product.description;

        const truncatedP = document.createElement("p");
        truncatedP.className = "truncated";
        truncatedP.textContent = truncatedDescription;

        const fullP = document.createElement("p");
        fullP.className = "full";
        fullP.textContent = product.description;
        fullP.style.display = "none";

        const moreButton = document.createElement("button");
        moreButton.textContent = "Ver más";
        moreButton.className = "moreButton";
        moreButton.addEventListener('click', () => {
            if (truncatedP.style.display !== "none") {
                truncatedP.style.display = "none";
                fullP.style.display = "block";
                moreButton.textContent = "Ver menos";
            } else {
                truncatedP.style.display = "block";
                fullP.style.display = "none";
                moreButton.textContent = "Ver más";
            }
        });

        descriptionDiv.appendChild(truncatedP);
        descriptionDiv.appendChild(fullP);
        descriptionDiv.appendChild(moreButton);

        productDiv.appendChild(h3);
        productDiv.appendChild(img);
        productDiv.appendChild(priceH3);
        productDiv.appendChild(button);
        productDiv.appendChild(descriptionDiv);

        productList.appendChild(productDiv);
    });
};


    // Actualizar el total en el resumen del carrito
    const cartSummary = document.getElementById("cart-summary");
    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
};


// Intentando conseguir esta cosa pero no me sirve
const showCartButton = document.getElementById("showCart");
const showProductsButton = document.getElementById("show-products");
const cartDi = document.getElementById("contentCart");
const productListDiv = document.getElementById("main");

// La mugrosa funcionalidad que esta pendiente
showCartButton.addEventListener("click", () => {
    cartDi.style.display = "block";
    productListDiv.style.display = "none";
    showCartButton.style.display = "none";
    showProductsButton.style.display = "block";
    updateCart();
    console.log("Funciona");
});

showProductsButton.addEventListener("click", () => {
    cartDi.style.display = "none";
    productListDiv.style.display = "block";
    showCartButton.style.display = "block";
    showProductsButton.style.display = "none";
    updateCart();
});


// filtro del carrito
const filterCart = () => {
    const searchTerm = document.getElementById("search-cart").value.toLowerCase();
    const filteredCart = filterItems(cart, searchTerm);
    displayCart(filteredCart);
};

// Renderizar los productos del carrito
const displayCart = (filteredCart) => {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = ""; // Limpiar el contenido anterior
    let total = 0;

    filteredCart.forEach(item => {
        total += item.price * item.quantity;

        // Crear el div contenedor del producto en el carrito
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";

        // Crear el título del producto (nombre e ID)
        const productTitle = document.createElement("h4");
        productTitle.textContent = `${item.title} (ID: ${item.id})`;

        // Crear la cantidad del producto
        const productQuantity = document.createElement("p");
        productQuantity.textContent = `Quantity: ${item.quantity}`;

        // Botón para eliminar el producto del carrito
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', () => removeFromCart(item.id));

        // Botón para aumentar la cantidad
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener('click', () => changeQuantity(item.id, 'increase'));

        // Botón para disminuir la cantidad
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener('click', () => changeQuantity(item.id, 'decrease'));

        // Añadir los elementos al div del producto en el carrito
        cartItemDiv.appendChild(productTitle);
        cartItemDiv.appendChild(productQuantity);
        cartItemDiv.appendChild(removeButton);
        cartItemDiv.appendChild(increaseButton);
        cartItemDiv.appendChild(decreaseButton);

        // Añadir el div del producto al contenedor del carrito
        cartDiv.appendChild(cartItemDiv);
    });

    // Actualizar el total en el resumen del carrito
    const cartSummary = document.getElementById("cart-summary");
    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
};


// Quitar productos del carro
const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCart();
};

// Función para cambiar la cantidd en el carro
const changeQuantity = (productId, action) => {
    const product = cart.find(item => item.id === productId);
    if (action === 'increase') {
        product.quantity++;
    } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity--;
    }
    updateCart();
};


// Filter by category
const filterByCategory = (category) => {
    const filteredProducts = category ? 
        allProducts.filter(product => product.category === category) : allProducts;
    displayProducts(filteredProducts);
};

// Filter by price (ascending or descending)
const filterByPrice = (order) => {
    const sortedProducts = [...allProducts].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    displayProducts(sortedProducts);
};

// Handle price sort
function handlePriceSort(order) {
    if (order) {
        filterByPrice(order);
    }
}

// Handle category filter
function handleCategoryFilter() {
    const selectedCategory = document.getElementById("category-filter").value;
    filterByCategory(selectedCategory);
}

// Fetch initial data
fetchProducts();
fetchCategories();



// ME FALTA TERMINAR DE IMPLEMENTAR EL SHOWCART Y SHOWPRODUCTS PARA MOSTRAR EL CARRITO Y REGRESAR A LOS PRODUCTOS