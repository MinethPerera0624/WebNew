// Product Database
const allProducts = [
    // Running
    { id: 1, name: 'Air Max 90', category: 'running', price: 129.99, image: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    { id: 2, name: 'Pegasus 41', category: 'running', price: 139.99, image: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    { id: 3, name: 'Vaporfly Next%', category: 'running', price: 249.99, image: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 4, name: 'Revolution 7', category: 'running', price: 69.99, image: 'linear-gradient(135deg, #fa709a, #fee140)' },
    
    // Basketball
    { id: 5, name: 'Jordan 1 Retro', category: 'basketball', price: 169.99, image: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 6, name: 'LeBron 21', category: 'basketball', price: 189.99, image: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 7, name: 'Kyrie 8', category: 'basketball', price: 149.99, image: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    { id: 8, name: 'Giannis Immortality', category: 'basketball', price: 179.99, image: 'linear-gradient(135deg, #fa709a, #fee140)' },
    
    // Soccer
    { id: 9, name: 'Phantom GT', category: 'soccer', price: 149.99, image: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    { id: 10, name: 'Mercurial Superfly', category: 'soccer', price: 159.99, image: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 11, name: 'Phantom Elite', category: 'soccer', price: 199.99, image: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    { id: 12, name: 'Phantom Academy', category: 'soccer', price: 89.99, image: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    
    // Training
    { id: 13, name: 'Metcon 8', category: 'training', price: 139.99, image: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 14, name: 'Romaleos 4', category: 'training', price: 189.99, image: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    { id: 15, name: 'Flex Trainer', category: 'training', price: 99.99, image: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 16, name: 'Revolution 7', category: 'training', price: 79.99, image: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    
    // Lifestyle
    { id: 17, name: 'Air Force 1', category: 'lifestyle', price: 119.99, image: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 18, name: 'Blazer Mid', category: 'lifestyle', price: 109.99, image: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 19, name: 'Court Legacy', category: 'lifestyle', price: 99.99, image: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    { id: 20, name: 'Cortez', category: 'lifestyle', price: 99.99, image: 'linear-gradient(135deg, #667eea, #764ba2)' },
];

let filteredProducts = [...allProducts];

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: ${product.image};">
                <span class="product-badge">${product.price > 150 ? 'PREMIUM' : 'SALE'}</span>
            </div>
            <h3>${product.name}</h3>
            <p class="category">${capitalizeCategory(product.category)}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn btn-secondary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    
    filteredProducts = allProducts.filter(product => {
        let categoryMatch = !categoryFilter || product.category === categoryFilter;
        let priceMatch = true;
        
        if (priceFilter) {
            if (priceFilter === '0-100') priceMatch = product.price < 100;
            else if (priceFilter === '100-150') priceMatch = product.price >= 100 && product.price < 150;
            else if (priceFilter === '150-200') priceMatch = product.price >= 150 && product.price < 200;
            else if (priceFilter === '200+') priceMatch = product.price >= 200;
        }
        
        return categoryMatch && priceMatch;
    });
    
    displayProducts();
}

// Get category from URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || '';
}

// Capitalize category name
function capitalizeCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Update page title based on category
function updatePageTitle() {
    const category = getCategoryFromURL();
    const titleElement = document.getElementById('category-title');
    
    if (titleElement) {
        if (category) {
            titleElement.textContent = capitalizeCategory(category) + ' Products';
        } else {
            titleElement.textContent = 'All Products';
        }
    }
}

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    updatePageTitle();
    
    const category = getCategoryFromURL();
    if (category) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }
    }
    
    filterProducts();
});
