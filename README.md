# StayHome - Marketplace de Alojamientos

## Descripción
Aplicación web frontend desarrollada en Angular para Inversiones LR. Permite a los huéspedes explorar alojamientos, filtrarlos, ver su detalle, cotizar una estancia y simular una reserva. Proyecto de Desarrollo de Sistemas de Información 3, Universidad El Bosque.

## Integrantes
- Miguel Sierra
- Santiago Delacroix
- Maria Ximena Polo
- Ximena Gonzalez

## Tecnologías utilizadas
- Angular
- TypeScript
- Bootstrap
- Node.js y npm
- GitHub


## Instalación
```bash
git clone https://github.com/ximenagonzalez-ai/marketPlace-de-alojamientos.git
cd marketPlace-de-alojamientos
npm install
```

## Ejecución
```bash
ng serve
```
Abrir en el navegador: http://localhost:4200

## Principales funcionalidades
- Página inicial con alojamientos destacados
- Listado de alojamientos activos
- Filtros por ciudad, huéspedes, tipo y precio máximo
- Detalle con reseñas e imágenes
- Cotización con validación de fechas
- Simulación de reserva y consulta en "Mis reservas"

## Estructura del proyecto

```
ProyectoAlojamientos/
├── public/
│   ├── assets/
│   │   ├── data/
│   │   │   └── marketplace-data.json    # Datos iniciales de la aplicación
│   │   └── images/                      # Imágenes de los alojamientos
│   └── favicon.ico
├── src/
│   └── app/
│       ├── components/
│       │   ├── alojamientos-list/       # Listado de alojamientos y filtros
│       │   ├── cotizacion/              # Cotización de la estancia
│       │   ├── detalle-alojamiento/     # Vista de detalle de un alojamiento
│       │   ├── footer/                  # Pie de página
│       │   ├── home/                    # Página inicial
│       │   ├── misreservas/             # Consulta de reservas realizadas
│       │   ├── navbarcomponent/         # Barra de navegación
│       │   └── simularreserva/          # Formulario de simulación de reserva
│       ├── model/
│       │   ├── alojamientomodel.ts      # Interfaz Alojamiento
│       │   ├── cotizacionmodel.ts       # Interfaz Cotización
│       │   ├── resena.model.ts          # Interfaz Reseña
│       │   └── reservamodel.ts          # Interfaz Reserva
│       ├── service/
│       │   ├── alojamientoservice.ts    # Acceso a los datos (JSON)
│       │   └── reservaservice.ts        # Manejo de reservas
│       ├── app.css
│       ├── app.html
│       ├── app.routes.ts                # Definición de rutas
│       └── app.ts                       # Componente raíz
└── README.md
```
## Datos de la aplicación
Los datos iniciales se encuentran en `public/assets/data/marketplace-data.json`
y son consultados a través de `AlojamientoService`. 

Las imágenes están en `public/assets/images/`.
