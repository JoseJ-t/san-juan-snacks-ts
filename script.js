// ============================================
// SCRIPT COMPLETO - SAN JUAN SNACKS (CON MODAL)
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // 1. VARIABLES GLOBALES
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentProduct = null;

    // ==================== DATOS DE LOS PRODUCTOS ====================
    const productsData = [
        {
            id: "tostiaguachiles",
            name: "Tostiaguachiles",
            category: "picantes",
            image: "https://images.unsplash.com/photo-1621996346565-e3adc652b378?w=400&h=300&fit=crop",
            badge: { icon: "fa-fire", text: "Picante", color: "#25D366" },
            description: "Aguachile de camarón con totopos",
            basePrice: 80,
            options: [
                { label: "Sabor Aguachile", icon: "fa-pepper-hot", key: "sabor",
                  choices: [
                    { text: "Verde", price: 80 },
                    { text: "Negro", price: 80 },
                    { text: "Habanero", price: 80 }
                  ]
                },
                { label: "Totopos", icon: "fa-cookie-bite", key: "totopos",
                  choices: [
                    { text: "Doritos", price: 5 },
                    { text: "Tostitos Verdes", price: 1 },
                    { text: "Tostitos Morados", price: 0, default: true }
                  ]
                }
            ]
        },

        {
            id: "leche-santa-clara",
            name: "Leche Santa Clara 1L",
            category: "leches",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
            badge: { icon: "fa-mug-hot", text: "Leche", color: "#A6192E" },
            description: "Botella fría • Leche purísima Jalisco",
            basePrice: 35,
            options: [
                { label: "Sabor", icon: "fa-ice-cream", key: "sabor",
                  choices: [
                    { text: "Chocolate", price: 0, default: true },
                    { text: "Fresa", price: 2 },
                    { text: "Vainilla", price: 0, default: true },
                    { text: "Capuccino", price: 0, default: true }
                  ]
                },
                { label: "Jarabe", icon: "fa-droplet", key: "jarabe",
                  choices: [
                    { text: "Sin jarabe", price: 0, default: true },
                    { text: "Fresa", price: 8 },
                    { text: "Chocolate", price: 8 },
                    { text: "Cajeta", price: 10 }
                  ]
                },
                { label: "Topping", icon: "fa-seedling", key: "topping",
                  choices: [
                    { text: "Sin topping", price: 0, default: true },
                    { text: "Fresa picada", price: 8 },
                    { text: "Galletas", price: 6 },
                    { text: "Chocolate rallado", price: 7 }
                  ]
                },
                { label: "Palito de chocolate", icon: "fa-cookie", key: "palito",
                  choices: [
                    { text: "Sin palito", price: 0, default: true },
                    { text: "Chocolate blanco", price: 5 },
                    { text: "Chocolate negro", price: 5 },
                    { text: "Fresa", price: 6 }
                  ]
                }
            ]
        },

        {
            id: "chicharrones",
            name: "Chicharrones en Salsa",
            category: "picantes",
            image: "https://images.unsplash.com/photo-1603048297194-9bef403afef3?w=400&h=300&fit=crop",
            badge: { icon: "fa-fire", text: "Picante", color: "#25D366" },
            description: "Chicharrones crujientes con salsa casera",
            basePrice: 25,
            options: [
                { label: "Salsa", icon: "fa-pepper-hot", key: "salsa",
                  choices: [
                    { text: "Árbol", price: 25 },
                    { text: "Chipotle", price: 27 },
                    { text: "Habanero", price: 30 }
                  ]
                }
            ]
        },

        {
            id: "jicama",
            name: "Jícama Rallada",
            category: "frescos",
            image: "https://images.unsplash.com/photo-1601001735390-6e6a59a9e825?w=400&h=300&fit=crop",
            badge: { icon: "fa-lemon", text: "Fresco", color: "#25D366" },
            description: "Jícama fresca con limón y sal",
            basePrice: 20,
            options: [
                { label: "Topping", icon: "fa-seedling", key: "topping",
                  choices: [
                    { text: "Tajín", price: 20 },
                    { text: "Chamoy", price: 22 },
                    { text: "Michi completo", price: 25 }
                  ]
                }
            ]
        },

        {
            id: "churros",
            name: "Churros Rellenos (6 pzs)",
            category: "dulces",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
            badge: { icon: "fa-cookie", text: "Dulce", color: "#A6192E" },
            description: "Crujientes con azúcar y canela",
            basePrice: 28,
            options: [
                { label: "Relleno", icon: "fa-fill-drip", key: "relleno",
                  choices: [
                    { text: "Cajeta", price: 28 },
                    { text: "Chocolate", price: 30 },
                    { text: "Dulce de leche", price: 32 }
                  ]
                }
            ]
        },

        {
            id: "torta-ahogada",
            name: "Torta Ahogada Mini",
            category: "tacos",
            image: "https://images.unsplash.com/photo-1596799320515-e2caddf41099?w=400&h=300&fit=crop",
            badge: { icon: "fa-taco", text: "Tacos", color: "#25D366" },
            description: "Clásica tapatía con salsa ahogada",
            basePrice: 45,
            options: [
                { label: "Proteína", icon: "fa-drumstick-bite", key: "proteina",
                  choices: [
                    { text: "Carnitas", price: 45 },
                    { text: "Pollo", price: 42 },
                    { text: "Queso", price: 40 }
                  ]
                }
            ]
        },

        {
            id: "quesabirria",
            name: "Quesabirria",
            category: "tacos",
            image: "https://images.unsplash.com/photo-1603277053376-48d2b4268224?w=400&h=300&fit=crop",
            badge: { icon: "fa-taco", text: "Tacos", color: "#25D366" },
            description: "Con consomé • Queso derretido",
            basePrice: 40,
            options: [
                { label: "Cantidad", icon: "fa-hashtag", key: "cantidad",
                  choices: [
                    { text: "3 tacos", price: 40 },
                    { text: "5 tacos", price: 65 },
                    { text: "8 tacos", price: 100 }
                  ]
                }
            ]
        }
    ];

    // ==================== GENERAR PRODUCTOS ====================
    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        productsData.forEach(product => {
            const cardHTML = `
                <div class="product-card ${product.category}" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="category-badge" style="background:${product.badge.color}">
                            <i class="fas ${product.badge.icon}"></i> ${product.badge.text}
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="ingredients">${product.description}</p>
                        
                        <div class="product-footer" style="margin-top: auto; padding-top: 20px;">
                            <div class="price dynamic-price" data-base="${product.basePrice}">$${product.basePrice}</div>
                            <button class="whatsapp-btn customize-btn" data-product-id="${product.id}">
                                <i class="fas fa-cog"></i> Personalizar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // ==================== FILTROS ====================
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const productCards = document.querySelectorAll('.product-card');

                productCards.forEach((card, index) => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => card.style.opacity = '1', index * 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // ==================== MENÚ MÓVIL ====================
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const filtersMenu = document.getElementById('filtersMenu');

        if (menuToggle && filtersMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                filtersMenu.classList.toggle('open');
                const icon = menuToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            document.addEventListener('click', (e) => {
                if (!filtersMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    filtersMenu.classList.remove('open');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        }
    }

    // ==================== MODAL FUNCTIONS ====================
    function openOptionsModal(productId) {
        currentProduct = productsData.find(p => p.id === productId);
        if (!currentProduct) return;

        document.getElementById('modalProductName').textContent = currentProduct.name;

        let optionsHTML = '';
        currentProduct.options.forEach(opt => {
            let choicesHTML = opt.choices.map(choice => {
                let priceText = choice.price === 0 ? 
                    (choice.default ? ' (Incluido)' : '') : ` (+$${choice.price})`;
                return `<option value="${choice.text}|${choice.price}" ${choice.default ? 'selected' : ''}>
                            ${choice.text}${priceText}
                        </option>`;
            }).join('');

            optionsHTML += `
                <div class="options-group">
                    <label><i class="fas ${opt.icon}"></i> ${opt.label}:</label>
                    <select class="option-select" data-key="${opt.key}">
                        ${choicesHTML}
                    </select>
                </div>`;
        });

        document.getElementById('modalOptions').innerHTML = optionsHTML;
        updateModalPrice();
        document.getElementById('optionsModal').style.display = 'flex';
    }

    function updateModalPrice() {
        let total = currentProduct ? currentProduct.basePrice : 0;
        document.querySelectorAll('#modalOptions .option-select').forEach(select => {
            const [, priceStr] = select.value.split('|');
            total += parseInt(priceStr) || 0;
        });
        document.getElementById('modalTotalPrice').textContent = `$${total}`;
    }

    function addFromModal() {
        if (!currentProduct) return;

        const price = parseInt(document.getElementById('modalTotalPrice').textContent.replace('$', '')) || currentProduct.basePrice;
        const options = [];

        document.querySelectorAll('#modalOptions .options-group').forEach(group => {
            const label = group.querySelector('label').textContent.trim();
            const select = group.querySelector('select');
            const selectedText = select.options[select.selectedIndex].textContent.trim();
            options.push(`${label}: ${selectedText}`);
        });

        cart.push({
            name: currentProduct.name,
            price: price,
            quantity: 1,
            options: options,
            image: currentProduct.image
        });

        renderCart();
        document.getElementById('optionsModal').style.display = 'none';
        
        showMessage('¡Producto agregado!', `${currentProduct.name} se añadió correctamente`, '🛒');
    }

    // ==================== MENSAJES BONITOS ====================
    function showMessage(title, text, icon = '✅', color = '#25D366') {
        document.getElementById('messageTitle').textContent = title;
        document.getElementById('messageText').textContent = text;
        document.getElementById('messageIcon').innerHTML = `<span style="color:${color}">${icon}</span>`;
        document.getElementById('messageModal').style.display = 'flex';
    }

    document.getElementById('messageBtn').addEventListener('click', () => {
        document.getElementById('messageModal').style.display = 'none';
    });

    document.getElementById('messageModal').addEventListener('click', (e) => {
        if (e.target.id === 'messageModal') {
            document.getElementById('messageModal').style.display = 'none';
        }
    });

    function setupModalEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('customize-btn')) {
                const productId = e.target.getAttribute('data-product-id');
                openOptionsModal(productId);
            }
        });

        document.getElementById('modalClose').addEventListener('click', () => {
            document.getElementById('optionsModal').style.display = 'none';
        });

        document.getElementById('optionsModal').addEventListener('click', (e) => {
            if (e.target.id === 'optionsModal') {
                document.getElementById('optionsModal').style.display = 'none';
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('option-select') && 
                document.getElementById('optionsModal').style.display === 'flex') {
                updateModalPrice();
            }
        });

        document.getElementById('addToCartFromModal').addEventListener('click', addFromModal);
    }

    // ==================== CARRITO ====================
    function renderCart() {
        const cartItemsEl = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const cartCountEl = document.getElementById('cartCount');
        
        cartItemsEl.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const optionsText = (item.options && item.options.length > 0) ? item.options.join(', ') : 'Sin opciones';

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${optionsText}</p>
                    <small>$${item.price} c/u</small>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-controls">
                        <button class="qty-btn" data-index="${index}">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsEl.appendChild(itemEl);
            total += item.price * item.quantity;
        });
        
        cartTotalEl.textContent = total;
        cartCountEl.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // ==================== CONTROLES DEL CARRITO ====================
    function setupCartControls() {
        document.getElementById('cartToggle').addEventListener('click', () => {
            document.getElementById('cartPanel').classList.toggle('open');
        });

        document.querySelector('.close-cart').addEventListener('click', () => {
            document.getElementById('cartPanel').classList.remove('open');
        });

        document.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (!index) return;

            if (e.target.classList.contains('qty-btn')) {
                const input = document.querySelector(`[data-index="${index}"].qty-input`);
                if (!input) return;
                let qty = parseInt(input.value) || 1;
                if (e.target.classList.contains('plus')) qty++;
                else if (qty > 1) qty--;
                input.value = qty;
                if (cart[index]) cart[index].quantity = qty;
                renderCart();
            }

            if (e.target.classList.contains('remove-item')) {
                cart.splice(index, 1);
                renderCart();
            }
        });

        // Enviar por WhatsApp + LIMPIAR CARRITO
        document.getElementById('whatsappCart').addEventListener('click', () => {
            if (cart.length === 0) {
                showMessage('Carrito vacío', 'Agrega productos antes de pedir', '🛒', '#ff9800');
                return;
            }

            const address = document.getElementById('customerAddress').value.trim();
            if (!address) {
                showMessage('Falta dirección', 'Por favor escribe tu dirección exacta', '📍', '#ff9800');
                document.getElementById('customerAddress').focus();
                return;
            }

            let message = 'Hola! 😊\n\n🛒 *MI PEDIDO:*\n\n';
            cart.forEach(item => {
                message += `• ${item.name} x${item.quantity}\n`;
                item.options.forEach(opt => message += `  ${opt}\n`);
                message += `  Subtotal: $${item.price * item.quantity}\n\n`;
            });

            message += `💰 *TOTAL: $${document.getElementById('cartTotal').textContent}*\n\n`;
            message += `📍 *DIRECCIÓN:* ${address.toUpperCase()}\n`;
            message += `🚚 Entrega gratis • 20 min`;

            const phone = '3951024699';
            window.open(`https://wa.me/52${phone}?text=${encodeURIComponent(message)}`, '_blank');

            // Limpiar carrito después de enviar
            setTimeout(() => {
                cart = [];
                renderCart();
                document.getElementById('cartPanel').classList.remove('open');
                document.getElementById('customerAddress').value = '';
                showMessage('¡Pedido enviado!', 'Gracias por tu compra ❤️\nEn breve nos contactamos', '✅');
            }, 1000);
        });
    }

    // ==================== INICIALIZACIÓN ====================
    function init() {
        renderProducts();
        setupFilters();
        setupMobileMenu();
        setupModalEvents();
        setupCartControls();

        renderCart();
    }

    // Iniciar todo
    init();
});