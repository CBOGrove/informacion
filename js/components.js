// ===== COMPONENTES REUTILIZABLES =====
// Versión 2.2 - Rutas relativas

/**
 * Crea una tarjeta de jugador (para plantillas y juegos)
 */
function crearTarjetaJugador(jugador, opciones = {}) {
    const {
        equipo = 'femenino',
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
    // Usar CONFIG.drive para la ruta
    const driveBase = equipo === 'femenino' ? CONFIG.drive.femenino : CONFIG.drive.masculino;
    const fotoUrl = jugador.foto || `${driveBase}${jugador.numero}.png`;

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
    const borderColor = invertido ? '#FFD700' : '#000000';

    back.style.background = bgColor;
    back.style.border = `3px solid ${borderColor}`;

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

// ===== AÑADIR AL FINAL DEL ARCHIVO =====

/**
 * Crea una tarjeta de jornada (con flip)
 */
function crearTarjetaXornada(jornada) {
    const container = document.createElement('div');
    container.className = 'xornada-flip-container';

    const inner = document.createElement('div');
    inner.className = 'xornada-flip-inner';

    // ===== PROCESAR DATOS =====
    const xornadaNum = jornada.xornada || '?';
    const dataFormateada = jornada.data ? formatearFecha(jornada.data) : '';
    const campo = jornada.campo || 'Sen campo';
    const local = jornada.equipoLocal || 'Local';
    const visitante = jornada.equipoVisitante || 'Visitante';
    const resultado = jornada.resultado || '⏳ Por disputar';
    const hayResultado = jornada.resultado && jornada.resultado.trim() !== '';
    
    // Logos
    const logoLocal = jornada.logoLocal ? convertirURLImagen(jornada.logoLocal) : '';
    const logoVisitante = jornada.logoVisitante ? convertirURLImagen(jornada.logoVisitante) : '';
    
    // Enlaces
    const twitchUrl = jornada.twitch && jornada.twitch.toUpperCase() !== 'NO' ? jornada.twitch : null;
    const youtubeUrl = jornada.youtube && jornada.youtube.toUpperCase() !== 'NO' ? jornada.youtube : null;
    const vodUrl = jornada.vod && jornada.vod.toUpperCase() !== 'NO' ? jornada.vod : null;
    const tieneEnlaces = twitchUrl || youtubeUrl || vodUrl;
    
    // Info detrás (procesar | como saltos de línea)
    const infoLines = jornada.infoDetras ? jornada.infoDetras.split('|').map(line => line.trim()) : [];

    // ===== FRENTE =====
    const front = document.createElement('div');
    front.className = 'xornada-flip-front';
    
    let frontHTML = `
        <div class="xornada-card">
            <div class="xornada-header">
                <span class="xornada-numero">📅 Xornada ${xornadaNum}</span>
                ${dataFormateada ? `<span class="xornada-data">${dataFormateada}</span>` : ''}
            </div>
            <div class="xornada-partido">
                <div class="xornada-equipo xornada-local">
                    <div class="xornada-logo-container">
                        ${logoLocal ? `<img src="${logoLocal}" alt="${local}" loading="lazy" onerror="this.style.display='none'">` : '<span class="xornada-logo-placeholder">🏀</span>'}
                    </div>
                    <span class="xornada-equipo-nombre">${local}</span>
                </div>
                <div class="xornada-resultado ${hayResultado ? '' : 'por-disputar'}">
                    ${resultado}
                </div>
                <div class="xornada-equipo xornada-visitante">
                    <div class="xornada-logo-container">
                        ${logoVisitante ? `<img src="${logoVisitante}" alt="${visitante}" loading="lazy" onerror="this.style.display='none'">` : '<span class="xornada-logo-placeholder">🏀</span>'}
                    </div>
                    <span class="xornada-equipo-nombre">${visitante}</span>
                </div>
            </div>
            <div class="xornada-campo">
                <span>📍 ${campo}</span>
            </div>
    `;

    // Enlaces
    if (tieneEnlaces) {
        frontHTML += `<div class="xornada-enlaces">`;
        if (twitchUrl) {
            frontHTML += `<a href="${twitchUrl}" target="_blank" class="xornada-enlace twitch">🔴 Sigue o partido en directo en Twitch</a>`;
        }
        if (youtubeUrl) {
            frontHTML += `<a href="${youtubeUrl}" target="_blank" class="xornada-enlace youtube">🔴 Sigue o partido en directo en YouTube</a>`;
        }
        if (vodUrl) {
            frontHTML += `<a href="${vodUrl}" target="_blank" class="xornada-enlace vod">▶️ Ver partido completo (VOD)</a>`;
        }
        frontHTML += `</div>`;
    }

    // Indicador de flip si hay info detrás
    if (infoLines.length > 0) {
        frontHTML += `
            <div class="xornada-flip-indicator">
                <span>👆 Fai clic para ver o resumo</span>
            </div>
        `;
    }

    frontHTML += `</div>`; // cierre xornada-card
    front.innerHTML = frontHTML;

    // ===== DETRÁS (FLIP) =====
    const back = document.createElement('div');
    back.className = 'xornada-flip-back';

    if (infoLines.length > 0) {
        let backHTML = `
            <div class="xornada-back-content">
                <div class="xornada-back-header">
                    <span>📝 RESUMEN · Xornada ${xornadaNum}</span>
                </div>
                <div class="xornada-back-info">
        `;
        
        infoLines.forEach(line => {
            backHTML += `<p>${line}</p>`;
        });
        
        backHTML += `
                </div>
                <div class="xornada-back-indicator">
                    <span>🔄 Fai clic para volver</span>
                </div>
            </div>
        `;
        back.innerHTML = backHTML;
    } else {
        // Si no hay info, el back muestra un mensaje
        back.innerHTML = `
            <div class="xornada-back-content">
                <div class="xornada-back-header">
                    <span>📝 RESUMEN · Xornada ${xornadaNum}</span>
                </div>
                <div class="xornada-back-info">
                    <p style="opacity:0.6; font-style:italic;">Sen resumo dispoñible para esta xornada.</p>
                </div>
                <div class="xornada-back-indicator">
                    <span>🔄 Fai clic para volver</span>
                </div>
            </div>
        `;
    }

    // ===== MONTAR FLIP =====
    inner.appendChild(front);
    inner.appendChild(back);
    container.appendChild(inner);

    // ===== EVENTO CLICK =====
    container.addEventListener('click', function(e) {
        // Evitar que el click en enlaces active el flip
        if (e.target.closest('a')) return;
        this.classList.toggle('flipped');
    });

    return container;
}

// ===== EXPORTAR (añadir al final) =====
window.crearTarjetaXornada = crearTarjetaXornada;
