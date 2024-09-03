
# Proyecto CNMH Prototipo - Frontend

Este es el frontend del proyecto **CNMH Prototipo**, desarrollado para el Centro Nacional de Memoria Histórica de Colombia. Este frontend maneja la interfaz de usuario, integración con Mapbox, y la visualización de datos proporcionados por el backend.

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación](#instalación)
   - [Dependencias](#dependencias)
   - [Variables de Entorno](#variables-de-entorno)
3. [Configuración de Vite](#configuración-de-vite)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Uso](#uso)
   - [Scripts de Desarrollo](#scripts-de-desarrollo)
   - [Construcción para Producción](#construcción-para-producción)
6. [Componentes Clave](#componentes-clave)
7. [Integración con Mapbox](#integración-con-mapbox)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

## Introducción

Este proyecto es la interfaz de usuario para la visualización de datos y mapas relacionados con la memoria histórica en Colombia. Utiliza tecnologías modernas como React, Vite, y Mapbox para proporcionar una experiencia interactiva y dinámica.

## Instalación

### Dependencias

Para instalar las dependencias del proyecto, primero asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados. Luego, ejecuta:

```bash
npm install
```

### Variables de Entorno

El proyecto utiliza un archivo `.env` para configurar las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_MAPBOX_API_KEY=<tu_clave_de_api_de_mapbox>
VITE_API_BASE_URL=<url_base_del_backend>
```

## Configuración de Vite

El proyecto utiliza [Vite](https://vitejs.dev/) como herramienta de construcción y servidor de desarrollo. El archivo `vite.config.js` contiene la configuración necesaria para que el proyecto funcione correctamente.

### Archivos Clave de Vite

- **`vite.config.js`**: Configura la base de la URL para la API y otros ajustes necesarios para el entorno de desarrollo y producción.

## Estructura del Proyecto

- **`index.html`**: Archivo HTML principal que carga la aplicación.
- **`public/`**: Carpeta que contiene recursos estáticos como imágenes y logos.
- **`src/`**: Carpeta principal que contiene la lógica de la aplicación:
  - **`components/`**: Componentes reutilizables y específicos de la aplicación.
  - **`services/`**: Servicios que interactúan con la API para obtener datos.
  - **`utils/`**: Funciones de utilidad, como manejo de parámetros de consulta y temas.
  - **`geojson/`**: Archivos GeoJSON utilizados para mapeo y visualización de datos espaciales.
  - **`assets/`**: Archivos de recursos como imágenes.
  - **`main.jsx`**: Punto de entrada de la aplicación React.

## Uso

### Scripts de Desarrollo

Para ejecutar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

### Construcción para Producción

Para construir el proyecto para producción, ejecuta:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## Componentes Clave

El proyecto está compuesto por varios componentes React. Algunos de los componentes clave incluyen:

- **`Mapa`**: Maneja la visualización de datos geoespaciales utilizando Mapbox.
- **`Exhibiciones`**: Componente encargado de mostrar la información de las exhibiciones.
- **`Lugares`**: Componente que muestra información sobre los lugares de memoria.
- **`Sliders`**: Componente para manejar y mostrar imágenes y multimedia en forma de sliders.

### Ejemplo de Uso

Aquí hay un ejemplo de cómo se utiliza un componente dentro de la aplicación:

```javascript
import Mapa from './components/Mapa';

function App() {
  return (
    <div className="App">
      <Mapa />
    </div>
  );
}

export default App;
```

## Integración con Mapbox

El proyecto utiliza [Mapbox](https://www.mapbox.com/) para manejar la visualización de mapas. Los datos se cargan desde archivos GeoJSON que se encuentran en la carpeta `geojson/`.

### Configuración

Para configurar Mapbox, asegúrate de añadir tu clave de API en el archivo `.env`:

```
VITE_MAPBOX_API_KEY=tu_clave_de_mapbox
```

### Uso de GeoJSON

Los archivos GeoJSON se utilizan para mapear datos específicos relacionados con el conflicto en Colombia y otros aspectos geoespaciales relevantes.

## Contribuciones

Si deseas contribuir a este proyecto, por favor crea un fork y realiza un pull request con tus mejoras o soluciones a problemas.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, revisa el archivo `LICENSE`.
