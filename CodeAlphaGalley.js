const imageData = [
    { id: 1, category: 'nature', title: 'Mountainscape', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800' },
    { id: 2, category: 'abstract', title: 'Neural Pathways', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800' },
    { id: 3, category: 'urban', title: 'Neon City', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800' },
    { id: 4, category: 'nature', title: 'Serene Sea', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800' },
    { id: 5, category: 'abstract', title: 'Ethereal Flow', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800' },
    { id: 6, category: 'urban', title: 'Forest Light', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800' },
];

let currentFilter = 'all';
const grid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery(filter = 'all') {
    grid.innerHTML = '';
    
    const filtered = imageData.filter(img => filter === 'all' || img.category === filter);

    filtered.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = `gallery-item animate__animated animate__fadeInUp`;
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <img src="${img.url}" alt="${img.title}" class="w-full h-64 object-cover">
            <div class="overlay">
                <span class="text-cyan-400 text-sm font-mono">0${img.id}</span>
                <h3 class="text-xl font-bold">${img.title}</h3>
                <p class="text-gray-300 text-xs">Category: ${img.category}</p>
            </div>
        `;
        grid.appendChild(item);
    });
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Render
        renderGallery(btn.dataset.filter);
    });
});

// Initial Load
renderGallery();