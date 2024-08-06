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
- **Deployment:** https://proyectofinal-app-campos.netlify.app/

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

### Login
Esta es la pantalla de inicio de sesión, permite a los usuarios introducir su correo electrónico y contraseña para iniciar sesión en la aplicación. Recibe el objeto *navigation* por props.

Utiliza el hook *useState* para crear tres variables de estado:
- **email:** una cadena que almacena la dirección de correo electrónico del usuario.
- **password:** cadena que almacena la contraseña del usuario.
- **errorCredentials:** una cadena que almacena cualquier mensaje de error relacionado con las credenciales del usuario.

Luego utiliza el hook **useSignInMutation** (traido desde *authServices*) que sirve para hacer el inicio de sesión del usuario.

Más abajo se almacena en una variable el hook *useDispatch* para obtener la función de envío de Redux.

Se hace uso de un solo *useEffect*, ésta se activa cuando cambia la variable de result del **useSignInMutation**. Comprueba si la mutación de inicio de sesión se ha realizado correctamente y, en caso afirmativo, inserta los datos de sesión del usuario en el almacenamiento (mediante la función **insertSession**, traida desde **persistance**) y envía una acción para establecer los datos del usuario en el estado **auth** usando el *dispatch* con un **setUser** (importado de **useSlice**).

Se define una única función:
- **onSubmit:** se llama cuando el usuario envía el formulario de inicio de sesión. Valida el correo electrónico y la contraseña del usuario utilizando el **loginSchema** (creado en **validations**) y, si son válidos, activa la mutación **triggerSingIn** para iniciar la sesión del usuario. Si hay algún error, establece la variable de estado **errorCredentials** con el mensaje de error respectivo al tipo de error, definido en **loginSchema**.

Para concluir renderiza el componente **RegisterForm** con el título "Inicia sesión". El formulario contiene:
- Dos componentes **InputForm** para que el usuario introduzca su correo electrónico y contraseña.
- Un componente *Text* que muestra cualquier mensaje de error,en caso de existir, relacionado con las credenciales del usuario.
- Un componente **SubmitButton** que activa la función **onSubmit** cuando se pulsa.
- Un componente *Text* que muestra un mensaje preguntando si el usuario aún no tiene una cuenta.
- Un componente *Pressable* que navega a la pantalla de "SignUp" cuando se pulsa.


### SignUp

Es la pantalla de registro, permite a los usuarios crear una cuenta introduciendo su correo electrónico, contraseña y confirmando su contraseña.

El componente recibe un prop de *navigation*, permitiendole al componente navegar a otras pantallas.

Utiliza el hook *useState* para crear seis variables de estado:
- **email:** una cadena que almacena la dirección de correo electrónico del usuario.
- **errorMail:** una cadena que almacena cualquier mensaje de error relacionado con el correo electrónico del usuario.
- **password:** cadena que almacena la contraseña del usuario.
- **errorPassword:** cadena que almacena los mensajes de error relacionados con la contraseña del usuario.
- **confirmPassword:** cadena que almacena la contraseña confirmada del usuario.
- **errorConfirmPassword:** cadena que almacena cualquier mensaje de error relacionado con la contraseña confirmada del usuario.

Luego almacena en una constante el hook *useDispatch* de **react-redux**.

El componente utiliza el hook **useSignUpMutation** (importado desde **authServices**) para crear una mutación para dar de alta al usuario.

Este componente utiliza un hook *useEffect* que se activa cuando cambia la variable de *result* del **useSingUpMutation**. Comprueba si la mutación de registro se ha realizado correctamente y, en caso afirmativo, inserta los datos de sesión del usuario en el almacenamiento (utilizando la función **insertSession** creada en **persistance**) y envía una acción para establecer los datos del usuario en el estado **auth**, usando **setUser** (traído de **userSlice**). En caso de algun error se mostrará con una tostada indicándolo.

El componente define una función **onSubmit** que es llamada cuando el usuario envía el formulario de registro. Valida el email del usuario, la contraseña y la contraseña confirmada usando el esquema de validación de **signupSchema** (creado en **validations**), y si es válido, activa la mutación **triggerSignUp** para registrar al usuario. Si hay algún error, establece las variables de estado de error correspondientes a los mensajes de error.

Por último renderiza un componente **RegisterForm** con el título "Crea una cuenta". El formulario contiene:
- Tres componentes **InputForm** para que el usuario introduzca su email, contraseña y contraseña confirmada. Cada campo de entrada recibe el mensaje de error relacionado con el campo.
- Un componente **SubmitButton** que activa la función **onSubmit** cuando se pulsa.
- Un componente *Text* que muestra un mensaje preguntando si el usuario ya tiene una cuenta.
- Un componente *Pressable* que navega a la pantalla "Login" cuando se pulsa.

### Home

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
Muestra el carrito de comprar con los productos elegidos y las cantidades. Da la opción de completar la compra, aunque no se agregó ningun método de pago en este proyecto.

El componente utiliza el hook **useSelector** de la librería *react-redux* para acceder al estado del carrito y el total desde la tienda Redux asi como el *user* del estado *auth*. Y más adelante se invoca a **useDispatch**, de la misma librería.

La función **confirmarOrden** es llamada cuando el usuario pulsa el botón "Confirmar orden". Esta función crea un nuevo objeto **Date** para obtener la fecha actual, llama a la función **triggerPostOrder** (el trigger de **usePostOrderMutation**, que referencia al endpoint de la shopApi definida en *shopServices*) con un objeto que contiene:
- **items:** el array de items del carrito.
- **user:** la dirección de correo electrónico del usuario.
- **total:** el coste total de los artículos.
- **fecha:** la fecha actual en el formato "DD/MM/AAAA".
Una vez hacho el trigger, envía la acción **deleteCart** para borrar el estado del carrito.

El componente se renderiza:

- Un componente *FlatList* para mostrar la lista de artículos del carrito. Cada artículo se representa como un componente *CartItem*.
- Un componente *View* con un hijo *Text* que muestra el coste total de los artículos.
- Un componente *CustomButton* con el texto "Confirmar orden". Cuando se pulsa, llama a la función **confirmarOrden**. El botón se desactiva si el carrito está vacío.

### Order

Es una pantalla que muestra una lista de los pedidos realizados por un usuario específico.

Este componente utiliza el hook *useSelector* de la librería *react-redux* para acceder al estado auth desde el almacén Redux y extrae la propiedad *user* del estado *auth*.

A continuación, utiliza el hook **useGetOrdersByUserQuery** (importado desde *shopServices*) para obtener los datos de los pedidos del usuario conectado en ese momento. La propiedad *data* del resultado del hook se extrae y se almacena en la variable **orderData**.

Por último renderiza un componente *FlatList* para mostrar la lista de pedidos. Cada pedido se obtiene de *orderData* y se representa como un componente *OrderItem*.

### MyProfile
Es una pantalla que muestra la información del perfil del usuario, incluida su imagen de perfil, y proporciona botones para actualizar su imagen de perfil, seleccionar una ubicación y cerrar sesión. Recibe unicamente *navigation* por props.

Luego tiliza el hook *useDispatch* para obtener la función dispatch del almacén Redux, y seguidamente el *useSelector* para acceder a las propiedades imageCamera y localId del estado *auth*.

El componente utiliza **useGetProfileImageQuery** (importado de *shopServices*) para obtener la imagen de perfil del usuario.

Más tarde almacena en una constante la ruta donde se encuentra la imagen por defecto que se mostrará cuando no haya no haya ninguna definida.

Este componente define dos funciones:

- **launchLocation:** navega a la pantalla *ListAddress* cuando se le llama.
- **signOut:** cierra la sesión del usuario y envía la acción **clearUser.** Si se produce un error, muestra un mensaje de error mediante una tostada.

Todas las funciones se pasan como props a los componentes **CustomButton**.

Por ultimos renderiza los siguientes elementos:

- Un componente *View* que contiene un componente *Image*, que muestra la imagen de perfil del usuario. La fuente de la imagen está determinada por las siguientes reglas:
    - Si existen **imageCamera** o **imageFromBase**, utiliza la propiedad uri de *imageFromBase* o *imageCamera*.
    - En caso contrario, utiliza la imagen predeterminada de la ruta *defaultImageRoute*.
- Tres componentes **CustomButton**, cada uno con una acción diferente. El primer botón navega a la pantalla *ImageSelector* cuando se pulsa. El segundo botón llama a la función *launchLocation*. El tercer botón llama a la función *signOut*.

### ImageSelector

Esta pantalla permite al usuario seleccionar una imagen de perfil de su cámara o galería y, a continuación, cargarla en el servidor. Recibe *navigacion* por props.

El componente utiliza el hook *useState* para crear una variable de estado *imagen* para almacenar la imagen seleccionada. Tambien hace uso del hook *useDispatch* para obtener la función dispatch del almacén Redux. Luego llama al hook *useSelector* para acceder a la propiedad *localId* del estado *auth*.

Más adelante utiliza los hooks **useGetProfileImageQuery** para traer la imagen de perfil que coincida con el *localId* y **usePostProfileImageMutation** (importado desde *shopServices*) para enviar la imagen de perfil al servidor.

Luego se definen varias funciones:
- **verifyCameraPermission:** utiliza **requestCameraPermissionsAsync()** de *expo-image-picker* para comprobar si la aplicación tiene permiso para acceder a la cámara. Devuelve un valor booleano.
- **pickImage:** permite al usuario seleccionar una imagen de la cámara o de la galería si es que se otorgaron los permisos.
- **deleteImage:** selecciona la imagen por defecto.
- **confirmImage:** confirma la imagen seleccionada y la sube al servidor junto con el *localId*. En caso de error muestra una tostada.

El componente muestra los siguiente elementos:

- El componente *Subtitle* que muestra el título "Foto de perfil".
- Un componente *View* que contiene un componente *Image*, que muestra la imagen seleccionada. El origen de la imagen viene determinado por las siguientes reglas:
    - Si *imagen* es "default", utiliza una imagen por defecto de la ruta *defaultImageRoute*.
    - Si *imagen* y *imageFromBase* existen e *imagen* es distinto de "default", utiliza la propiedad uri de *imagen* o *imageFromBase*.
    - Si *imagen* e *imageFromBase* no existen utiliza la imagen predeterminada de la ruta *defaultImageRoute*.
- Cuatro componentes **CustomButton**, cada uno con una acción diferente:
    - El primer botón permite al usuario tomar una foto ocambiar la existente llamando a la función *pickImage* pasandole un *true*, lo cual permite a *pickImage* acceder a la cámara.
    - El segundo permite al usuario seleccionar una imagen de la galería, tambien llama a *pickImage*, pero esta vez le pasa un *false* por parámetro.
    - El tercero borra la imagen seleccionada mediante *deleteImage*.
    - El cuarto confirma la imagen seleccionada y la sube al servidor en case de existir *imagen* o *imageFromBase*, de lo contrario funciona para cancelar y volver a la pantalla anterior.

### ListAddress
Es una pantalla que muestra la ubicación actual del usuario, y proporciona una opción para seleccionar una nueva ubicación si no hay ninguna establecida. Recibe por prop el elemento *navigation*.

El componente utiliza el hook *useSelector* para acceder a la propiedad localId del estado *auth*.

Luego utiliza **useGetLocationQuery** para obtener la localización del usuario desde la API creada en *shopServices*.

Por último muestra diferentes elementos en función de si el usuario tiene una ubicación establecida o no:

- Si el usuario tiene una ubicación establecida muestra:
    - Un componente **Subtitle** con el título "Mi Ubicación".
    - Un componente **AddressItem** que muestra la ubicación del usuario. Recibe la ubicación y el navigation.
- Si el usuario no tiene una ubicación establecida muestra:
    - Un componente *Text* que muestra el mensaje "No hay ubicación establecida".
    - Un componente **CustomButton** que permite al usuario navegar a la pantalla **LocationSelector** para seleccionar una ubicación.

### LocationSelector

Esta pantalla permite al usuario seleccionar su ubicación, y luego confirma la dirección y la guarda en el servidor. Recibe la prop *navigation*.

Este componente utiliza el hook *useState* para crear dos variables de estado:
- **location:** un objeto que almacena la ubicación del usuario, con propiedades de latitud y longitud.
- **address:** una cadena que almacena la dirección del usuario.

Mas tarde hace uso del hook **usePostLocationMutation** (importado de *shopServices*) que sirve para enviar la localización del usuario al servidor. Y luego del *useSelector* para acceder al *localId* del estado *auth*.

Se ejecutan dos *useEffect*:
- El primero solicita permisos para acceder a la ubicación del usuario. Si se concede el permiso, obtiene la ubicación actual del usuario utilizando el método **getCurrentPositionAsync** de **expo-location** y actualiza la variable de estado *location*. En caso de error o que no se acepten los permisos, se mostrará una tostada indicandolo.
- El segundo se activa cuando cambia la variable *location* Utiliza la API **geocode** de Google Maps para invertir la geocodificación de la ubicación del usuario y obtener su dirección. A continuación, actualiza la variable de estado *address* con la dirección formateada. En caso de error se muestra una tostada.

Luego se define la única función de este componente:
- **onConfirmAddress:** una función que se llama cuando el usuario confirma su dirección. Crea un nuevo objeto de fecha y le da formato de cadena, luego llama a la mutación **triggerPostUserLocation** para publicar la ubicación del usuario en el servidor. Al finalizar vuelve a la pantalla anterior. Utiliza una tostada para manejar el error en caso de haber uno.

El componente muestra diferentes elementos en función de si se ha encontrado o no la ubicación del usuario:

- En ambos casos se renderiza el componente **Subtitle** con el título "Establecer ubicación".

- Si la localización del usuario ha sido encontrada renderiza:
    - Un componente *ScrollView* que contiene:
        - Un componente **MapPreview** que muestra una vista previa del mapa de la ubicación del usuario.
        - Un componente *Text* que muestra el texto "Dirección encontrada:".
        - Un componente *Text* que muestra la dirección del usuario.
        - Un componente **CustomButton** que permite al usuario confirmar su dirección.
- Si no se ha encontrado la ubicación del usuario se mostrará:
    - Un componente *View* que muestra el texto "Ubicación no encontrada".
