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


## Components

### AddressItem

Crea la vista de la tarjeta que muestra la dirección en **ListAddress**. Recibe la ubicación y el objeto *navigation* por props.

Este componente crea una función **onChangeLocation**, que utiliza el *navigation* para llamar a la pantalla **LocationSelector**.

### Card

Este componentes representa las tarjetas con las que se muestran las categorias. Recibe el *navigation* y la categoria elegida.

Luego almacena el *useDispatch* en una constante y crea una función **handleNavigate**. En ésta se utiliza el dispatch para ejecutar el **setCategorySelected** de **ShopSlice** y posteriormente navegar a **ItemListCategory** pasandole así mismo la categoria elegida.

### CartItem

Se utiliza para mostrar cada elemento en el carrito. Recibe un objeto con la informacion del item. En caso de querer borrar del carrito el item, crea un función **removeItem** que ejecuta **removeCartItem**, importadod desde el **CartSlice**.

### CategoryList

Muestra la lista de categorías en un diseño de cuadrícula. El componente utiliza el hook **useGetCategoriesQuery** (importado desde **shopServices**) para obtener datos de una API y el hook **useWindowDimensions** para obtener las dimensiones actuales de la ventana.

El componente utiliza el hook *useState* para almacenar la orientación actual del dispositivo en la variable de estado **orientacion**. El hook *useEffect* se utiliza para actualizar el estado **orientacion** cada vez que cambian las dimensiones de la ventana.

Para mostrar la lista se utiliza un *Flatlist*. El número de columnas de la grilla viene determinado por la variable de estado **orientacion**. Si el dispositivo está en modo vertical, la cuadrícula tendrá 2 columnas, de lo contrario, tendrá 4 columnas.

La función **formatData** que se define posteriormente formatea los datos obtenidos de la API en un formato adecuado para el *FlatList*. La función toma los datos y el número de columnas como argumentos y devuelve un nuevo array con los datos formateados.
La función funciona de la siguiente manera:
1. Crea una copia del array de datos original.
2. Calcula el número de filas completas en función del número de columnas.
3. Calcula el número de elementos de la última fila.
4. Añadir elementos vacíos a la última fila hasta que esté llena.
Esto asegura que todos los elementos del *Flatlist* tengan el mismo tamaño, evitando que los elementos de la última fila queden estirados al ser una cantidad menor a las columnas de la grilla.

Por último se renderiza el *Flatlist*, en caso de no existir **data** mostrará el componente **Loading**. La propiedad *data* del *FlatList* utiliza el retorno del **formatData** y puede renderizar 2 elementos dependiendo del item:
- En caso de que el item sea uno de los creados en **formatData** llamado "vacio", creará un elemento *View* invisible.
- En el caso contrario al anterior, mostrará el componente **Card** y le pasará la categoria elegida y el navigation. 

### Counter

Es un componente que muestra un contador con botones de incremento y decremento, así como una entrada de texto para establecer el contador en un valor específico.

Utiliza el hook *useSelector* para seleccionar el valor actual del contador del estado de Redux.

También se usa el hook *useState* para almacenar el valor de la entrada de texto en una variable de estado local **inputToAdd**.

Luego se definen 3 funciones:
- **handleDecrement**: Usa el hook *useDispatch* para ejecutar **decrement** desde **CounterSlice**. Luego cambia el estado de **InputToAdd** al valor del contador menos 1.
- **handleIncrement**: Usa el hook *useDispatch* para ejecutar **increment** desde **CounterSlice**. Luego cambia el estado de **InputToAdd** al valor del contador más 1.
- **handleIncrementToAmount**: Usa el hook *useDispatch* para ejecutar **incrementToAmount** desde **CounterSlice** y le pasa el valor del input. Luego cambia el estado de **InputToAdd** al valor elegido.

Al finalizar retorna un componente con 2 botones, para incrementar y decrementar el contador, y un *TextInput* donde se muestra el valor del contador y donde se puede establecer una cantidad específica.

### CustomButton
Devuelve un botón personalizado utilizando los parámetros deseados. Recibe la acción que el botón realizará, el texto interior, un estilo espécifico (en caso dee no pasarse ninguno usará el creado por defecto), el estilo del texto (tambien tiene un estilo por defecto en caso de no pasarse esta propiedad), y un booleano que define si el boton esta o no habilitado.

### Header
Es el componente superior que se muestra en toda la app. Recibe el titulo de la pantalla y lo muestra.

### InputForm

Muestra un campo de entrada de formulario con una etiqueta, una entrada de texto y un mensaje de error opcional.

El componente acepta las siguientes propiedades:

- **label:** El texto que se mostrará como etiqueta del campo de entrada.
- **onChange:** Una función de llamada de retorno que se llamará cuando cambie el valor de la entrada.
- **error:** Un mensaje de error opcional para mostrar debajo del campo de entrada. Por defecto es una cadena vacía.
- **isSecure:** Un booleano que indica si el campo de entrada debe ser seguro (por ejemplo, para introducir contraseñas). Por defecto es false.
- **estilo:** Un objeto de estilo personalizado para aplicar al campo de entrada. Tiene definido un valor por defecto en caso de no pasarse dicha prop.
- **estiloTxt:** Un objeto de estilo personalizado para aplicar al texto de la etiqueta. Es opciónal ya que también posee un valor por defecto.

Utiliza el hook *useState* para almacenar el valor del input en una variable de estado.
El componente define una función manejadora **onChangeText** que actualiza la entrada de estado local y llama a la función **onChange** pasada como prop.

Luego devuelve un elemento JSX que representa el campo de formulario de entrada.
El texto de la etiqueta se muestra utilizando un componente *Text* con el estilo personalizado.
El campo de entrada se muestra mediante un componente *TextInput* con el estilo personalizado. La propiedad *secureTextEntry* se establece en **isSecure** para habilitar la entrada segura si es necesario.
El controlador *onChangeText* se adjunta al evento **onChangeText** del campo de entrada.
Si se proporciona un mensaje de error, se muestra debajo del campo de entrada utilizando un componente de texto con el estilo personalizado.

### Loading

Es un componente que se muestra cada vez que se esperan las consultas a la base de datos. Contiene unicamente un elemento *Text* y un *ActivityIndicator* de *react-native*.

### MapPreview

Muestra una vista previa estática del mapa de una ubicación determinada.
El componente acepta unicamente la prop **location**, un objeto que contiene las coordenadas de latitud y longitud de la ubicación a mostrar en el mapa.
Construye una URL para que la API estática de Google Maps genere una imagen estática del mapa. La URL incluye los siguientes parámetros:
- **center:** Las coordenadas de latitud y longitud de la ubicación para centrar el mapa.
- **zoom:** El nivel de zoom del mapa.
- **size:** El tamaño de la imagen del mapa.
- **maptype:** El tipo de mapa a mostrar.
- **markers:** Un marcador para mostrar en el mapa en la ubicación especificada, con un color rojo y una etiqueta "Yo".
- **key:** La clave de la API de Google Maps (almacenada en la variable **googleMapsApiKey** e importada desde **database**).
La URL construida se almacena en la variable **mapPreviewUrl**.
El componente luego devuelve un elemento JSX que muestra la imagen estática del mapa.
La imagen del mapa se muestra mediante un componente *Image* con la propiedad *source* definida como **mapPreviewUrl**.

### MyStatusBar

Representa la barra de estado del dispositivo, usa el hook *useSelector* para obtener el usuario, y dependiendo de si existe o no cambia el estilo.

### OrderItem

Este componente devuelve una tarjeta de orden. Recibe la orden por parámetro y muestra la fecha de la compra seguida de una lista de los items comprados y el total de la compra.


### ProductItem

Muestra un producto con un título, una imagen y funciones de navegación.
El componente acepta dos props:
- **producto:** Un objeto que contiene los datos del producto, incluyendo el título y la miniatura.
- **navigation:** El objeto de navegación.
Utiliza tres hooks:
- **useWindowDimensions:** Devuelve las dimensiones actuales de la ventana.
- **useState:** Crea una variable de estado **portrait** para rastrear si el dispositivo está en modo vertical u horizontal.
- **useDispatch:** Devuelve la función de envío del almacén Redux.
Tambien hace uso de un efecto (*useEffect*) para actualizar la variable de estado **portrait** cada vez que cambian las dimensiones de la ventana.

Luego define la función **handleNavigate**, la cual se llama cuando se pulsa el elemento retornado por el componente. La función hace lo siguiente:
- Utiliza un dispatch para ejecutar **setItemSelected** desde **ShopSlice** y le envía el nombre del producto.
- Navega a la pantalla **ItemDetail** usando *navigation.navigate*, pasando el producto seleccionado como parámetro.

El componente devuelve un elemento JSX que muestra una tarjeta del producto. Se envuelve en un componente *Pressable* con un controlador de eventos *onPress* establecido en **handleNavigate**. El Pressable tiene un estilo condicional basado en el estado de **portrait**.
Dentro del *Pressable*, hay un componente *View* que contiene:
- Un componente *Text* que muestra el título del producto, con un estilo condicional basado en el estado de **portrait**.
- Un componente *Image* que muestra la miniatura del producto.

### RegisterForm

Este componente es una envoltura para elementos de formulario.

Es un *View* que contiente un título y otro elemento *View* que cumple la funcion de regla horizontal (hr).

Acepta dos props:
- **children:** Los elementos del formulario que se renderizarán dentro del componente.
- **titulo:** El título a mostrar en la parte superior del formulario.

Devuelve un elemento JSX que muestra el formulario.

El formulario se envuelve en un componente *View* y el título se muestra utilizando un componente *Text*.
El elemento **children** se muestra debajo del elemento **hr** y contiene los campos y botones del formulario.

### Search

Este componente proporciona una barra de búsqueda con campo de entrada, botón de búsqueda y botón de borrar.

Acepta dos props:
- **onBúsqueda:** Una función que se ejecuta cuando se pulsa el botón de búsqueda. Recibe la palabra clave de búsqueda actual como argumento. Por defecto es una función vacía.
- **error:** Un mensaje de error que se mostrará debajo del campo de entrada. Por defecto es una cadena vacía.

Utiliza el hook *useState* para gestionar el estado de la palabra clave de búsqueda (**keyword**).

Devuelve un elemento JSX que muestra la barra de búsqueda, la cual está envuelta en un componente *View*. El campo de entrada es un componente *TextInput* con un valor vinculado al estado de **keyword**.
Si se proporciona un mensaje de error, se muestra debajo del campo de entrada utilizando un componente *Text*.
El botón de búsqueda es un *Pressable* con un icono importado desde *FontAwesome5* que llama a la función **onSearch** con la palabra clave actual cuando se pulsa.
El botón de borrar es otro *Pressable* con otro icono de *FontAwesome6* que borra el campo de entrada estableciendo el estado de la palabra clave en una cadena vacía cuando se pulsa.

### SubmitButton

Es un botón personalizado con un estilo específico, recibe una función y un texto por parámetros. Luego devuelve un elemento *TouchableOpacity* con un *onPress* que ejecuta la funcion recibida.

### Subtitle

Este componente se utiliza en todas las pantallas donde se necesite un subtítulo. Recibe el objeto *navigation*, un texto y un objeto de estilos opcional.

Devuelve un contenedor con un *Pressable* con la función *goBack()* de *navigation* junto al titulo recibido por props.

## Database

- **googleMaps.js:** Contiene la exportación de la API Key de Google Maps que se utilizará para mostrar la ubicación.
- **realTimeDatabase.js:** Exporta la URL de la base de datos de firebase del proyecto.
- **users.js:** Contiene dos exportaciones, la primera es la API Key de la autenticación de usuarios y la segunda es la URL de la base. Estos se utilizarán para crear la base de usuarios en **authServices**.

## Features

### CartSlice

Es un slice de Redux que gestiona el estado de un carrito de la compra. Se crea usando la función *createSlice* de la librería *@reduxjs/toolkit*.
El estado inicial del slice del carrito es un objeto con las siguientes propiedades:
- **user:** El ID del usuario conectado.
- **updatedAt:** La marca de tiempo de la última actualización del carrito.
- **total:** El coste total de los artículos del carrito, inicialmente igual a null.
- **items:** Un array de artículos, inicialmente vacío.
El carrito tiene tres reductores:
- **addCartItem:** Este reductor añade un nuevo artículo al carrito o actualiza la cantidad de un artículo existente. Toma un objeto *payload* con las siguientes propiedades:
    - **id:** El ID del producto.
    - **cantidad:** La cantidad del producto a añadir. Si el producto ya está en el carrito, actualiza la cantidad y recalcula el coste total. Si el producto no está en el carrito, lo añade y calcula el coste total. Actualiza la marca de tiempo **updatedAt** y devuelve el estado actualizado.
- **removeCartItem:** Este reductor elimina un artículo del carrito. Toma un objeto *payload* con la propiedad **id** del producto a eliminar. Filtra el artículo del array de artículos y recalcula el coste total. Si el carrito está vacío, establece el total en null. Actualiza la marca de tiempo **updatedAt** y devuelve el estado actualizado.
- **deleteCart:** Este reductor devuelve el carro a su estado inicial. Establece el array de artículos en una matriz vacía y el total en null. Devuelve el estado actualizado.

### CounterSlice

Es un slice de Redux que gestiona el estado de un contador. Proporciona una forma de aumentar, disminuir, establecer y restablecer el valor del contador.
Es slice se crea usando *createSlice* de *toolkit*. El estado inicial del contador es un objeto con una única propiedad, *value*. El valor inicial del contador es 0.

El contador dispone de cuatro reductores para gestionar el estado del contador:
- **increment:** Incrementa el valor del contador en 1.
- **decrement:** Disminuye el valor del contador en 1.
- **incrementToAmount:** Establece el valor del contador a una cantidad específica recibida por parámetro.
- **resetCounter:** Restablece el valor del contador a 0.

### ShopSlice

Este slice gestiona el estado de la tienda. Proporciona una forma de buscar la categoría o el artículo seleccionados.
El estado inicial de la tienda es un objeto con dos propiedades:
- **categorySelected:** La categoría seleccionada, establecida inicialmente como una cadena vacía.
- **ItemSelected:** El artículo seleccionado, definido inicialmente como una cadena vacía.

La sección de la tienda incluye dos reductores para gestionar el estado de la tienda:

- **setCategorySelected:** Establece el estado de **categorySelected** al valor recibido por parámetro.
- **setItemSelected:** Establece el estado de **ItemSelected** al valor recibido por parámetro.

### UserSlice

Exportado como **authSlice**, es un slice que gestiona el estado de autenticación de la aplicación. Proporciona una forma de almacenar y gestionar la información de autenticación del usuario.
El estado inicial del slice **auth** es un objeto con tres propiedades:
- **user:** El email del usuario autenticado, inicialmente establecido en null.
- **token:** El token de autenticación, inicialmente igual a null.
- **localId:** El ID local del usuario autenticado, inicialmente establecido en null.

Proporciona tres reductores para gestionar el estado de autenticación:
- **setUser:** Establece el usuario autenticado actualizando los valores del estado por los datos recibidos por parámetros. 
- **clearUser:** Borra el usuario autenticado y la información de autenticación asociada, devolviendo todo al estado inicial.
- **setCameraImage:** Actualiza la imagen de perfil del usuario.
