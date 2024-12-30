# 🚀 TaskManagerFrontend

Este proyecto es un frontend desarrollado con **React.js** y **Vite**, diseñado para gestionar tareas de manera eficiente. ✅

## 🌟 Características principales

- **Diseño Responsivo**: Interfaz atractiva y funcional en dispositivos móviles y de escritorio.
- **Gestión de Tareas**: Crear, listar, actualizar y eliminar tareas con facilidad.
- **Integración API**: Comunicación fluida con el backend mediante peticiones HTTP.
- **Uso de Context API**: Manejo eficiente del estado global.

## 📁 Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```
TaskManagerFrontend/
├── node_modules/         # Dependencias del proyecto
├── public/               # Archivos estáticos
├── src/                  # Código fuente del proyecto
│   ├── api/              # Lógica de conexión con la API
│   ├── assets/           # Recursos estáticos (imágenes, íconos, etc.)
│   ├── components/       # Componentes reutilizables de la UI
│   ├── context/          # Context API para manejo de estado global
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas principales de la aplicación
│   ├── styles/           # Archivos de estilo globales
│   ├── utils/            # Funciones y utilidades comunes
│   ├── App.css           # Estilos principales de la aplicación
│   ├── App.jsx           # Componente principal del frontend
│   ├── index.css         # Estilos globales
│   └── main.jsx          # Punto de entrada del proyecto
├── .env                  # Variables de entorno
├── .gitignore            # Archivos y carpetas ignorados por Git
├── eslint.config.js      # Configuración de ESLint
├── index.html            # Archivo HTML principal
├── package-lock.json     # Bloqueo de dependencias
├── package.json          # Dependencias del proyecto
├── postcss.config.js     # Configuración de PostCSS
├── README.md             # Documentación del proyecto
├── tailwind.config.js    # Configuración de Tailwind CSS
└── vite.config.js        # Configuración de Vite
```

## 📦 Instalación

### Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Instrucciones de instalación](https://nodejs.org/)
- **npm** o **yarn**: Administrador de paquetes.

### Pasos para la instalación

1. **Clonar el repositorio**

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/TaskManagerFrontend.git
```

2. **Instalar dependencias**

Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
cd TaskManagerFrontend
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

Reemplaza `http://localhost:3000/api` con la URL del backend si es diferente.

4. **Iniciar la aplicación**

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

La aplicación estará disponible en:

```http
http://localhost:5173
```

## 🔧 Uso de la Aplicación

### Crear una Tarea

1. Haz clic en el botón **"Añadir Tarea"**.
2. Completa el formulario con los detalles de la tarea.
3. Haz clic en **"Guardar"** para agregarla a la lista.

### Editar una Tarea

1. Selecciona el ícono de edición junto a la tarea deseada.
2. Realiza los cambios necesarios en el formulario.
3. Haz clic en **"Actualizar"** para guardar los cambios.

### Eliminar una Tarea

1. Selecciona el ícono de eliminación junto a la tarea deseada.
2. Confirma la acción en el cuadro de diálogo.

## 🛠️ Problemas comunes

1. **Error al conectar con el backend**:

   - Verifica que el servidor backend esté en ejecución y que la URL en el archivo `.env` sea correcta.

2. **El frontend no se inicia**:
   - Asegúrate de que las dependencias estén instaladas correctamente.
   - Revisa que no haya conflictos en el puerto `5173` o configura uno diferente en `vite.config.js`.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
