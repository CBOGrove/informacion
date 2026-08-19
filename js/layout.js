// ===== LAYOUT: HEADER Y FOOTER COMPARTIDOS =====

console.log('🚀 Layout.js cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, inyectando header y footer...');
    inyectarHeader();
    inyectarFooter();
    marcarPaginaActiva();
    checkTwitchLive();
});

function inyectarHeader() {
    console.log('🔄 Inyectando header...');
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
                <a href="patrocinadores.html">Patrocinadores</a>
                <a href="sorteos.html">Sorteos</a>
                <a href="xogos.html">Xogos</a>
                <a href="contacto.html">Contacto</a>
            </nav>
            <span class="twitch-badge" id="twitchBadge">📺 No en directo</span>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    console.log('✅ Header inyectado');
}

function inyectarFooter() {
    console.log('🔄 Inyectando footer...');
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

    document.body.insertAdjacentHTML('beforeend', footerHTML);
    console.log('✅ Footer inyectado');
}

function marcarPaginaActiva() {
    const path = window.location.pathname;
    const pagina = path.split('/').pop() || 'index.html';
    console.log('📍 Página actual:', pagina);

    setTimeout(() => {
        document.querySelectorAll('.main-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === pagina) {
                link.classList.add('active');
                console.log('✅ Marcado como activo:', href);
            }
        });
    }, 50);
}

function checkTwitchLive() {
    const badge = document.getElementById('twitchBadge');
    if (badge) {
        badge.innerHTML = '📺 No en directo';
        badge.style.background = '#555';
        console.log('✅ Badge Twitch actualizado');
    }
}
