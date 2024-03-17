import { Mueble } from "./mueble.js";
import { Persona } from "./persona.js";
import { TipoCantidad } from "./tipoCantidad.js";
import { Transaccion } from "./transacccion.js";

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
    
    private stock:TipoCantidad[];
    private muebles:Mueble[];
    private transacciones:Transaccion[];
    private clientes:Persona[];
    private proveedores:Persona[];

		/**
		 * funcion que devuelve la cantidad de muebles 
		 * @param ID el identificador del mueble
		 * @returns la cantidad del mueble
		 */
    private GetCantidad(ID:number):number{
        for(var i of this.stock){
            if(ID == i.MuebleID){
                return i.Cantidad;
            }
        }
        return -1;
    }

    /**
     * Devuelve un mueble a partir de su ID única
     * @param ID Mueble que se está buscando
     * @returns Mueble buscado
     */
    //Otra función para buscar por nombre, tipo y descripción, usar lenguajes regulares ahí, devolver Mueble[]
    //Quiero que sea private pero debe ser publico para hacer test
    
    public GetMueble(ID:number):Mueble{
        for(var i of this.muebles){
            if(i.ID == ID){
                return i;
            }
        }

        //Mueble no encontrado
        return new Mueble(0, "dummy", "dummy", ["nada"], [0], 0);
    }

		/**
		 * Añade una unidad de mueble al stock
		 * @param ID el identificador del mueble a añadir
		 * @returns true si el mueble ha sido añadido correctamente, false en otro caso
		 */
    private AddMueble(ID:number):boolean{
        for(var i of this.stock){
            if(i.MuebleID == ID){
                i.Cantidad++;
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
    private QuitarMueble(ID:number):boolean{
        for(var i of this.stock){
            if(i.MuebleID == ID){
                if(i.Cantidad > 0){
                    i.Cantidad--;
                    return true;
                }else{
                    console.log("No quedan unidades de ese mueble");
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
            if(i.MuebleID == mueble.ID){
                existe = true;
            }
        }

        if(existe == false){
            this.stock.push({MuebleID:mueble.ID, Cantidad:1});
            this.muebles.push(mueble);
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
    public RemoverDeStock(cliente:Persona, IDs:TipoCantidad[], fecha:Date): boolean{

        //Sección de errores
        for(var ID of IDs){
            if(this.GetMueble(ID.MuebleID).nombre == "dummy") return false;
            if(ID.Cantidad > this.GetCantidad(ID.MuebleID) || ID.Cantidad <= 0) return false;
        }
        
        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += this.GetMueble(ID.MuebleID).precio;
            this.QuitarMueble(ID.MuebleID);
        }
        
        //La persona es un cliente, cambiar por BuscarCliente
        //Poner que pierdo varios y cobrar varios 
        for(var i of this.clientes){
            if(cliente.ID == i.ID){
                this.transacciones.push({Persona:"Cliente", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
                return true;
            }
        }

        //La persona es un proveedor, cambiar por BuscarProveedor
        for(var i of this.proveedores){
            if(cliente.ID == i.ID){
                this.transacciones.push({Persona:"Proveedor", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
                return true;
            }
        }

        //No se encontró la persona
        return false;
        
    }

    /**
		 * Una función que se encarga de añadir una cantidad de muebles al stock
		 * @param cliente señala a la persona a la que procedemos comprarle muebles
		 * @param IDs el identificador de los muebles a comprar
		 * @param fecha la fecha de la transacción
		 * @returns true si la adquisición ha concluido correctamente, false en otro caso
		 */
    public AñadiendoDeStock(cliente:Persona, IDs:TipoCantidad[], fecha:Date):boolean{

        //Sección de errores
        for(var ID of IDs){
            if(this.GetMueble(ID.MuebleID).nombre == "dummy") return false;
            if(ID.Cantidad <= 0) return false;
        }

        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += this.GetMueble(ID.MuebleID).precio;
            this.AddMueble(ID.MuebleID);
        }

        //La persona es un cliente, cambiar por BuscarCliente
        for(var i of this.clientes){
            if(cliente.ID == i.ID){
                this.transacciones.push({Persona:"Cliente", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Obtener", Fecha:fecha, Importe:coste});
                return true;
            }
        }

        //La persona es un proveedor, cambiar por BuscarProveedor
        for(var i of this.proveedores){
            if(cliente.ID == i.ID){
                this.transacciones.push({Persona:"Proveedor", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Obtener", Fecha:fecha, Importe:coste});
                return true;
            }
        }

        //No se encontró la persona.
        return false;
    }
    //Ordenacion de menor a mayor
    public Ordenacion(lista:TipoCantidad[], criterio:"Precio"|"Nombre"):TipoCantidad[]{
        //[elements[0], elements[3]] = [elements[3], elements[0]];

        if(criterio == "Precio"){
        let MenorElemento = {Pos:0, Criterio:0};

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
                for(var venta of transacccion.Cantidades){

                    encontrado = false;
                    for(let i = 0; i < Cantidades.length; i++){
                        if(venta.MuebleID == Cantidades[i].MuebleID){
                            Cantidades[i].Cantidad += venta.Cantidad;
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
    public BuscarCliente():Persona{
        return this.clientes[0];
    }

    //Buscar proveedor por nombre, contacto o dirección
    public BuscarProveedor():Persona{
        return this.proveedores[0];
    }

}