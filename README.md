
# Practica 7: DSIkea
<sup>José Javier Ramos Carballo, [alu0101313313@ull.edu.es](https://github.com/alu0101313313)  
Daniel Marhuenda Guillén, [alu0101487731@ull.edu.es](https://github.com/alu0101487731)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/actions/workflows/node.js.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp)

## Introducción

En esta práctica nos encargamos de gestionar una tienda de muebles, por ello, nos encargamos de diferentes tareas, como pueden ser:

- Gestionar nuestro stock disponible: revisar los muebles que tenemos y sus cantidades, añadimos o retiramos muebles
- Realizamos transacciones: asi como la compra/venta de muebles con clientes y/o proveedores
  - Factuaracion: generamos facturas que pueden revisar los diferentes detalles de la transaccion


## Implementación Conceptual

Empezamos por crear las clases mas elementales en nuestro programa: **Mueble**, **Persona**, **Transaccion**, **Stock**.

En la clase **Mueble**, nos dedicamos a dar formato sobre los muebles que manejamos, definiendo sus principales caracteristicas por unidad.

En la clase **Persona**, tratamos de definir los tipos de personas que se podrian dirigir de forma externa a nuestro programa, y en ello encontramos 2 perfiles: _Clientes_ y _Proveedores_.  
Los _Clientes_ podran comprar muebles de nuestro stock, o en caso contrario, vendernos muebles que tengamos registrados en nuestro stock, mientras que los _proveedores_ nos suministraran muebles que nosotros venderemos, o en caso contrario, adquiriran muebles que no vamos a vender.

En la clase **Transaccion**, nos encargamos de definir las principales caracteristicas que existen en una transaccion: muebles, sus precios y cantidades, clientes o proveedores con los que interactuamos, fecha de la transacion, etc...

En la clase **Stock**, se manejara nuestros muebles, de forma que almacenara que muebles existen en nuestro stock y su cantidad, ademas de tratar las transacciones en ella.

A parte de estas cuatro clase principales, incluimos mas ficheros relevantes para el funcionamiento del programa.

En el fichero **_index.ts_** proporcionamos una interfaz grafica interatuable sobre nuestro programa, en ella nos encargamos de dirigir sobre las diferentes acciones que se pueden realizar en nuestro programa relativo a nuestros clientes, proveedores, muebles, transacciones, stock, etc...

Ademas contamos con el fichero **_jsonStock.ts_** que nos facilita es uso de ficheros.json sobre las diferentes transacciones que realizamos sobre nuestro productos.


## Implementación sobre el código


Las clases Mueble, Cliente y Proveedor no tienen funciones propias más que el constructor ya que no se trabajará modificándolas, sólo guardándolas.

En la clase Stock creamos las funciones privadas AddMueble y QuitarMueble, estas funciones reciben el ID del mueble con el que se trabaja y añaden o quitan una unidad de dicho mueble, si no lo encuentrar dan un error por no existir este.

La función CrearMueble servirá para añadir un nuevo mueble al Stock, primero comprueba que no existía de antes, y en ese caso lo añade a las listas de stock y de muebles.

Para los clientes tenemos las funciones Vender y DevolverCliente, como dicen sus nombres, estas sirven para registrar la venta o la devolución por parte de un cliente, llamando a la función QuitarMueble o AddMueble respectivamente y añadiendolo a la lista de transacciones.

Lo mismo ocurre con los proveedores, las clases Vender y DevolverCliente son iguales a DevolverProveedor y Comprar respectivamente, solamente cambiando donde dice cliente por proveedor.

Esto último se podría hacer con menos código usando una clase padre Persona con Proveedor y Cliente hererando de ella, pero me parecía poco intuitivo que si realizaramos una devolución a un proveedor usaramos la función Vender. Preguntaré esto en la tutoría


## Conclusiones

Hemos realizado gran parte del ejercicio planteado pero vamos a comentar sobre los diferentes puntos que no pudimos desarrollar completamente:

- Aplicamos las interfaces interactivas del paquete _inquirer_ pero no terminamos de adaptar todos los submenus referente a las posibles acciones a tomar en el programa
- Nos encargamos de aplicar el paquete _lowdb_ para almacenar los clientes, proveedores y muebles en ellos, pero no nos dio tiempo de poder modificar dichos ficheros
- Nos encargamos de desarrollar bastantes tests sobre el programa, pero mucha parte del codigo dado su implementacion, no supimos como comprobarla mediante tests

## Bibliografía

Para este ultimo punto, he recopilado algunas de las paginas que me han sido utiles para los ejercicos de la _práctica_:

1. **Aprendizaje sobre _inquirer_ y _lowdb_:** [https://learning-oreilly-com.accedys2.bbtk.ull.es/library/view/essential-typescript-4/9781484270110/html/481342_2_En_1_Chapter.xhtml](https://learning-oreilly-com.accedys2.bbtk.ull.es/library/view/essential-typescript-4/9781484270110/html/481342_2_En_1_Chapter.xhtml)
