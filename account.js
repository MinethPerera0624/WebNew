// User database (stored in localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load profile or orders if needed
    if (tabName === 'profile') {
        loadProfile();
    } else if (tabName === 'orders') {
        loadOrders();
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Login successful!');
        loadProfile();
        switchTab('profile');
    } else {
        alert('Invalid email or password');
    }
    
    // Clear form
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toLocaleDateString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showNotification('Account created successfully!');
    loadProfile();
    switchTab('profile');
    
    // Clear form
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm').value = '';
}

// Load profile
function loadProfile() {
    const profileInfo = document.getElementById('profileInfo');
    
    if (!profileInfo) return;
    
    if (!currentUser) {
        profileInfo.innerHTML = '<p>Please login to view your profile.</p>';
        return;
    }
    
    profileInfo.innerHTML = `
        <div class="profile-details">
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Member Since:</strong> ${currentUser.joinDate}</p>
        </div>
    `;
}

// Load orders
function loadOrders() {
    const ordersInfo = document.getElementById('ordersInfo');
    
    if (!ordersInfo) return;
    
    if (!currentUser) {
        ordersInfo.innerHTML = '<p>Please login to view your orders.</p>';
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersInfo.innerHTML = '<p>You have no orders yet.</p>';
        return;
    }
    
    ordersInfo.innerHTML = orders.map(order => `
        <div class="order-item" style="background: #f9f9f9; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> <span style="color: #4caf50; font-weight: bold;">${order.status}</span></p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Items:</strong> ${order.items.length}</p>
        </div>
    `).join('');
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.setItem('currentUser', JSON.stringify(null));
    showNotification('Logged out successfully!');
    switchTab('login');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize account page
document.addEventListener('DOMContentLoaded', function() {
    if (currentUser) {
        loadProfile();
    }
});
