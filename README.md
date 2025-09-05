# basicAPI-CRUD
Práctica realizada para entender los conceptos fundamentales de Node.js y Express

La consigna fue la siguiente:

Tenemos que desarrollar una pequeña API para gestionar un catálogo de productos de una tienda online usando Node.js y Express. El objetivo es que lean la documentación oficial de Express y Node.Js y  practiquen el uso de módulos nativos de Node, especialmente fs (para leer/escribir archivos) y path (para resolver rutas de forma segura). No usen base de datos: los datos deben persistir en un archivo JSON. 

Documentacion oficial:
- https://nodejs.org/docs/latest/api/
- https://expressjs.com/es/5x/api.html

Consideraciones:

- La API debe funcionar en el puerto 3000 y manejar la entidad “producto” con los campos: id (número), nombre (string) y precio (número).
- La información se guardará en un archivo llamado productos.json ubicado en el proyecto; usá path para construir la ruta al archivo y fs para leer y escribir su contenido.
- Cuando arranque el servidor, si el archivo no existe, crearlo con una lista vacía. Cada vez que se modifiquen los datos, asegurarse de guardar los cambios en el archivo.
Para generar el id, pueden tomar el id más alto y sumarle 1 (o, si no hay datos, empezar en 1).

Implementár los siguientes endpoints:

GET /productos: devuelve la lista completa de productos en formato JSON.

GET /productos/:id: devuelve el producto con ese id.

POST /productos: recibe un producto (nombre y precio) en el cuerpo de la petición, crea un nuevo registro asignando un id, lo guarda en el archivo y responde con el producto creado. Validar que los campos requeridos estén presentes y que “precio” sea numérico.

DELETE /productos/:id: elimina el producto con ese id.

Procuren user Express para las rutas y el parseo de JSON en el body; usen fs y path para toda operación con el archivo; serializá y deserializá con JSON.stringify y JSON.parse;

Datos de partida:
- Podés iniciar productos.json con dos o tres registros de ejemplo o dejarlo vacío; en ambos casos, la API debe funcionar igual. Asegurate de que el formato del archivo sea un arreglo JSON de productos con los campos especificados.

Pruebas sugeridas: probá en el navegador y con una herramienta como Postman o similar. Verificá que:

GET /productos devuelve un arreglo;

GET /productos/:id devuelve el producto (para eso reemplazar :id por el numero de id);

POST /productos crea un producto nuevo, con id incremental, y persiste en el archivo;

DELETE /productos/:id borra el producto y ya no aparece ni en GET por id ni en el listado;

Reiniciando el servidor, los datos siguen porque están en el archivo.

