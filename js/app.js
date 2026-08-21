// ===== APP - Punto de entrada principal =====
// Versión 2.2

console.log('🏀 CB O Grove - App v2.2 cargada');

// Cargar configuración
if (typeof CONFIG === 'undefined') {
    console.warn('⚠️ CONFIG no definido, asegúrate de cargar config.js');
}

// Inicializar funciones comunes
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM listo');
    
    // Inicializar Twitch si está disponible
    if (typeof window.checkTwitchLive === 'function') {
        window.checkTwitchLive();
    }
});
