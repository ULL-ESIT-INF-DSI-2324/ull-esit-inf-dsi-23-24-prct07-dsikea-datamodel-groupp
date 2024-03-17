import { Mueble } from "./mueble.js";
import { Stock } from "./stock.js";
import { jsonStock } from "./jsonStock.js"
import { Persona } from "./persona.js"
import inquirer from 'inquirer';
import { Transaccion } from "./transacccion.js";


let StockInicial: Mueble[] = [
  new Mueble( 1, "garugabksv", "Mesa pequeña negra", ["madera"], [80, 160, 50], 38.99), 
  new Mueble( 2, "ksvis", "Comoda negra tamaño estandar", ["madera", "acero"], [30, 62, 70], 54.99), 
  new Mueble( 3, "loqufdca", "Sofa-cama grande con forma de L", ["cuero", "espuma de poliuretano"], [220, 325, 91], 644.99), 
  new Mueble( 4, "ewsqv", "Silla de oficina con tapiz blanco", ["acero", "piel natural"], [66, 60, 108], 67.99), 
  new Mueble( 5, "apoiuwe", "Mesa de noche de madera clara", ["madera"], [38, 42, 56], 74.99), 
  new Mueble( 6, "piwuu", "Cuadro portaretrato de pequeñas dimesiones", ["pvc", "cristal"], [2.40, 10, 15], 14.99), 
  new Mueble( 7, "vuqloa", "Espejo de tamaño cuerpo completo", ["acero", "cristal"], [68, 5.2, 180], 244.99), 
  new Mueble( 8, "swyia", "Cama individual tamaño estandar", ["polialgodon", "acero", "madera"], [80, 53, 190], 238.99), 
  new Mueble( 9, "armfwa", "Escritorio de grandes dimensiones", ["madera", "metal"], [168, 125, 73], 157.99), 
  new Mueble(10, "regnskur", "Lampara para techo ovalado verde", ["madera"], [50, 70, 30], 24.99), 
  new Mueble(11, "skadis", "Tablero perforado para colocar cosas", ["fibras", "pinturas acrilicas"], [12, 13, 14], 18.99), 
  new Mueble(12, "plafkq", "Silla acolchada de tonos claros ", ["piel sintetica"], [62, 58, 102], 27.99), 
  new Mueble(13, "kosv", "Cama de matrimonio de matrimonio 200x200", ["polialgodon", "acero", "madera"], [200, 56, 220], 538.99), 
  new Mueble(14, "aariqa", "Lampara de pie negra", ["acero"], [32, 54, 147], 31.99), 
  new Mueble(15, "gjatta", "Caja morada para almacenar enseres", ["poliester"], [18, 25, 15], 6.99), 
  new Mueble(16, "pluttis", "Reloj de pared estilo clasico", ["cristal", "pvc"], [6.8, 28, 28], 4.99), 
  new Mueble(17, "opotsoa", "Jarron de cristal ", ["cristal"], [12, 12, 17], 2.99), 
  new Mueble(18, "mydale", "Esctructura de madera para literas", ["madera"], [97, 206, 157], 289.99), 
  new Mueble(19, "storhaga", "Lampara de mesa", ["acero"], [15, 15, 44], 54.99), 
  new Mueble(20, "nymane", "Espejo de baño ", ["cristal"], [3.1, 50, 60], 13.99), 
];

let clientesIniciales: Persona[] = [
  new Persona( 1, "Cliente1", "correo1@gmail.com", "calle cosa nº1"), 
  new Persona( 2, "Cliente2", "correo2@gmail.com", "calle cosa nº2"),  
  new Persona( 3, "Cliente3", "correo3@gmail.com", "calle cosa nº3"),  
  new Persona( 4, "Cliente4", "correo4@gmail.com", "calle cosa nº4"),  
  new Persona( 5, "Cliente5", "correo5@gmail.com", "calle cosa nº5"),  
  new Persona( 6, "Cliente6", "correo6@gmail.com", "calle cosa nº6"),  
  new Persona( 7, "Cliente7", "correo7@gmail.com", "calle cosa nº7"),  
  new Persona( 8, "Cliente8", "correo8@gmail.com", "calle cosa nº8"),  
  new Persona( 9, "Cliente9", "correo9@gmail.com", "calle cosa nº9"),  
  new Persona(10, "Cliente10", "correo10@gmail.com", "calle cosa nº10"),  

];

let ProveedoresIniciales: Persona[] = [
  new Persona( 1, "Proveedor1", "correo1@gmail.com", "avenida cosa nº1"),
  new Persona( 2, "Proveedor2", "correo2@gmail.com", "avenida cosa nº2"),
  new Persona( 3, "Proveedor3", "correo3@gmail.com", "avenida cosa nº3"),
  new Persona( 4, "Proveedor4", "correo4@gmail.com", "avenida cosa nº4"),
  new Persona( 5, "Proveedor5", "correo5@gmail.com", "avenida cosa nº5"),
  new Persona( 6, "Proveedor6", "correo6@gmail.com", "avenida cosa nº6"),
  new Persona( 7, "Proveedor7", "correo7@gmail.com", "avenida cosa nº7"),
  new Persona( 8, "Proveedor8", "correo8@gmail.com", "avenida cosa nº8"),
  new Persona( 9, "Proveedor9", "correo9@gmail.com", "avenida cosa nº9"),
  new Persona(10, "Proveedor10", "correo10@gmail.com", "avenida cosa nº10"),
 
];

let TransacccionInicial: Transaccion[] = [
  new Transaccion(1, "Proveedor", [{mueble: new Mueble(21, "nymane", "Espejo de baño ", ["cristal"], [3.1, 50, 60], 13.99), cantidad: 1}], 0 , "Obtener", new Date(21-3-2001), 60)
]; 

let stockDisponible: Stock = new jsonStock(StockInicial, 10, clientesIniciales, ProveedoresIniciales, TransacccionInicial);

/*
function displayTodoList(): void {
  stockDisponible.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
*/

enum comandosPrincipales {
  Interactuar_clientes = "Interacturar con un cliente",
  Interactuar_proveedores = "Interacturar con un proveedor",
  Informes = "Consultar informes",
  Busquedas = "Realice busquedas sobre nuestro stock",
  Quit = "Quit"
}

enum comandosClientes {
  nuevo_cliente = "Cliente nuevo",
  // crear_cliente
  cliente_existente = "Cliente registrado",
  // buscar_cliente
    // vender mueble
    // devolver mueble
  Quit = "Quit"
}

enum comandosProveedores {
  nuevo_proveedor = "Proveedor nuevo",
    //crear proveedor
  proveedor_existente = "Proveedor registrado",
    //buscar proveedor
      // Comprar mueble
      // Añadir mueble existente
      // Añadir nuevo mueble 
  Quit = "Quit"
}

enum comandosBusquedas{
  Categoria_mueble = "Busqueda por una categoria de mueble concreta",
  Concreto_mueble = "Busqueda de un mueble en concreto", 
  Mueble_mas_vendidos = "Busqueda por los muebles mas vendidos",
  Ultimas_transacciones = "Busquedas por venta a clientes, compra a proveedores, fecha",
  Historico_persona = "Busquedas por persona concreta",
  Quit = "Quit"
}

enum comandosFiltros {
  
  Muebles = "Filtra sobre muebles", //(orden alfabetico y precio, ascendente o descendente)
      //nombre
      //tipo
      //descripcion
  Proveedor = "Filtra sobre proveedor", //(orden alfabetico y precio, ascendente o descendente)
      // nombre
      // contacto
      // direccion
  Cliente = "Filtra sobre cliente", //(orden alfabetico y precio, ascendente o descendente)
      // nombre
      // contacto
      // direccion
  Quit = "Quit"
}

function promptInteracturarClientes(): void {
  console.clear();
  inquirer.prompt({ type: "list", name: "command", message: "Nuevo cliente o cliente existente:", choices: Object.values(comandosClientes)})
  .then(answers => {
    switch(answers["command"]){
      case comandosClientes.nuevo_cliente:
        console.log("A")
        stockDisponible.crearCliente();
        //prompt_transaccion_cliente()
        //promptUser();
        break;
      case comandosClientes.cliente_existente:
      //buscar_cliente()
      //prompt_transaccion_cliente()  
      promptUser();
        break;
    }
  })
}

function promptInteracturarProveedores(): void {
  console.clear();
  inquirer.prompt({ type: "list", name: "interact", message: "Nuevo proveedor o proveedor existente:", choices: Object.values(comandosProveedores)})
  .then(answers => {
    switch(answers["interact"]){
      case comandosProveedores.nuevo_proveedor:
        //crear_proveedor()
        //prompt_transaccion_proveedor()
        promptUser();
        break;
      case comandosProveedores.proveedor_existente:
      //buscar_proveedor()
      //prompt_transaccion_cliente()  
      promptUser();
        break;
    }
  }) 
}

function promptInformes(): void {
  console.clear();
  inquirer.prompt({ type: "list", name: "informes", message: "Seleccione filtros de informes a buscar: ", choices: Object.values(comandosBusquedas)})
  .then(answers => {
    switch(answers["informes"]){
      case comandosBusquedas.Categoria_mueble:
        // buscador()
        promptUser();
        break;
      case comandosBusquedas.Concreto_mueble:
        // buscador()
        promptUser();
        break;
      case comandosBusquedas.Mueble_mas_vendidos:
        // buscador()
        promptUser();
        break;
      case comandosBusquedas.Ultimas_transacciones:
        // buscador()
        promptUser();
        break;
      case comandosBusquedas.Historico_persona:
        // buscador()
        promptUser();
        break;
    }
  }) 
}

function promptBusquedas(): void {
  console.clear();
  inquirer.prompt({ type: "list", name: "busquedas", message: "Seleccione filtro de busqueda en productos: ", choices: Object.values(comandosFiltros)})
  .then(answers => {
    switch(answers["busquedas"]){
      case comandosFiltros.Muebles:
        // console.out(todos los muebles y tal)
        // filtrar()
          // tipos de filtros: id, nombre, tipo, descripcion
        // ordenacion()
          // alfabetico o precio
          // ascendente o descendente
        // buscador()
        promptUser();
        break;
      case comandosFiltros.Proveedor:
        // console.out(todos los proveedores y tal)
        // filtrar()
          // tipos de filtros: nombre, contacto, direccion
        // buscador()
        promptUser();
        break;
      case comandosFiltros.Cliente:
        // console.out(todos los clientes y tal)
        // filtrar()
          // tipos de filtros: nombre, contacto, direccion
        // buscador()
        promptUser();
        break;
    }
  }) 
}

function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "Seleccione Accion: ",
    choices: Object.values(comandosPrincipales), 
  }).then(answers => {
    switch(answers["command"]){
      case comandosPrincipales.Interactuar_clientes:
        promptInteracturarClientes();
        break;
      case comandosPrincipales.Interactuar_proveedores:
        promptInteracturarProveedores();
        break;
      case comandosPrincipales.Informes:
        promptInformes();
        break;
      case comandosPrincipales.Busquedas:
        promptBusquedas();
        break;
    }
  })
}
promptUser();