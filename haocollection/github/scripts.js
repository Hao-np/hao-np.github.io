document.addEventListener('DOMContentLoaded', () => {
    fetch('../github/links.json')
        .then(response => response.json())
        .then(data => {
            const linkCardsContainer = document.getElementById('link-cards');
            data.forEach(link => {
                const card = document.createElement('div');
                card.classList.add('link-card');
                // 添加所有分类到 card 的 classList
                if (Array.isArray(link.category)) {
                    link.category.forEach(cat => card.classList.add(cat));
                } else {
                    card.classList.add(link.category);
                }
                card.innerHTML = `
                    <a href="${link.url}" target="_blank" class="card-link">
                        <!-- <img src="${link.favicon}" alt="${link.name}"> -->
                        <h2 style="color:#444; margin: 5px auto;">${link.name}</h2>
                        <p style="color:#777; margin: 5px;">${link.introduce}</p>
                    </a>
                `;
                card.addEventListener('click', () => {
                    window.location.href = link.url;
                });
                linkCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading the links:', error));
});

function filterLinks(category) {
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        if (category === 'all' || Array.from(card.classList).some(cls => cls === category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function performSearch() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        const name = card.querySelector('h2').textContent.toLowerCase(); // 修改为 h2
        if (name.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
