# node server.js 
ejecuta con el contenedor en memoria

# node server mongodb
ejecuta con el contenedor en mongoDB

# node server firebase
ejecuta con el contenedor en firebase

## agregados

Le agregué una capa de servicios 

### router > controller > services > daos > contenedor > db

* La capa de servicios controla si hay un error en la peticion no hace ninguna consulta a la Db,
* pero si no hay ningun error hará la lógica, para que en lo posible los contenedores solo hagan peticiones sencillas a la DB