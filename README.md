# Yvaga Homes

Sitio web estatico de Yvaga Homes y Casa Yvaga para Patuju Construcciones.

## Desarrollo local

Abre `index.html` directamente en el navegador. No requiere servidor ni proceso de compilacion.

## Preparar publicacion

```bash
npm install
npm run build
```

El comando genera `dist/` con solo los archivos publicos. Los respaldos y propuestas de trabajo no se incluyen.

## Publicar en Cloudflare Pages

```bash
npm run deploy
```

Proyecto de Cloudflare Pages: `yvaga-homes`.

Configuracion equivalente desde el panel:

- Comando de build: `npm run build`
- Directorio de salida: `dist`
- Version de Node.js: 20 o superior
