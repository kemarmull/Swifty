const SAMPLE_USERNAME = localStorage.getItem("username") || "kemarmull05";
const SAMPLE_PASSWORD = localStorage.getItem("password") || "nightslasher101";

// Variables to store input values
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const authForm = document.getElementById("authForm");
const registerForm = document.getElementById("registerForm");

let loginAttempts = 0;

if (authForm) {
    authForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validations
        if (username === "" || password === "") {
            alert("All fields are required.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Check credentials
        if (username === SAMPLE_USERNAME && password === SAMPLE_PASSWORD) {
            window.location.href = "products.html"; 
        } else {
            loginAttempts++;
            if (loginAttempts >= 3) {
                window.location.href = "error.html"; // Redirect to error page after 3 attempts
            } else {
                alert("Invalid username or password. Please try again.");
            }
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const newUsername = document.getElementById("newUsername").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();

        // Simple validations
        if (newUsername === "" || newPassword === "") {
            alert("All fields are required.");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Save the new credentials 
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);

        alert("Registration successful! You can now log in.");
        window.location.href = "index.html"; 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.navbar-right a');
    const logoLink = document.getElementById('logo-link');
    const searchForm = document.getElementById('search-form');
    const searchBar = document.getElementById('search-bar');
    const cartButton = document.querySelector('.fa-cart-shopping');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsList = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const bottomCheckoutButton = document.getElementById('checkout');
    const cancelButton = document.getElementById('cancel-button');
    const exitButton = document.getElementById('exit-button');
    const contactForm = document.getElementById('contact-form');

    // Initialize the cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = [
        { id: 1, name: 'Toyota Corolla', price: 5000, qty: 10 },
        { id: 2, name: 'Honda Civic', price: 7000, qty: 8 },
        { id: 3, name: 'Honda City', price: 6500, qty: 5 },
        { id: 4, name: 'Toyota Camry', price: 9000, qty: 7 },
        { id: 5, name: 'Mercedes-Benz C300', price: 10000, qty: 4 },
        { id: 6, name: 'Audi A5 convertible', price: 8000, qty: 6 },
        { id: 7, name: 'Honda CRV', price: 8000, qty: 15 },
        { id: 8, name: 'BMW X7', price: 8000, qty: 15 },
        { id: 9, name: 'BMW X1', price: 8000, qty: 15 },
        { id: 10, name: 'BMW 320i', price: 8000, qty: 15 },
        { id: 11, name: 'Mercedes-Benz C63s', price: 8000, qty: 15 },
        { id: 12, name: 'Toyota Hilux', price: 8000, qty: 15 },
        { id: 13, name: 'Volkswagen Golf R', price: 8000, qty: 15 },
        { id: 14, name: 'Toyota RAV4', price: 8000, qty: 15 },
        { id: 15, name: 'Toyota Cross', price: 8000, qty: 15 },
        { id: 16, name: 'Toyota Fortuner', price: 8000, qty: 15 },
        { id: 17, name: 'Car Servicing', price: 12000, qty: 100 },
        { id: 18, name: 'Car Wash and Vacuum', price: 1500, qty: 100 },
        { id: 19, name: 'Pick-up and Drop-off', price: 3000, qty: 100 },
        { id: 20, name: 'Full Interior Detail', price: 18000, qty: 100 },
        { id: 21, name: 'GPS Navigation Software', price: 3000, qty: 100 },
        { id: 22, name: 'Child Car Seat', price: 3000, qty: 100 }
    ];

    // Function to display the cart
    function displayCart() {
        cartItemsList.innerHTML = ""; // Clear previous items
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.qty}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });

        // Update localStorage with current cart
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        const product = cart[index];
        const originalProduct = products.find(p => p.id === product.id);
        originalProduct.qty += cart[index].qty;
        cart.splice(index, 1);
        displayCart();
    }

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const productName = this.getAttribute('data-product-name');
            const productPrice = parseFloat(this.getAttribute('data-product-price'));

            const product = products.find(p => p.id === productId);

            if (product && product.qty > 0) {
                const cartItem = cart.find(item => item.id === productId);
                if (cartItem) {
                    cartItem.qty += 1;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, qty: 1 });
                }
                product.qty -= 1;
                alert(`${product.name} has been added to the cart.`);
                displayCart();
            } else {
                alert(`${product.name} is out of stock.`);
            }
        });
    });

    // Add event listener to the cart button to display the cart dropdown
    cartButton.addEventListener('click', function(event) {
        event.preventDefault();
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Add event listener to the checkout button to redirect to invoice page
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
        } else {
            window.location.href = "invoice.html"; // Redirect to the invoice page
        }
    });

    // Add event listener to the bottom checkout button to redirect to invoice page
    bottomCheckoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
        } else {
            window.location.href = "invoice.html"; // Redirect to the invoice page
        }
    });

    // Add event listener to the cancel button to clear the cart
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            localStorage.removeItem('cart');
            cart = [];
            alert('Cart has been cleared.');
            displayCart();
        });
    }

    // Add event listener to the exit button to redirect to the products page
    if (exitButton) {
        console.log('Exit button found');
        exitButton.addEventListener('click', function() {
            console.log('Exit button clicked');
            window.location.href = 'products.html';
        });
    } else {
        console.log('Exit button not found');
    }

    // Add event listener to the contact form to handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            console.log('Contact Form Submission:', { name, email, subject, message });
            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Display the cart when the page loads
    displayCart();
});








