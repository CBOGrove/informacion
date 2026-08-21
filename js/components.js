// ===== COMPONENTES REUTILIZABLES =====

/**
 * Crea una tarjeta de jugador (para plantillas y juegos)
 */
function crearTarjetaJugador(jugador, opciones = {}) {
    const {
        equipo = 'femenino',
        mostrarInfo = false,
        clickable = true,
        invertido = false,
    } = opciones;

    const container = document.createElement('div');
    container.className = 'flip-container';
    if (clickable) {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('flipped');
        });
    }

    const inner = document.createElement('div');
    inner.className = 'flip-inner';

    const numDisplay = String(jugador.numero || '?').replace(/[ED]/g, '');
    const fotoUrl = jugador.foto || `${CONFIG.drive[equipo]}${jugador.numero}.png`;

    // ===== FRENTE =====
    const front = document.createElement('div');
    front.className = 'flip-front';
    front.innerHTML = `
        <div class="player-card${invertido ? ' invertido' : ''}">
            <div class="card-background"></div>
            <div class="player-number">${numDisplay}</div>
            <div class="photo-container">
                <img src="${fotoUrl}" alt="${jugador.nombre}" loading="lazy"
                     onerror="this.parentElement.innerHTML='<div class=\\'photo-error\\'>${numDisplay}</div>'">
            </div>
            <div class="name-container">
                <div class="player-name">${jugador.nombre || 'Sin nombre'}</div>
            </div>
        </div>
    `;
    inner.appendChild(front);

    // ===== DETRÁS =====
    const back = document.createElement('div');
    back.className = 'flip-back';
    
    const bgColor = invertido ? '#000000' : '#FFD700';
    const textColor = invertido ? '#FFD700' : '#000000';
    const nameBg = invertido ? '#FFD700' : '#000000';
    const nameColor = invertido ? '#000000' : '#FFD700';

    back.style.background = bgColor;
    back.style.border = `3px solid ${invertido ? '#FFD700' : '#000000'}`;

    const infoLines = jugador.info_extra ? jugador.info_extra.split('|').map(l => l.trim()) : ['Sin información'];

    back.innerHTML = `
        <div class="back-content">
            <div class="back-card-background"></div>
            <div class="back-number ${invertido ? 'invertido-back' : ''}">${numDisplay}</div>
            <div class="back-photo-container ${invertido ? 'invertido-back' : ''}"></div>
            <div class="back-text-area">
                ${infoLines.map((line, i) => `
                    <p style="color:${textColor}" class="${i === 0 && infoLines.length > 1 ? 'back-line-first' : ''}">
                        ${line || '\u00A0'}
                    </p>
                `).join('')}
            </div>
            <div class="back-name-container" style="background:${nameBg};border:1.5px solid ${nameBg};">
                <div class="back-name" style="color:${nameColor}">${jugador.nombre || 'Sin nombre'}</div>
            </div>
        </div>
    `;
    inner.appendChild(back);

    container.appendChild(inner);
    return container;
}

/**
 * Crea una tarjeta de noticia
 */
function crearTarjetaNoticia(noticia, destacada = false) {
    const container = document.createElement('div');
    container.className = destacada ? 'noticia-destacada' : 'noticia-card';

    const tieneImagen = noticia.enlace_imagen && noticia.enlace_imagen.length > 0;
    const tieneTextoLargo = noticia.texto_largo && noticia.texto_largo.length > 0;
    const imagenUrl = tieneImagen ? convertirURLImagen(noticia.enlace_imagen) : '';

    let html = `
        <div class="fecha">📅 ${formatearFecha(noticia.fecha)}</div>
        <div class="cabecera">${noticia.cabecera || 'Sen título'}</div>
        <div class="texto-corto">${noticia.texto_corto || ''}</div>
    `;

    if (tieneImagen || tieneTextoLargo) {
        html += `
            <button class="toggle-btn" onclick="window.toggleNoticia(this)">
                <span class="btn-text">▶ Ler máis</span>
            </button>
        `;
    }

    html += `<div class="detalle">`;

    if (tieneImagen && imagenUrl) {
        html += `
            <div class="imagen">
                <img src="${imagenUrl}" alt="${noticia.cabecera || 'Imaxe'}" loading="lazy"
                     onerror="this.style.display='none'"
                     onload="this.classList.add('loaded')" class="loading">
            </div>
        `;
    }

    if (tieneTextoLargo) {
        const textoConSaltos = noticia.texto_largo.replace(/\|/g, '<br><br>');
        html += `<div class="texto-largo">${textoConSaltos}</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
    return container;
}

/**
 * Toggle para noticias (expander/colapsar)
 */
function toggleNoticia(btn) {
    const card = btn.closest('.noticia-card, .noticia-destacada');
    if (!card) return;

    const isOpen = card.classList.contains('abierta');
    const btnText = btn.querySelector('.btn-text');

    if (isOpen) {
        card.classList.remove('abierta');
        if (btnText) btnText.textContent = '▶ Ler máis';
    } else {
        card.classList.add('abierta');
        if (btnText) btnText.textContent = '▲ Ler menos';
    }
}

window.toggleNoticia = toggleNoticia;

// ===== EXPORTAR =====
window.crearTarjetaJugador = crearTarjetaJugador;
window.crearTarjetaNoticia = crearTarjetaNoticia;
window.toggleNoticia = toggleNoticia;
