import { Mueble } from "./mueble.js";
import { Persona } from "./persona.js";
import { Transaccion } from "./transacccion.js";
import { TipoCantidad } from "./tipoCantidad.js";
import inquirer from "inquirer";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";


/**
 * Cosas por hacer
 * Funciones BuscarCliente BuscarProveedor (Por expresiones regulares)
 * Funcion BuscarMueble información se podrá mostrar ordenada alfabéticamente y por precio, 
 * tanto ascendente como descendente, en ambos casos.
 * Informes, todos faltan, cuando alguno hecho porner aquí,
 * Inquirer.js y Lowdb
 * Documentación y Sonarcloud
 */


/**
 * @class Stock es la clase que gestiona el stock que tenemos en nuestro almacen
 * @param stock señala el conjunto de muebles que poseemos
 * @param muebles define cada mueble, sus propiedades, cantidades, etc...
 * @param transaccciones genera las transacciones sobre nuestro stock en caso de compra y/o venta
 * @param cliente señala un tipo de persona que puede comprar y/o vender productos de manera anomima
 * @param proveedores señala un tipo de persona que nos puede comprar y/o vender productor a traves de una empresa 
 */
export class Stock{
    
    protected stock = new Map<number, Mueble>
    protected clientes = new Map<number, Persona>
    protected proveedores = new Map<number, Persona>
    private transacciones = new Map<number, Transaccion>

    constructor(public stock_: Mueble[] = [], 
        public clientes_: Persona[] = [], public proveedores_: Persona[] = [], public transaccion_: Transaccion[] = []){
        clientes_.forEach(cliente => this.clientes.set(cliente.ID,cliente));
        proveedores_.forEach(proveedor => this.proveedores.set(proveedor.ID, proveedor));
        transaccion_.forEach(transaccion => this.transacciones.set(transaccion.ID, transaccion))
      }

		/**
		 * funcion que devuelve la cantidad de muebles 
		 * @param ID el identificador del mueble
		 * @returns la cantidad del mueble
		 */
    private GetCantidad(mueble:Mueble):number{
        if(this.stock.has(mueble.ID)){
            return this.stock.get(mueble.ID)?.cantidad as number;
        }
        
        return -1;
    }

    public GetMueble(id:number){
        return this.stock.get(id) as Mueble;
    }

    public GetClienteID():number{
        let result:number = 0;
        while(true){
            result++;
            if(!this.clientes.has(result)) break;
        }
        return result;
    }
    public GetProveedorID():number{
        let result:number = 0;
        while(true){
            result++;
            if(!this.proveedores.has(result)) break;
        }
        return result;
    }
    public GetTransaccionID():number{
        let result:number = 0;
        while(true){
            result++;
            if(!this.transacciones.has(result)) break;
        }
        return result;
    }
    public GetMuebleID():number{
        let result:number = 0;
        while(true){
            result++;
            if(!this.stock.has(result)) break;
        }
        return result;
    }

    crearCliente():Persona{
        console.clear();

        inquirer.prompt([
          { type: "input", 
            name: "user", 
            message: "Nombre nuevo cliente: ", 
            },

          { type: "input", 
            name: "direction", 
            message: "Direccion nuevo cliente: ", 
            },

          { type: "input", 
            name: "conctact", 
            message: "Contacto nuevo cliente: ", 
            }
        ])
        .then(answers => {

          let nuevoCliente = new Persona(this.GetClienteID(), answers.user, answers.conctact, answers.direction);
          //console.log("No dummy");
          return nuevoCliente;
        })
        //console.log("Imprimir dummy");
        return new Persona(0, "dummy", "dummy", "dummy");
      }
    

		/**
		 * Añade una unidad de mueble al stock
		 * @param ID el identificador del mueble a añadir
		 * @returns true si el mueble ha sido añadido correctamente, false en otro caso
		 */
    private AddMueble(ID:number, cantidad:number):boolean{
        for(var i of this.stock){
            if(i[0] == ID){
                i[1].cantidad += cantidad;
                return true;
            }
        }

        console.log("Mueble no encontrado");
        return false;
    }   
    
		/**
		 * Eleminia una uidad de mueble del stock
		 * @param ID el identificador del mueble a eliminar
		 * @returns true si se ha podido eliminar correctamente, false en otro caso
		 */
    private QuitarMueble(ID:number, cantidad:number):boolean{
        for(var i of this.stock){
            if(i[0] == ID){
                if(i[1].cantidad >= cantidad){
                    i[1].cantidad -= cantidad;
                    return true;
                }else{
                    console.log("No quedan suficientes unidades de ese mueble");
                    return false;
                }
            }
        }
        console.log("Mueble no encontrado");
        return false;
    }


    /**
     * Añadir nuevo mueble al stock.
     * @param mueble Mueble a añadir.
     */
    //Poner booleano por si pudo crear el mueble o no

		/**
		 * Funcion que genera un nuevo tipo de mueble y añade una unidad al stock
		 * @param mueble señala el nuevo mueble a crear 
		 * @returns true si la creacion del mueble ha sido correcta, falso en otro caso
		 */
    public CrearMueble(mueble:Mueble):boolean{
        let existe:boolean = false;

        for(var i of this.stock){
            if(i[0] == mueble.ID){
                existe = true;
            }
        }

        if(existe == false){
            this.stock.set(this.GetMuebleID(), mueble);
            return true;
        }else{
            return false;
        }
    }

    /**
		 * Una función que se encarga de retirar una cantidad de muebles de stock
		 * @param cliente señala a la persona a la que procedemos venderle nuestros productos
		 * @param IDs el identificador de los muebles a vender
		 * @param fecha la fecha de la transacción
		 * @returns true si la retirada ha concluido correctamente, false en otro caso
		 */
    public RemoverDeStock(persona:Persona, tipopersona:"Cliente"|"Proveedor", IDs:TipoCantidad[], fecha:Date): boolean{

        //Sección de errores
        for(var ID of IDs){
            if(ID.cantidad > this.GetCantidad(ID.mueble) || ID.cantidad <= 0) return false;
        }
        
        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += ID.mueble.precio;
            this.QuitarMueble(ID.mueble.ID, ID.cantidad);
        }
        
        let id:number = 0;
        if(tipopersona == "Cliente"){
            id = this.GetClienteID();
        }else{
            id = this.GetProveedorID();
        }
        this.transacciones.set(id, {ID:id, Persona:tipopersona, Cantidades:IDs, PersonaID:persona.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
        return true;
        
    }

    /**
		 * Una función que se encarga de añadir una cantidad de muebles al stock
		 * @param cliente señala a la persona a la que procedemos comprarle muebles
		 * @param IDs el identificador de los muebles a comprar
		 * @param fecha la fecha de la transacción
		 * @returns true si la adquisición ha concluido correctamente, false en otro caso
		 */
    public AñadiendoDeStock(persona:Persona, tipopersona:"Cliente"|"Proveedor", IDs:TipoCantidad[], fecha:Date):boolean{

        //Sección de errores
        for(var ID of IDs){
            if(ID.cantidad <= 0) return false;
        }

        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += ID.mueble.precio;
            this.AddMueble(ID.mueble.ID, ID.cantidad);
        }

        let id:number = 0;
        if(tipopersona == "Cliente"){
            id = this.GetClienteID();
        }else{
            id = this.GetProveedorID();
        }
        this.transacciones.set(id, {ID:id, Persona:tipopersona, Cantidades:IDs, PersonaID:persona.ID, Accion:"Obtener", Fecha:fecha, Importe:coste});
        return true;
    }
    //Ordenacion de menor a mayor
    public Ordenacion(lista:TipoCantidad[], criterio:"Precio"|"Nombre"):TipoCantidad[]{
        //[elements[0], elements[3]] = [elements[3], elements[0]];

        if(criterio == "Precio"){
        let MenorElemento = {Pos:0, Criterio:0};

        for(let i = 0; i < lista.length-1; i++){
            MenorElemento = {Pos:i, Criterio:lista[i].cantidad};

            for(let j = i+1; j < lista.length; j++){
                if(lista[j].cantidad < MenorElemento.Criterio){
                    MenorElemento = {Pos:j, Criterio:lista[j].cantidad};
                }
            }
            [lista[i], lista[MenorElemento.Pos]] = [lista[MenorElemento.Pos], lista[i]];
        }
    }
        /*
        else if(criterio == "Nombre"){
            let MenorElemento = {Pos:0, Criterio:""};
    
            for(let i = 0; i < lista.length-1; i++){
                MenorElemento = {Pos:i, Criterio:lista[i].Cantidad};
    
                for(let j = i+1; j < lista.length; j++){
                    if(lista[j].Cantidad < MenorElemento.Criterio){
                        MenorElemento = {Pos:j, Criterio:lista[j].Cantidad};
                    }
                }
                [lista[i], lista[MenorElemento.Pos]] = [lista[MenorElemento.Pos], lista[i]];
            }
            }
            */

        return lista;
    }


    /**
     * Crea informes varios sobre el stock o las ventas
     * @param tipoinforme Tipo de informe que se quiere ver:
     * 0: Mueble más vendido
     * 1: Dinero ganado en ventas - Dinero perdido por devoluciones
     * 2: Dinero gastado en compras - Dinero devuelto por devoluciones
     * @param ID ID en caso de mirar mueble o persona específica
     * @returns 
     */
    public Informes(tipoinforme:string, parametros:any[]){

        if(tipoinforme == "Más vendido"){

            //Almacenar cuánto se ha vendido de cada mueble
            let Cantidades:TipoCantidad[] = [];
            let encontrado:boolean = false;

            for(var transacccion of this.transacciones){
                for(var venta of transacccion[1].Cantidades){

                    encontrado = false;
                    for(let i = 0; i < Cantidades.length; i++){
                        if(venta.mueble == Cantidades[i].mueble){
                            Cantidades[i].cantidad += venta.cantidad;
                            encontrado = true;
                        }
                    }
                    if(encontrado == false){
                        Cantidades.push(venta);
                    }

                }
            }

            //Buscar cuál fue el más vendido
            Cantidades = this.Ordenacion(Cantidades, "Precio");
            console.log(Cantidades);

        }else if(tipoinforme == "1"){

        }

        return "Tipo de informe no existente";
    }

    //Buscar cliente por nombre, contacto o dirección
    public BuscarCliente(criterio:"Nombre"|"Contacto"|"Direccion"|"ID", filtro:string|number):Persona{
        if(criterio == "Nombre"){
        for(var i of this.clientes){
            if(i[1].nombre == filtro){
                return i[1];
            }
        }
        }else if(criterio == "Contacto"){
            for(var i of this.clientes){
                if(i[1].contacto == filtro){
                    return i[1];
                }
            }
        }else if(criterio == "Direccion"){
            for(var i of this.clientes){
                if(i[1].direccion == filtro){
                    return i[1];
                }
            }
        }else if(criterio == "ID"){
            for(var i of this.clientes){
                if(i[1].ID == filtro){
                    return i[1];
                }
            }
        }   
        return this.clientes.get(1) as Persona;
    }

    //Buscar proveedor por nombre, contacto o dirección
    public BuscarProveedor(criterio:"Nombre"|"Contacto"|"Direccion"|"ID", filtro:string|number):Persona{
        if(criterio == "Nombre"){
            for(var i of this.proveedores){
                if(i[1].nombre == filtro){
                    return i[1];
                }
            }
            }else if(criterio == "Contacto"){
                for(var i of this.proveedores){
                    if(i[1].contacto == filtro){
                        return i[1];
                    }
                }
            }else if(criterio == "Direccion"){
                for(var i of this.proveedores){
                    if(i[1].direccion == filtro){
                        return i[1];
                    }
                }
            }else if(criterio == "ID"){
                for(var i of this.proveedores){
                    if(i[1].ID == filtro){
                        return i[1];
                    }
                }
            }   
            return this.proveedores.get(1) as Persona;
    }

}