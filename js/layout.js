// ===== LAYOUT: HEADER Y FOOTER COMPARTIDOS =====
// Este archivo se carga en todas las páginas para inyectar el header y footer

document.addEventListener('DOMContentLoaded', function() {
    inyectarHeader();
    inyectarFooter();
    marcarPaginaActiva();
    checkTwitchLive();
});

function inyectarHeader() {
    const headerHTML = `
        <header class="main-header">
            <a href="/" class="logo">
                <img src="assets/img/logos/club/logo-dorado.png" alt="CB O Grove" onerror="this.style.display='none'">
                CB O GROVE
            </a>
            <nav class="main-nav">
                <a href="/">Inicio</a>
                <a href="plantillas.html">Plantillas</a>
                <a href="jornadas.html">Jornadas</a>
                <a href="noticias.html">Noticias</a>
                <a href="sorteos.html">Sorteos</a>
                <a href="patrocinadores.html">Patrocinadores</a>
                <a href="contacto.html">Contacto</a>
            </nav>
            <span class="twitch-badge" id="twitchBadge">📺 No en directo</span>
        </header>
    `;

    // Insertar al principio del body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function inyectarFooter() {
    const footerHTML = `
        <footer class="main-footer">
            <div class="redes">
                <a href="https://www.tiktok.com/@cbogrove" target="_blank"><i class="fab fa-tiktok"></i></a>
                <a href="https://www.youtube.com/@cbogrove" target="_blank"><i class="fab fa-youtube"></i></a>
                <a href="https://www.instagram.com/cbogrove" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://www.twitch.tv/cbogrove" target="_blank"><i class="fab fa-twitch"></i></a>
                <a href="https://x.com/cbogrove" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
            <div class="copy">© 2026 Club Baloncesto O Grove</div>
        </footer>
    `;

    // Insertar al final del body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function marcarPaginaActiva() {
    // Obtener el nombre del archivo actual
    const path = window.location.pathname;
    const pagina = path.split('/').pop() || 'index.html';

    // Esperar a que el nav esté en el DOM
    setTimeout(() => {
        document.querySelectorAll('.main-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === pagina) {
                link.classList.add('active');
            }
        });
    }, 50);
}

function checkTwitchLive() {
    // Simulación del badge de Twitch (se puede ampliar con API)
    const badge = document.getElementById('twitchBadge');
    if (badge) {
        badge.innerHTML = '📺 No en directo';
        badge.style.background = '#555';
    }
}
