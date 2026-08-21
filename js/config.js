// ===== CONFIGURACIÓN GLOBAL =====
// Versión 2.3 - Añadida configuración de Xornadas

const CONFIG = {
    // Google Sheets
    sheets: {
        noticias: 'https://docs.google.com/spreadsheets/d/1WyAXYg7YZXG3jhr2y1LjgoRMbq7nWtHReJmBTk-FkcQ/export?format=csv',
        plantillas: 'https://docs.google.com/spreadsheets/d/1HyII2lYStJ8AdgL1vjWPc7N9S_4r4eCHKH-4WMLHD24/export?format=csv',
        patrocinadores: 'https://docs.google.com/spreadsheets/d/1vTw0TksIAImMJy4zUnmkgum_FTpLdFe_0UDghEOPbiA/export?format=csv',
        sorteos: 'https://docs.google.com/spreadsheets/d/1we-1DRNJjbrut1lzJZFwBwxSWCcGrRZ1D4Afb4QYIyY/export?format=csv',
        // NUEVO: Xornadas
        xornadas: 'https://docs.google.com/spreadsheets/d/1RBZgpB7SU-zYtfs_yFlxeFbA76sfwj4v0ceQpmto3Fk/export?format=csv',
    },
    
    // Google Sheets - gid para cada equipo en Xornadas
    xornadasGid: {
        femenino: '0',
        masculino: '1780874499'
    },
    
    // Google Drive - imágenes (rutas relativas)
    drive: {
        femenino: 'assets/img/plantillas/femenino/',
        masculino: 'assets/img/plantillas/masculino/',
        logos: 'assets/img/logos/club/',
        patrocinadores: 'assets/img/logos/patrocinadores/',
        rivales: 'assets/img/logos/rivales/',
    },
    
    // Twitch
    twitchChannel: 'cbogrove',
    
    // Juego
    movimientosMaximos: 24,
    numJugadores: 5,
};

window.CONFIG = CONFIG;
