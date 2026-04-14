// ============================================
// SCRIPT COMPLETO - ORDENADO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. VARIABLES GLOBALES
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. FILTROS DE CATEGORÍAS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activar botón seleccionado
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar productos
            const filterValue = btn.getAttribute('data-filter');
            productCards.forEach((card, index) => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });

            // 🔥 AUTO-CERRAR MENÚ MÓVIL
            const filtersMenu = document.getElementById('filtersMenu');
            const menuToggle = document.getElementById('menuToggle');

            if (filtersMenu && filtersMenu.classList.contains('open')) {
                filtersMenu.classList.remove('open');

                // Restaurar icono hamburguesa
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // MENU HAMBURGUESA MÓVIL
    const menuToggle = document.getElementById('menuToggle');
    const filtersMenu = document.getElementById('filtersMenu');

    if (menuToggle && filtersMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            filtersMenu.classList.toggle('open');

            // Cambiar icono
            const icon = menuToggle.querySelector('i');
            if (filtersMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar al click fuera
        document.addEventListener('click', (e) => {
            if (!filtersMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                filtersMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 3. PRECIO DINÁMICO (múltiples selectores)
    function updatePrice(productInfo) {
        let basePrice = 0;
        let extraPrice = 0;
        
        const selects = productInfo.querySelectorAll('.option-select');
        selects.forEach(select => {
            const optionText = select.options[select.selectedIndex].value;
            const match = optionText.match(/\$(\d+)/);
            if (match) {
                const price = parseInt(match[1]);
                if (optionText.includes('+')) {
                    extraPrice += price;
                } else {
                    basePrice = price;
                }
            }
        });
        
        const totalPrice = basePrice + extraPrice;
        const priceEl = productInfo.querySelector('.dynamic-price');
        priceEl.textContent = `$${totalPrice}`;
        priceEl.dataset.total = totalPrice;
    }
    
    document.querySelectorAll('.option-select').forEach(select => {
        select.addEventListener('change', function() {
            const productInfo = this.closest('.product-info');
            updatePrice(productInfo);
        });
    });
    
    // 4. FUNCIONES DEL CARRITO
    function renderCart() {
        const cartItemsEl = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const cartCountEl = document.getElementById('cartCount');
        
        cartItemsEl.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.options.join(', ')}</p>
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
        cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // 5. ABRIR/CERRAR CARRITO
    document.getElementById('cartToggle')?.addEventListener('click', () => {
        document.getElementById('cartPanel').classList.toggle('open');
    });
    
    document.querySelector('.close-cart')?.addEventListener('click', () => {
        document.getElementById('cartPanel').classList.remove('open');
    });
    
    // 6. AGREGAR AL CARRITO
    document.querySelectorAll('.whatsapp-btn, .add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productInfo = this.closest('.product-info');
            const productName = this.getAttribute('data-product');
            const price = parseInt(productInfo.querySelector('.dynamic-price').dataset.total);
            const image = productInfo.previousElementSibling.querySelector('img').src;
            const quantityInput = productInfo.querySelector('.qty-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            const options = [];
            productInfo.querySelectorAll('.options-group label').forEach(label => {
                const select = label.nextElementSibling;
                options.push(label.textContent.trim() + ': ' + select.options[select.selectedIndex].text);
            });
            
            // Buscar si ya existe
            const existingIndex = cart.findIndex(item => 
                item.name === productName && JSON.stringify(item.options) === JSON.stringify(options)
            );
            
            if (existingIndex > -1) {
                cart[existingIndex].quantity += quantity;
            } else {
                cart.push({
                    name: productName,
                    price: price,
                    quantity: quantity,
                    options: options,
                    image: image
                });
            }
            
            renderCart();
            alert(`¡${quantity}x ${productName} agregado! 🛒`);
        });
    });
    
    // 7. CONTROLES DEL CARRITO
    document.addEventListener('click', function(e) {
        const index = e.target.dataset.index;
        
        // Botones +/-
        if (e.target.classList.contains('qty-btn')) {
            const input = document.querySelector(`[data-index="${index}"].qty-input`);
            let qty = parseInt(input.value);
            
            if (e.target.classList.contains('plus')) {
                qty++;
            } else if (qty > 1) {
                qty--;
            }
            
            input.value = qty;
            cart[index].quantity = qty;
            renderCart();
        }
        
        // Eliminar item
        if (e.target.classList.contains('remove-item')) {
            cart.splice(index, 1);
            renderCart();
        }
    });
    
    // 8. WHATSAPP CARRITO FINAL - CON DIRECCIÓN
    document.getElementById('whatsappCart')?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('¡Tu carrito está vacío! 🛒');
            return;
        }
        
        // ✅ VERIFICAR DIRECCIÓN
        const address = document.getElementById('customerAddress').value.trim();
        if (!address) {
            alert('😊 Por favor escribe tu dirección exacta (calle, número, colonia)');
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
    });
    
    // 9. INICIALIZAR TODO
    document.querySelectorAll('.product-info').forEach(productInfo => {
        updatePrice(productInfo);
    });
    renderCart();
});