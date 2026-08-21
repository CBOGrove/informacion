// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    // Google Sheets
    sheets: {
        noticias: 'https://docs.google.com/spreadsheets/d/1WyAXYg7YZXG3jhr2y1LjgoRMbq7nWtHReJmBTk-FkcQ/export?format=csv',
        plantillas: 'https://docs.google.com/spreadsheets/d/1HyII2lYStJ8AdgL1vjWPc7N9S_4r4eCHKH-4WMLHD24/export?format=csv',
        patrocinadores: 'https://docs.google.com/spreadsheets/d/1vTw0TksIAImMJy4zUnmkgum_FTpLdFe_0UDghEOPbiA/export?format=csv',
        sorteos: 'https://docs.google.com/spreadsheets/d/1we-1DRNJjbrut1lzJZFwBwxSWCcGrRZ1D4Afb4QYIyY/export?format=csv',
        // Jornadas: pendiente
    },
    
    // Google Drive - imágenes
    drive: {
        femenino: '/assets/img/plantillas/femenino/',
        masculino: '/assets/img/plantillas/masculino/',
        logos: '/assets/img/logos/club/',
        patrocinadores: '/assets/img/logos/patrocinadores/',
    },
    
    // Twitch
    twitchChannel: 'cbogrove',
    
    // Juego
    movimientosMaximos: 24,
    numJugadores: 5,
};

// ===== EXPORTAR =====
window.CONFIG = CONFIG;
