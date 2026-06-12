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

## Publicar en Cloudflare Workers

```bash
npm run deploy
```

Worker: `patujuconstrucciones`.

Configuracion equivalente desde el panel:

- Comando de build: `npm run build`
- Comando de deploy: `npx wrangler deploy`
- Directorio de salida: `dist`
- Version de Node.js: 20 o superior

Para SEO, configura una variable de build llamada `SITE_URL` con la URL publica
sin barra final, por ejemplo `https://www.ejemplo.com`. El build generara
automaticamente etiquetas canonical y `sitemap.xml`.
