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
        if (!badge) return;
        
        // Simulación de estado offline
        // Cuando implementes la API de Twitch, reemplaza esto
        badge.innerHTML = '📺 No en directo';
        badge.style.background = '#555';
        badge.style.color = '#fff';
        badge.style.padding = '4px 12px';
        badge.style.borderRadius = '20px';
        badge.style.fontSize = '14px';
        badge.style.fontWeight = 'bold';
        
        // Ejemplo de cómo sería con la API (comentado)
        /*
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${CONFIG.twitchChannel}`, {
            headers: {
                'Client-ID': 'TU_CLIENT_ID',
                'Authorization': 'Bearer TU_TOKEN'
            }
        });
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            badge.innerHTML = '🔴 EN DIRECTO';
            badge.style.background = '#9146FF';
            badge.style.color = '#fff';
        }
        */
    } catch (error) {
        console.error('Error checking Twitch:', error);
        const badge = document.getElementById('twitchBadge');
        if (badge) {
            badge.innerHTML = '📺 Error';
            badge.style.background = '#dc3545';
        }
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏀 CB O Grove - Web cargada');
    // Ya no llamamos a checkTwitchLive aquí porque layout.js lo hará
});

// ===== EXPORTAR PARA USO EN OTRAS PÁGINAS =====
window.CONFIG = CONFIG;
window.parseCSV = parseCSV;
window.formatearFecha = formatearFecha;
window.formatearFechaCorta = formatearFechaCorta;
window.cargarCSV = cargarCSV;
window.checkTwitchLive = checkTwitchLive;
