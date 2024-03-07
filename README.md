
# Practica 7: DSIkea
<sup>José Javier Ramos Carballo, [alu0101313313@ull.edu.es](https://github.com/alu0101313313)  
<sup>Daniel Marhuenda Guillén, [alu0101487731@ull.edu.es](https://github.com/alu0101487731)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupp/actions/workflows/node.js.yml)

## Introducción
En esta tarea hemos tenido que hacer el gestor de una tienda de muebles, creando las clases mueble, cliente, proveedor y stock:

Mueble tiene su ID único, un nombre común, una descripción, el material del que está hecho, sus dimenciones y su precio. Nada interesante que comentar en este respecto.

Cliente y Proveedor tienen su ID único, su nombre, su contacto y su dirección, no hay diferencias entre las dos clases.

En la clase Stock está todo el trabajo, esta clase tiene tres listas: el stock, dónde se guarda cuantas unidades hay de cada mueble por su ID para seguridad(No nos parecía buena idea que en devolución el supuesto cliente pudiera crear un nuevo mueble propio), muebles, donde se guardan los propios objetos de tipo mueble, y transacciones, donde se guardan las transacciones realizadas.



## Tareas Previas

- [] Tarea 1
- [] Tarea 2


## Ejercicio

Las clases Mueble, Cliente y Proveedor no tienen funciones propias más que el constructor ya que no se trabajará modificándolas, sólo guardándolas.

En la clase Stock creamos las funciones privadas AddMueble y QuitarMueble, estas funciones reciben el ID del mueble con el que se trabaja y añaden o quitan una unidad de dicho mueble, si no lo encuentrar dan un error por no existir este.

La función CrearMueble servirá para añadir un nuevo mueble al Stock, primero comprueba que no existía de antes, y en ese caso lo añade a las listas de stock y de muebles.

Para los clientes tenemos las funciones Vender y DevolverCliente, como dicen sus nombres, estas sirven para registrar la venta o la devolución por parte de un cliente, llamando a la función QuitarMueble o AddMueble respectivamente y añadiendolo a la lista de transacciones.

Lo mismo ocurre con los proveedores, las clases Vender y DevolverCliente son iguales a DevolverProveedor y Comprar respectivamente, solamente cambiando donde dice cliente por proveedor.

Esto último se podría hacer con menos código usando una clase padre Persona con Proveedor y Cliente hererando de ella, pero me parecía poco intuitivo que si realizaramos una devolución a un proveedor usaramos la función Vender. Preguntaré esto en la tutoría


## Conclusiones



## Bibliografía

Para este ultimo punto, he recopilado algunas de las paginas que me han sido utiles para los ejercicos de la _práctica_:

1. **ref1** []()
2. **ref2** []()
3. **ref3** []()
