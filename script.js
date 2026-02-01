// Product data
const PRODUCTS = [
  {
    id: '1',
    name: "WOMEN'S PRO SWIMSUIT",
    price: 65,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
    category: 'SWIM'
  },
  {
    id: '2',
    name: "ELITE BASKETBALL JERSEY",
    price: 50,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    category: 'BASKETBALL'
  },
  {
    id: '3',
    name: "MEN'S ELITE PERFORMANCE SHOES",
    price: 80,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'ALL'
  },
  {
    id: '4',
    name: "WOMEN'S PERFORMANCE FINJAMAS",
    price: 65,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    category: "WOMEN'S"
  },
  {
    id: '5',
    name: "UNISEX SWIM GOGGLES",
    price: 25,
    image: 'https://images.unsplash.com/photo-1551698618-1fed5d978244?auto=format&fit=crop&q=80&w=800',
    category: 'SWIM'
  },
  {
    id: '6',
    name: "MEN'S PERFORMANCE TEE",
    price: 40,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    category: 'ALL'
  },
  {
    id: '7',
    name: "GYM GLOVES & BOTTLE SET",
    price: 40,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    category: 'ALL'
  },
  {
    id: '8',
    name: "PRO BASKETBALL SHORTS",
    price: 35,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
    category: 'BASKETBALL'
  }
];

const CATEGORIES = ['ALL', 'SWIM', 'BASKETBALL', "WOMEN'S"];

// State management
let activeCategory = 'ALL';

// DOM elements
let categoryTabs;
let productsGrid;
let mobileMenuBtn;

// Load header and footer components
async function loadComponents() {
  try {
    // Load header
    const headerResponse = await fetch('components/header.html');
    const headerHTML = await headerResponse.text();
    document.getElementById('header-container').innerHTML = headerHTML;
    
    // Load footer
    const footerResponse = await fetch('components/footer.html');
    const footerHTML = await footerResponse.text();
    document.getElementById('footer-container').innerHTML = footerHTML;
    
    // Re-initialize event listeners after components are loaded
    setTimeout(() => {
      initializeElements();
      renderCategoryTabs();
      renderProducts();
      attachEventListeners();
    }, 100);
  } catch (error) {
    console.error('Error loading components:', error);
    // Fallback: render products even if components fail to load
    initializeElements();
    renderCategoryTabs();
    renderProducts();
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  loadComponents();
});

function initializeElements() {
  categoryTabs = document.querySelector('.category-tabs');
  productsGrid = document.querySelector('.products-grid');
  mobileMenuBtn = document.querySelector('.mobile-menu-btn');
}

function renderCategoryTabs() {
  if (!categoryTabs) return;
  
  categoryTabs.innerHTML = CATEGORIES.map(cat => `
    <button
      class="category-tab ${activeCategory === cat ? 'active' : ''}"
      data-category="${cat}"
    >
      ${cat}
    </button>
  `).join('');
}

function renderProducts() {
  if (!productsGrid) return;
  
  const filteredProducts = activeCategory === 'ALL' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-image"
          loading="lazy"
        />
        <div class="product-image-overlay"></div>
      </div>
      <div class="product-info">
        <div class="flex justify-between items-start mb-2">
          <h3 class="product-name">${product.name}</h3>
        </div>
        <div class="product-footer">
          <span class="product-price">$${product.price}</span>
          <button class="product-button" data-product-id="${product.id}">
            Click View
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function attachEventListeners() {
  // Category tab clicks
  if (categoryTabs) {
    categoryTabs.addEventListener('click', function(e) {
      if (e.target.classList.contains('category-tab')) {
        const category = e.target.dataset.category;
        setActiveCategory(category);
      }
    });
  }
  
  // Product button clicks
  if (productsGrid) {
    productsGrid.addEventListener('click', function(e) {
      if (e.target.classList.contains('product-button')) {
        const productId = e.target.dataset.productId;
        handleProductClick(productId);
      }
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      toggleMobileMenu();
    });
  }
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('input[type="email"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleNewsletterSubmit(e);
      }
    });
  }
  
  const newsletterButton = newsletterForm?.nextElementSibling;
  if (newsletterButton) {
    newsletterButton.addEventListener('click', handleNewsletterSubmit);
  }
}

function setActiveCategory(category) {
  activeCategory = category;
  
  // Update tab states
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === category);
  });
  
  // Re-render products
  renderProducts();
}

function handleProductClick(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    console.log('Product clicked:', product);
    // You can add modal functionality or navigation here
    alert(`Viewing: ${product.name} - $${product.price}`);
  }
}

function toggleMobileMenu() {
  // This would typically show/hide a mobile navigation menu
  console.log('Mobile menu toggle clicked');
  // Implementation would depend on your mobile menu design
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput?.value.trim();
  
  if (email && email.includes('@')) {
    console.log('Newsletter subscription:', email);
    alert(`Thank you for subscribing with email: ${email}`);
    emailInput.value = '';
  } else {
    alert('Please enter a valid email address');
  }
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add scroll effects
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const currentScrollY = window.scrollY;
  
  // Hide/show header on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const heroBackground = document.querySelector('.hero-background');
  if (!heroBackground) return;
  
  const scrolled = window.scrollY;
  const rate = scrolled * -0.5;
  heroBackground.style.transform = `translateY(${rate}px)`;
});
