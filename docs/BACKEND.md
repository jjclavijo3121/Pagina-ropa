# Backend ICNT — guía para empezar

## ¿Qué es el backend?

El **frontend** (React) es lo que ves en el navegador: botones, páginas, carrito.

El **backend** es un programa que corre en el servidor y:

- Guarda y devuelve datos (productos, pedidos…)
- Valida información
- Más adelante: usuarios, pagos, base de datos

En ICNT usamos **Node.js + Express**: JavaScript en el servidor, mismo lenguaje que el frontend.

## Estructura del proyecto

```
Proyecto ICNT/
├── src/              ← Frontend (React)
│   └── api/client.js ← Llama al backend con fetch()
├── server/           ← Backend (Express)
│   ├── index.js      ← Arranca el servidor
│   ├── config.js     ← Puerto y variables de entorno
│   └── routes/       ← Rutas de la API
│       ├── products.js
│       └── orders.js
└── .env              ← Configuración local (no subir a Git)
```

## Cómo arrancar todo

1. Copia la configuración:

   ```bash
   copy .env.example .env
   ```

2. Instala dependencias (si aún no):

   ```bash
   npm install
   ```

3. Arranca **frontend + backend** a la vez:

   ```bash
   npm run dev:all
   ```

   - Web: http://localhost:5173  
   - API: http://localhost:3001/api/health  

Solo backend:

```bash
npm run dev:server
```

## Rutas de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Comprueba que el servidor vive |
| GET | `/api/productos` | Todos los productos |
| GET | `/api/productos?seccion=/mujer` | Productos de una sección |
| GET | `/api/productos/:id` | Un producto (ficha) |
| POST | `/api/pedidos` | Envía un pedido (cesta) |

### Ejemplo en el navegador

- http://localhost:3001/api/health  
- http://localhost:3001/api/productos?seccion=/hombre  

## Cómo se conectan frontend y backend

Vite redirige las peticiones a `/api/*` al puerto 3001 (`vite.config.js`).

En React usamos `src/api/client.js`:

```js
fetchProducts('/mujer')  // → GET /api/productos?seccion=/mujer
```

Si el backend no está encendido, las páginas de venta usan los datos locales como respaldo.

## Próximos pasos (cuando quieras)

1. Base de datos (SQLite o PostgreSQL) en lugar de memoria
2. Guardar pedidos de verdad
3. Login de usuarios
4. Panel de administración para subir productos
