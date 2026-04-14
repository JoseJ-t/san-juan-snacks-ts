// Filtro de categorías
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al clickeado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.products-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Prevenir zoom en botones WhatsApp (móviles)
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
});