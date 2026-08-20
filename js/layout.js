// ===== LAYOUT: HEADER Y FOOTER COMPARTIDOS =====
// Versión 1.5 - Footer con 3 columnas (instituciones | redes | patrocinadores)

console.log('🚀 Layout.js cargado');

// ===== CONFIGURACIÓN DE URL BASE =====
const URL_BASE = '/informacion/';

// ===== CONFIGURACIÓN PARA INSTITUCIONES Y PATROCINADORES =====
const CONFIG_FOOTER = {
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1vTw0TksIAImMJy4zUnmkgum_FTpLdFe_0UDghEOPbiA/export?format=csv'
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, inyectando header y footer...');
    console.log('📍 URL Base:', URL_BASE);
    inyectarHeader();
    cargarFooterCompleto(); // Carga footer con datos del sheet
    marcarPaginaActiva();

    if (typeof window.checkTwitchLive === 'function') {
        window.checkTwitchLive();
    } else {
        checkTwitchLiveLocal();
    }
});

// ===== INYECTAR HEADER =====
function inyectarHeader() {
    console.log('🔄 Inyectando header...');
    const headerHTML = `
        <header class="main-header">
            <a href="${URL_BASE}" class="logo">
                <img src="assets/img/logos/club/logo-dorado.png" alt="CB O Grove" onerror="this.style.display='none'">
                CB O GROVE
            </a>
            <nav class="main-nav">
                <a href="${URL_BASE}">Inicio</a>
                <a href="${URL_BASE}plantillas.html">Plantillas</a>
                <a href="${URL_BASE}jornadas.html">Jornadas</a>
                <a href="${URL_BASE}noticias.html">Noticias</a>
                <a href="${URL_BASE}patrocinadores.html">Patrocinadores</a>
                <a href="${URL_BASE}sorteos.html">Sorteos</a>
                <a href="${URL_BASE}xogos.html">Xogos</a>
                <a href="${URL_BASE}contacto.html">Contacto</a>
            </nav>
            <span class="twitch-badge" id="twitchBadge">📺 No en directo</span>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    console.log('✅ Header inyectado');
}

// ===== CARGAR FOOTER COMPLETO (con datos del sheet) =====
async function cargarFooterCompleto() {
    try {
        console.log('🔄 Cargando datos para el footer...');
        const response = await fetch(CONFIG_FOOTER.sheetUrl);
        const csv = await response.text();
        const datos = parseCSVFooter(csv);
        console.log('📊 Datos footer:', datos);

        const instituciones = datos.filter(item => item.tipo && item.tipo.toUpperCase() === 'SI');
        const patrocinadores = datos.filter(item => !item.tipo || item.tipo.toUpperCase() !== 'SI');

        console.log(`🏛️ Instituciones: ${instituciones.length}, 🏢 Patrocinadores: ${patrocinadores.length}`);

        inyectarFooter(instituciones, patrocinadores);

    } catch (error) {
        console.error('Error cargando datos del footer:', error);
        // Si falla, mostrar footer sin datos
        inyectarFooter([], []);
    }
}

// ===== PARSEAR CSV PARA EL FOOTER =====
function parseCSVFooter(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const rawHeaders = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const headerMap = {};
    rawHeaders.forEach((h, index) => {
        if (h.includes('nombre')) headerMap['nombre'] = index;
        else if (h.includes('logo')) headerMap['logo'] = index;
        else if (h.includes('descripcion')) headerMap['descripcion'] = index;
        else if (h.includes('telefono') || h.includes('teléfono')) headerMap['telefono'] = index;
        else if (h.includes('maps') || h.includes('ubicacion')) headerMap['maps'] = index;
        else if (h.includes('tipo')) headerMap['tipo'] = index;
    });

    // Asignar índices por defecto
    if (headerMap['nombre'] === undefined) headerMap['nombre'] = 0;
    if (headerMap['logo'] === undefined) headerMap['logo'] = 1;
    if (headerMap['descripcion'] === undefined) headerMap['descripcion'] = 2;
    if (headerMap['telefono'] === undefined) headerMap['telefono'] = 3;
    if (headerMap['maps'] === undefined) headerMap['maps'] = 4;
    if (headerMap['tipo'] === undefined) headerMap['tipo'] = 5;

    return lines.slice(1).map(line => {
        const values = parseCSVLineFooter(line);
        const obj = {};
        Object.keys(headerMap).forEach(key => {
            let value = values[headerMap[key]] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            obj[key] = value.trim();
        });
        return obj;
    });
}

function parseCSVLineFooter(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
            continue;
        }
        if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
            continue;
        }
        current += char;
    }
    if (current.trim() || result.length > 0) {
        result.push(current.trim());
    }
    return result;
}

// ===== CONVERTIR URL DE IMAGEN =====
function convertirURLImagen(url) {
    if (!url) return '';
    if (url.includes('github.com') && url.includes('/blob/')) {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    if (url.includes('raw.githubusercontent.com')) return url;
    if (url.includes('drive.google.com')) {
        const match = url.match(/[-\w]{25,}/);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[0]}`;
        }
    }
    return url;
}

// ===== INYECTAR FOOTER CON 3 COLUMNAS =====
function inyectarFooter(instituciones, patrocinadores) {
    console.log('🔄 Inyectando footer...');
    const añoActual = new Date().getFullYear();

    // Redes sociales
    const redesHTML = `
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
    `;

    // Instituciones
    let institucionesHTML = '';
    if (instituciones.length > 0) {
        institucionesHTML = instituciones.map(inst => {
            const logoUrl = inst.logo ? convertirURLImagen(inst.logo) : '';
            return `
                <div class="footer-institucion">
                    ${logoUrl ? `<img src="${logoUrl}" alt="${inst.nombre}" loading="lazy" onerror="this.style.display='none'">` : ''}
                    <span>${inst.nombre}</span>
                </div>
            `;
        }).join('');
    } else {
        institucionesHTML = `
            <div class="footer-institucion">
                <span style="opacity:0.4; font-size:0.8rem;">Concello do Grove</span>
            </div>
            <div class="footer-institucion">
                <span style="opacity:0.4; font-size:0.8rem;">Deputación de Pontevedra</span>
            </div>
        `;
    }

    // Patrocinadores
    let patrocinadoresHTML = '';
    if (patrocinadores.length > 0) {
        patrocinadoresHTML = patrocinadores.map(p => {
            const logoUrl = p.logo ? convertirURLImagen(p.logo) : '';
            return `
                <div class="footer-patrocinador" title="${p.nombre}">
                    ${logoUrl ? `<img src="${logoUrl}" alt="${p.nombre}" loading="lazy" onerror="this.style.display='none'">` : p.nombre}
                </div>
            `;
        }).join('');
    } else {
        patrocinadoresHTML = `
            <div class="footer-patrocinador" style="opacity:0.4; font-size:0.7rem;">Amalfi</div>
            <div class="footer-patrocinador" style="opacity:0.4; font-size:0.7rem;">Hortos</div>
            <div class="footer-patrocinador" style="opacity:0.4; font-size:0.7rem;">O'Habanero</div>
        `;
    }

    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-container">
                <!-- INSTITUCIONES (izquierda) -->
                <div class="footer-instituciones">
                    <h4>Institucións colaboradoras</h4>
                    ${institucionesHTML}
                </div>

                <!-- REDES SOCIALES (centro) -->
                <div class="footer-redes">
                    ${redesHTML}
                </div>

                <!-- PATROCINADORES (derecha) -->
                <div class="footer-patrocinadores">
                    <h4>Patrocinadores</h4>
                    ${patrocinadoresHTML}
                </div>

                <!-- COPYRIGHT -->
                <div class="footer-copy">
                    © ${añoActual} Club Baloncesto O Grove
                </div>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
    console.log('✅ Footer inyectado con 3 columnas');
}

// ===== MARCAR PÁGINA ACTIVA =====
function marcarPaginaActiva() {
    const path = window.location.pathname;
    const paginaActual = path.replace(URL_BASE, '').split('/').pop() || 'index.html';
    console.log('📍 Página actual:', paginaActual);

    setTimeout(() => {
        document.querySelectorAll('.main-nav a').forEach(link => {
            const href = link.getAttribute('href');
            const hrefPagina = href.replace(URL_BASE, '').split('/').pop() || 'index.html';
            
            if (hrefPagina === paginaActual) {
                link.classList.add('active');
                console.log('✅ Marcado como activo:', href);
            }
        });
    }, 50);
}

// ===== TWITCH FALLBACK =====
function checkTwitchLiveLocal() {
    const badge = document.getElementById('twitchBadge');
    if (badge) {
        badge.innerHTML = '📺 No en directo';
        badge.style.background = '#555';
        console.log('✅ Badge Twitch actualizado (fallback)');
    }
}
