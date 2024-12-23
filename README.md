#  Proyecto: Sistema de Gestión de Usuarios y Pokémon usando PokeAPI

Este proyecto es una aplicación que permite a los usuarios registrarse, iniciar sesión y gestionar un inventario de Pokémon. Está diseñado siguiendo principios de **Clean Code** y una arquitectura modular.

---

## 📁 1. Estructura del Proyecto

La estructura principal del proyecto se encuentra en la carpeta `src/` y está organizada de la siguiente manera:

- **`entities/`**
  - `Pokemon.js` y `User.js`: Entidades del dominio.

- **`infrastructure/`**
  - `AuthService.js`, `database.js`, `PokeAPIService.js`: Conexión a la base de datos y servicios externos.

- **`interfaces/controllers/`**
  - `AuthController.js` y `PokemonController.js`: Controladores para manejar la lógica de las rutas.

- **`interfaces/routes/`**
  - `authRoutes.js` y `pokemonRoutes.js`: Definición de las rutas.

- **`useCases/`**
  - `AddPokemon.js`, `GetInventory.js`, `LoginUser.js`, `RegisterUser.js`: Casos de uso principales.

- **Archivos principales**
  - `app.js`: Configuración principal de la aplicación.
  - `server.js`: Punto de entrada del servidor.

---

## 🧠 2. Lógica de Negocio

### 🔐 Autenticación

- **Login:**  
  Los usuarios proporcionan su nombre de usuario y contraseña. Si los datos son correctos, se genera un token JWT que permite acceder a las rutas protegidas.

- **Logout:**  
  Al cerrar sesión, el token se marca como inválido, impidiendo el acceso a las rutas protegidas.

### 🐾 Gestión de Pokémon

- **Obtener Inventario:**  
  La ruta `GET /api/pokemon/inventory` devuelve los Pokémon que el usuario ha agregado a su inventario desde la base de datos MongoDB.

- **Agregar Pokémon:**  
  Al agregar un Pokémon, se realiza una solicitud a la PokeAPI para obtener información como el nombre, tipo y sprite del Pokémon, que se almacena en el inventario del usuario.

---

## 🌐 3. Rutas

### 3.1 Rutas de Autenticación

- **`POST /api/auth/login`**  
  Permite a los usuarios iniciar sesión y obtener un token de autenticación.

- **`POST /api/auth/logout`**  
  Permite a los usuarios salir de la sesión y revocar el token de autenticación.

### 3.2 Rutas de Pokémon

- **`POST /api/pokemon/add`**  
  Permite agregar un Pokémon al inventario del usuario. Los datos se obtienen de la PokeAPI.

- **`GET /api/pokemon/inventory`**  
  Permite a un usuario autenticado obtener una lista de los Pokémon almacenados en su inventario personal.

---

## ✅ 4. Pruebas

Las pruebas automatizadas se realizan utilizando **Jest** y **Supertest**. 

### Cobertura de Pruebas

#### 🔐 Pruebas de Autenticación:
- Verificar que el login funcione correctamente y devuelva un token válido.
- Validar que las rutas protegidas requieran un token válido y denieguen el acceso con un token inválido.

####  Pruebas de Gestión de Pokémon:
- Verificar que los Pokémon se agreguen correctamente al inventario.

---

## 🛠️ 5. Instrucciones para Ejecutar el Proyecto

1. Instalar las dependencias:
   ```bash
   npm install

2. Ejecuta el servidor 
    ```bash
    node src/server.js
    
3. Ejecuta las pruebas
    ```bash
    npx jest tests/auth.test.js