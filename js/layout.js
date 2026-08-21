// ===== LAYOUT: HEADER Y FOOTER COMPARTIDOS =====
// Versión 2.0 - Rutas absolutas y sin URL_BASE

console.log('🚀 Layout.js v2.0 cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, inyectando header y footer...');
    inyectarHeader();
    inyectarFooter();
    marcarPaginaActiva();

    if (typeof window.checkTwitchLive === 'function') {
        window.checkTwitchLive();
    } else {
        checkTwitchLiveLocal();
    }
});

function inyectarHeader() {
    const headerHTML = `
        <header class="main-header">
            <a href="/" class="logo">
                <img src="/assets/img/logos/club/logo-dorado.png" alt="CB O Grove" onerror="this.style.display='none'">
                CB O GROVE
            </a>
            <nav class="main-nav">
                <a href="/">Inicio</a>
                <a href="/plantillas.html">Plantillas</a>
                <a href="/jornadas.html">Jornadas</a>
                <a href="/noticias.html">Noticias</a>
                <a href="/patrocinadores.html">Patrocinadores</a>
                <a href="/sorteos.html">Sorteos</a>
                <a href="/xogos.html">Xogos</a>
                <a href="/contacto.html">Contacto</a>
            </nav>
            <span class="twitch-badge" id="twitchBadge">📺 No en directo</span>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function inyectarFooter() {
    const añoActual = new Date().getFullYear();
    const footerHTML = `
        <footer class="main-footer">
            <div class="redes">
                <a href="https://www.tiktok.com/@cbogrove" target="_blank" aria-label="TikTok">
                    <i class="fab fa-tiktok"></i>
                </a>
                <a href="https://www.youtube.com/@cbogrove" target="_blank" aria-label="YouTube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.instagram.com/cbogrove" target="_blank" aria-label="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.twitch.tv/cbogrove" target="_blank" aria-label="Twitch">
                    <i class="fab fa-twitch"></i>
                </a>
                <a href="https://x.com/cbogrove" target="_blank" aria-label="Twitter/X">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
            <div class="copy">© ${añoActual} Club Baloncesto O Grove</div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function marcarPaginaActiva() {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        // Comparar rutas ignorando index.html
        if (linkPath === currentPath ||
            (currentPath === '/' && linkPath === '/index.html') ||
            (currentPath === '/index.html' && linkPath === '/')) {
            link.classList.add('active');
        }
    });
}

function checkTwitchLiveLocal() {
    const badge = document.getElementById('twitchBadge');
    if (badge) {
        badge.innerHTML = '📺 No en directo';
        badge.style.background = '#555';
    }
}
