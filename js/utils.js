// ===== UTILIDADES COMUNES =====
// Versión 2.2 - Sin rutas, solo funciones

/**
 * Parsea un CSV respetando comillas
 */
function parseCSV(csv) {
    const lines = [];
    let currentLine = '';
    let insideQuotes = false;
    
    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
            currentLine += char;
        } else if (char === '\n' && !insideQuotes) {
            if (currentLine.trim()) lines.push(currentLine);
            currentLine = '';
        } else {
            currentLine += char;
        }
    }
    if (currentLine.trim()) lines.push(currentLine);

    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const obj = {};
        headers.forEach((h, i) => {
            let value = values[i] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            value = value.replace(/""/g, '"');
            obj[h.trim().toLowerCase()] = value.trim();
        });
        return obj;
    });
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}

/**
 * Limpia texto de comillas y espacios extra
 */
function limpiarTexto(texto) {
    if (!texto) return '';
    texto = texto.replace(/^["']+|["']+$/g, '');
    texto = texto.replace(/\n/g, ' ').replace(/\r/g, ' ');
    texto = texto.replace(/\s+/g, ' ');
    return texto.trim();
}

/**
 * Formatea una fecha en gallego
 */
function formatearFecha(fecha) {
    if (!fecha) return '';
    try {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('gl-ES', opciones);
    } catch (e) {
        return fecha;
    }
}

function formatearFechaCorta(fecha) {
    if (!fecha) return '';
    try {
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('gl-ES', opciones);
    } catch (e) {
        return fecha;
    }
}

/**
 * Convierte URL de GitHub/Drive a raw
 */
function convertirURLImagen(url) {
    if (!url) return '';
    // GitHub blob → raw
    if (url.includes('github.com') && url.includes('/blob/')) {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    // Google Drive
    if (url.includes('drive.google.com')) {
        const match = url.match(/[-\w]{25,}/);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[0]}`;
        }
    }
    return url;
}

/**
 * Comprueba si un valor indica "staff"
 */
function esStaff(valor) {
    if (!valor) return false;
    const v = String(valor).toUpperCase().trim();
    return v === 'SI' || v === 'SÍ' || v === 'TRUE' || v === '1';
}

/**
 * Baraja un array (Fisher-Yates)
 */
function barallar(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Comprueba si dos arrays de objetos son iguales por ID
 */
function arraysIguais(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) return false;
    }
    return true;
}

/**
 * Carga un CSV desde una URL
 */
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

/**
 * Mapea headers de una hoja a un objeto
 */
function mapearHeaders(headers, map) {
    const result = {};
    headers.forEach((h, index) => {
        const lower = h.toLowerCase().trim();
        for (const [key, patterns] of Object.entries(map)) {
            if (patterns.some(p => lower.includes(p))) {
                result[key] = index;
                break;
            }
        }
    });
    return result;
}

// ===== EXPORTAR =====
window.parseCSV = parseCSV;
window.parseCSVLine = parseCSVLine;
window.limpiarTexto = limpiarTexto;
window.formatearFecha = formatearFecha;
window.formatearFechaCorta = formatearFechaCorta;
window.convertirURLImagen = convertirURLImagen;
window.esStaff = esStaff;
window.barallar = barallar;
window.arraysIguais = arraysIguais;
window.cargarCSV = cargarCSV;
window.mapearHeaders = mapearHeaders;
