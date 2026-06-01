document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Account Form Validation Logic ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elements
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Errors
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('passError').textContent = '';
            document.getElementById('accountSuccess').textContent = '';

            let isValid = true;

            if (username === '') {
                document.getElementById('nameError').textContent = 'Full Name is required.';
                isValid = false;
            }

            if (email === '') {
                document.getElementById('emailError').textContent = 'Email address is required.';
                isValid = false;
            } else if (!email.includes('@')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (password.length < 6) {
                document.getElementById('passError').textContent = 'Password must be at least 6 characters.';
                isValid = false;
            }

            if (isValid) {
                document.getElementById('accountSuccess').textContent = '🎉 Membership Account Created Successfully!';
                registerForm.reset();
            }
        });
    }

    // --- 2. Review Form Logic & Social Interaction ---
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const revName = document.getElementById('reviewerName').value.trim();
            const revText = document.getElementById('reviewText').value.trim();

            document.getElementById('revNameError').textContent = '';
            document.getElementById('revTextError').textContent = '';

            let isRevValid = true;

            if (revName === '') {
                document.getElementById('revNameError').textContent = 'Please enter your name.';
                isRevValid = false;
            }
            if (revText === '') {
                document.getElementById('revTextError').textContent = 'Review content cannot be empty.';
                isRevValid = false;
            }

            if (isRevValid) {
                // Dynamically add review to page
                const reviewList = document.getElementById('reviewList');
                const newReview = document.createElement('div');
                newReview.classList.add('review-card');
                newReview.innerHTML = `<h4>${revName} ⭐⭐⭐⭐⭐</h4><p>"${revText}"</p>`;
                
                // Add to list and clear form
                reviewList.appendChild(newReview);
                reviewForm.reset();
                alert('Thank you for your valuable feedback!');
            }
        });
    }
});// --- Slide Show (Carousel) Logic ---
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return; // အကယ်၍ slide မရှိသော page ဖြစ်လျှင် ရပ်ရန်
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}

// Auto Slide Change (Optional: 5 စက္ကန့်လျှင်တစ်ခါ အလိုအလျောက်ပြောင်းရန်)
setInterval(() => {
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        plusSlides(1);
    }
}, 5000);


// --- Shopping Cart Logic (Using localStorage) ---
let cart = JSON.parse(localStorage.getItem('cps_cart')) || [];

// Navigation Bar ရှိ Cart အရေအတွက်ကို Update လုပ်ရန် Function
function updateCartNav() {
    const cartNav = document.getElementById('cart-nav');
    if (cartNav) {
        cartNav.textContent = `🛒 Cart (${cart.length})`;
    }
}

// Add to Cart ခလုတ်နှိပ်သည့်အခါ အလုပ်လုပ်မည့် စနစ်
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const img = button.getAttribute('data-img');

        // ပစ္စည်းအသစ်ကို Cart Object ထဲသို့ထည့်ခြင်း
        cart.push({ id, name, price, img });
        localStorage.setItem('cps_cart', JSON.stringify(cart));
        
        updateCartNav();
        alert(`${name} has been added to your cart!`);
    });
});

// Cart.html စာမျက်နှာတွင် ရွေးချယ်ထားသော ပစ္စည်းပုံနှင့် ဈေးနှုန်းများ ထုတ်ပြရန် စနစ်
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartSummary = document.getElementById('cart-summary');
    const totalElement = document.getElementById('cart-total-price');

    if (!cartContainer) return; // Cart စာမျက်နှာ မဟုတ်လျှင် ရပ်ရန်

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-img">${item.img}</span>
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button class="btn" onclick="removeFromCart(${index})" style="background-color:#e74c3c; padding: 5px 10px; font-size:14px;">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    if (cartSummary) {
        cartSummary.style.display = 'block';
        totalElement.textContent = totalPrice.toFixed(2);
    }
}

// ပစ္စည်းတစ်ခုချင်းစီ ပြန်ဖျက်ရန်
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cps_cart', JSON.stringify(cart));
    renderCart();
    updateCartNav();
};

// Cart တစ်ခုလုံး ရှင်းလင်းပစ်ရန်
window.clearCart = function() {
    cart = [];
    localStorage.setItem('cps_cart', JSON.stringify(cart));
    renderCart();
    updateCartNav();
};

// Page စဖွင့်ချိန်တွင် Nav Count နှင့် Cart List ကို တစ်ပြိုင်တည်း Run ပေးခြင်း
updateCartNav();
renderCart();
