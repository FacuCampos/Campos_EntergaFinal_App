# Proyecto final de Desarrollo de Apps

Este proyecto es una aplicacion desarrollada con React Native, una librería de Javascript de código abierto que ofrece grandes beneficios en rendimiento, modularidad y promueve un flujo muy claro de datos y eventos, facilitando la planeación y desarrollo de apps complejas.

## Herramientas

### Lenguaje

- Javascript

### Frameworks

- Node JS
- Expo
- React Native

### Librerias

- Tostify

### Base de datos

- Firebase

### Software de control de versiones

- git

## Links

- **Repositorio:** https://github.com/FacuCampos/Campos_EntregaFinal_App
- **Deployment:** https://campos-entregafinal-app.netlify.app/

## Organización del proyecto:

- **Carpeta Raiz:** Aqui se encuentran las carpetas _assets_ y _src_, junto con el _App.jsx_, los _package.json_ y las configuraciones de babel.
  - **assets:** contiene una carpeta _fonts_ con todas las fuentes utilizadas.
  - **src:** aqui se almacena todo el codigo fuente de la aplicación.

Dentro de la carpeta _src_ se encuentra lo siguiente:

- **components:** Abarca todos los componentes utilizados en toda la app. Contiene un barrel llamado _index.js_ para simplificar el uso de los imports.
- **database:** Contiene las apiKeys y las url de las bases de datos y la api de google maps.
- **features:** Aqui se encuentran los slice de _Cart_, _Counter_, _Shop_ y _User_, junto con sus respectivos reducers.
- **global:** Contiene los js de colores y las configuraciones de las tostadas que se utilizaran a lo largo del código.
- **navigation:** Abarca todos los stack navigators de la app y el _Navigator.jsx_.
- **persistence:** Contiene la configuracion de SQLite para mantener la sesión iniciada.
- **screens:** Incluye todas las pantallas que se pueden mostrar al usar la app.
- **services:** Contiene las conexiones a las bases de datos y de autenticación.
- **store:** Contiene el .js que establece y configura la tienda Redux.
- **validations:** Utilizando yup establece los parámetros para la validación de campos de los formularios.

## Pantallas - Screens

### Home / Inicio

Es la página principal del proyecto, recibe los objetos *navigation* y *route* por parámetros. Renderiza el componente *CategoryList* y le envia los elementos recibidos.

### ItemListCategory

Al seleccionar una categoria en *Home*, se muestra esta pantalla, la cual carga los productos de dicha categoria.
Asi como la pantalla anterior, recibe *navigation* y *route*.
En este componente se definen 5 estados: 
- **keyword:** Representa el texto ingresado en la barra de búsqueda.
- **productosFiltrados:** Contiene un array con los productos de la categoría que contienen la *keyword*.
- **error:** Contiene un string con error que puede mostrar el componente *Search*.
- **portrait:** Es un booleano y hace referencia a la orientación de la pantalla.
- **key:** Es el identificador que se usa para definir que lista mostrar, depende de portrait.
Luego se extrae del *routes* la categoría elegida. Utilizando el hook **useGetProductsByCategoryQuery**, creado en *shopServices*, se filtran los productos que coincidan con la categoría elegida y se los guarda en una variable llamada *productsFetched*, también se guarda el estado *isLoading*.

Posteriormente se obtienen el ancho y alto de la pantalla mediante  el hook *useWindowDimensions*, valores que se utilizan en el primer *useEffect* para establecer los valores de los estados **portrait** y **key**.

El siguiente *useState* filtra los productos cada vez que cambia la categoría o la keyword. Se utiliza un *.filter()* sumado a un *.includes()*

Por ultimo se renderiza el componente. En caso de que non haya productos filtrados, se hará un early return mostrando el componente *Loading*. Cuando ya haya productos cargados, se mostrarán 3 componentes:
- **Subtitle:** muestra el nombre de la categoría.
- **Search:** La barra de búsqueda.
- **Flatlist:** La lista de productos filtrados, la distribucion cambia dependiendo de si se esta en portrait o landscape.


### ItemDetail
Muestra el detalle del producto elegido. Recibe *navigation* y *route*.
Lo primero que hace es traer las dimensiones de la pantalla y traer el producto elegido desde el *route*.
Luego se crea la variable **count**, la referencia el valor del estado *counter*.
Seguidamente se trae el hook *useDispatch* y el **useGetProductByIdQuery** (Creado en *shopServices*, utiliza *Redux/Toolkit* para filtrar y devolver elproducto que coincida con el id pedido).
Luego crea un estado *portrait* y le asigna un valor booleano en un *useEffect* utilizando los valores obtenidos con *useWindowDimensions*.
Abajo se crea un useEffect que reinicia el contador cada vez que se desmonta el componente.
A este le sigue una función de agregar al carrito que mediante un dispatch llama al reducer *addCartItem* del *CartSlice*.
Por ultimo se ejecuta el montaje del componente, el cual en el caso de que *isLoading* sea *true*, mostrará el componente *Loading*.

### Cart
