document.addEventListener('DOMContentLoaded', function() {
    // === FILTROS ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

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
        });
    });

    // === PRECIOS DINÁMICOS ===
    // === PRECIO TOTAL DINÁMICO (NUEVO) ===
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

    // Actualizar precio al cambiar cualquier selector
    document.querySelectorAll('.option-select').forEach(select => {
        select.addEventListener('change', function() {
            const productInfo = this.closest('.product-info');
            updatePrice(productInfo);
        });
    });

    // === WHATSAPP CON TODAS LAS OPCIONES ===
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.getAttribute('data-product');
            const productInfo = this.closest('.product-info');
            const totalPrice = productInfo.querySelector('.dynamic-price').dataset.total;
            
            // Recolectar TODAS las opciones
            const options = [];
            productInfo.querySelectorAll('.options-group').forEach((group, index) => {
                const label = group.querySelector('label').textContent.trim();
                const select = group.querySelector('.option-select');
                const optionText = select.options[select.selectedIndex].text;
                options.push(`${label}: ${optionText}`);
            });
            
            const message = `Hola! 😊\n\n🛒 *PEDIDO:*\n${productName}\n\n${options.join('\n')}\n\n💰 *Total: $${totalPrice}*\n\n📍 San Juan de los Lagos`;
            
            const phone = '3951234567'; // ← CAMBIA TU NÚMERO
            const whatsappURL = `https://wa.me/52${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappURL, '_blank');
        });
    });

    // Inicializar precios
    document.querySelectorAll('.product-info').forEach(productInfo => {
        updatePrice(productInfo);
    });
});