# FuturoLab EC — La tribu sin tabú

Sitio web educativo de una sola página sobre Educación Sexual Integral (ESI),
proyecto de vida, prevención de violencias de género y embarazo infantil, y
salud mental en la adolescencia. Diseñado como un "laboratorio" visual en
turquesa y morado, con módulos interactivos.

## Estructura del proyecto

```
futurolab-ec/
├── index.html   # Contenido y estructura semántica del sitio
├── style.css    # Sistema de diseño (turquesa/morado, tipografía, layout)
├── script.js    # Interactividad: carrusel, tarjetas volteables, stepper,
│                # gráficos animados, acordeones, pestañas, scroll
└── README.md
```

## Cómo usarlo

No requiere instalación ni compilación. Es HTML/CSS/JS puro.

1. Descarga o clona el repositorio.
2. Abre `index.html` en cualquier navegador — o publícalo con **GitHub Pages**:
   - Ve a *Settings → Pages* en tu repositorio.
   - Selecciona la rama `main` y la carpeta raíz (`/`).
   - GitHub te dará una URL pública en un par de minutos.

## Qué incluye

- **Carrusel** de 6 tarjetas ilustradas (SVG propio, sin imágenes externas)
  que resume los temas del laboratorio, con autoplay, flechas y puntos.
- **Módulo 01 — ESI y proyecto de vida:** conceptualización, estadísticas de
  impacto, tarjetas "mito o realidad" que se voltean al hacer clic, y un
  acordeón con estrategias de Ecuador, Venezuela, Perú y Zambia.
- **Módulo 02 — Prevención y violencia:** ruta de atención ante embarazo
  infantil, habilidades de la ESI contra el abuso, un *stepper* interactivo
  con el marco "Cuatro Pasos" de la Iniciativa Spotlight, pestañas con
  programas de trabajo con varones (Programa H, Stepping Stones, Fourth R) y
  violencia de género digital.
- **Módulo 03 — Salud mental:** estadísticas globales y regionales, un
  gráfico de barras animado con las causas de atención en Ecuador (2023),
  nota sobre comportamiento suicida con líneas de ayuda, acordeón de
  herramientas de tamizaje (HEADSSS, PHQ-9, GAD-7) y trastornos alimentarios.
- **Módulo 04 — Enfoque integral:** niveles del modelo socioecológico,
  interseccionalidad, autonomía progresiva y la escuela como escudo protector.
- **Recursos de ayuda:** barra fija superior + sección con líneas de crisis
  (Ecuador, Chile) siempre visibles.

## Personalización

- Colores y tipografía: variables CSS al inicio de `style.css` (bloque
  `:root`) — `--turquoise-500`, `--purple-500`, etc.
- Contenido de texto: directamente en `index.html`.
- Ilustraciones del carrusel: son SVG en línea dentro de `index.html`
  (buscar `<article class="slide">`); puedes reemplazarlas por tus propias
  imágenes cambiando `.slide-art` por una etiqueta `<img>`.
- Nuevas tarjetas mito/realidad, pasos del stepper o barras del gráfico:
  siguen la misma estructura HTML repetida; `script.js` las detecta
  automáticamente por clase, sin tocar el JavaScript.

## Nota

Este contenido tiene fines educativos y no reemplaza la atención de un
profesional de salud o de salud mental.
