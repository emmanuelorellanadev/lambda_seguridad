# Lambda Seguridad

Sistema de gestión de seguridad desarrollado en React (frontend) y Node.js (backend).

## Idioma

Esta aplicación está completamente en **español**. Incluye:

- Interfaz de usuario en español
- Mensajes de error en español
- Validaciones en español
- Documentación en español

## Tecnologías

### Frontend
- React 18
- Vite
- TailwindCSS
- Bootstrap 5
- SweetAlert2
- React Hot Toast

### Backend
- Node.js
- Express
- Sequelize (ORM)
- MariaDB
- JWT Authentication
- bcryptjs

## Estructura del Proyecto

```
lambda_seguridad/
├── lambda_seguridad_frontEnd/    # Aplicación React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── context/             # Contextos React
│   │   ├── css/                 # Estilos CSS
│   │   └── assets/              # Recursos estáticos
│   └── package.json
└── lambda_seguridad_backEnd/     # API Node.js
    ├── controllers/             # Controladores
    ├── models/                  # Modelos de datos
    ├── routes/                  # Rutas de la API
    ├── middlewares/             # Middlewares
    └── package.json
```

## Instalación

### Frontend
```bash
cd lambda_seguridad_frontEnd
npm install
npm run lambda
```

### Backend
```bash
cd lambda_seguridad_backEnd
npm install
npm run dev
```

## Funcionalidades

- **Autenticación**: Sistema de login con JWT
- **Gestión de Usuarios**: Crear, editar, eliminar usuarios
- **Gestión de Roles**: Control de permisos
- **Gestión de Empresas**: Administración de empresas
- **Gestión de Sucursales**: Manejo de sucursales
- **Gestión de Habitaciones**: Control de habitaciones
- **Reservaciones**: Sistema de reservas
- **Clientes**: Gestión de personas/clientes
- **Servicios**: Administración de servicios
- **Precios**: Gestión de precios

## Licencia

ISC