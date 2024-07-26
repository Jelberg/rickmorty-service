![Rick and Morty](imgs/rickandmorty.jpeg)

# Rick & Morty Service

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.

## Database and relationship

**TYPES:** Tabla para almacenar los tipos de estatus.  
**STATUS:** Tabla para almacenar los estatus.  
**TYPE_STAT:** Tabla de relación entre tipos y estatus.  
**CHARACTERS:** Tabla para almacenar los personajes con una relación a TYPE_STAT.  
**EPISODES:** Tabla para almacenar los episodios con una relación a TYPE_STAT.  
**CATEGORIES:** Tabla para almacenar las categorías.  
**SUBCATEGORIES:** Tabla para almacenar las subcategorías con una relación a CATEGORIES.  
**EPIS_CHAR:** Tabla de relación entre personajes, episodios y tiempos.  
**SUBC_CHAR_EPIS:** Tabla de relación entre personajes, subcategorías y episodios.  
**TIMES:** Tabla para almacenar los tiempos de inicio y finalización de la participación de los personajes en los episodios.

## Tech Stack

⚒️ NextJS | Prisma ORM

🔮 PostgresSql

💚 Node v21.2.0

## Despligue

```bash
# Instalación de paquetes
npm install

# Ejecución de la aplicación
npm run dev
```
