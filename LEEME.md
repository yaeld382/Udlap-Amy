# UDLAP e-waste (PWA)

Archivos: index.html, manifest.json, sw.js, icons/

## Probar en local
python -m http.server 8000   ->  http://localhost:8000
(El service worker solo funciona en localhost o HTTPS.)

## Publicar gratis (GitHub Pages)
1. Sube todos los archivos a un repositorio.
2. Settings > Pages > Deploy from branch (main, carpeta /root).
3. Abre la URL https en el celular > menú del navegador > "Instalar app" / "Agregar a pantalla de inicio".

## Antes de lanzar
- Reemplaza PUNTOS (puntos de acopio reales) y COMP en index.html.
- Valida el factor de impacto F (1 kg ≈ 20 L es ilustrativo).
- Si cambias archivos, sube el número de CACHE en sw.js (v1 -> v2).
