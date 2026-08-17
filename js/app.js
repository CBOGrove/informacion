// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    // Google Sheets URLs (las actualizaremos cuando tengamos los IDs)
    noticiasSheet: '',
    jugadorasFemSheet: '',
    jugadoresMasSheet: '',
    jornadasSheet: '',
    
    // Google Drive base
    driveBase: '',
    
    // Twitch
    twitchChannel: 'cbogrove',
};

// ===== FUNCIONES COMUNES =====
function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i] || '');
        return obj;
    });
}

function formatearFecha(fecha) {
    if (!fecha) return '';
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('gl-ES', opciones);
}

function formatearFechaCorta(fecha) {
    if (!fecha) return '';
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('gl-ES', opciones);
}

// ===== CARGA DE DATOS =====
async function cargarCSV(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error('Error cargando CSV:', error);
        return [];
    }
}

// ===== TWITCH =====
async function checkTwitchLive() {
    try {
        const badge = document.getElementById('twitchBadge');
        if (badge) {
            badge.innerHTML = '📺 No en directo';
            badge.style.background = '#555';
        }
    } catch (error) {
        console.error('Error checking Twitch:', error);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏀 CB O Grove - Web cargada');
    checkTwitchLive();
});

// ===== EXPORTAR PARA USO EN OTRAS PÁGINAS =====
window.CONFIG = CONFIG;
window.parseCSV = parseCSV;
window.formatearFecha = formatearFecha;
window.formatearFechaCorta = formatearFechaCorta;
window.cargarCSV = cargarCSV;
window.checkTwitchLive = checkTwitchLive;
