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



export class Stock{
    
    private stock:TipoCantidad[];
    private muebles:Mueble[];
    private transacciones:Transaccion[];
    private clientes:Persona[];
    private proveedores:Persona[];


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
        return new Mueble(0, "dummy", "dummy", "nada", [0], 0);
    }

    /**
     * Añade una unidad de mueble al stock.
     * @param Mueble Mueble a añadir
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
     * Elimina una unidad de mueble del stock
     * @param ID Mueble a eliminar
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
     * Cliente compra un mueble, se elimina uno del stock y se guarda la transacción.
     * @param cliente Cliente que está comprando.
     * @param ID Mueble que se va a vender.
     */
    public RemoverDeStock(cliente:Persona, IDs:TipoCantidad[], fecha:Date):boolean{

        //Sección de errores
        for(var ID of IDs){
            if(this.GetMueble(ID.MuebleID).Nombre == "dummy") return false;
            if(ID.Cantidad > this.GetCantidad(ID.MuebleID) || ID.Cantidad <= 0) return false;
        }

        
        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += this.GetMueble(ID.MuebleID).Precio;
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
     * Cliente realiza una devolución de un mueble y se guarda la transacción.
     * @param cliente Cliente que está devolviendo.
     * @param ID Mueble que se va a devolver.
     */
    public AñadiendoDeStock(cliente:Persona, IDs:TipoCantidad[], fecha:Date):boolean{

        //Sección de errores
        for(var ID of IDs){
            if(this.GetMueble(ID.MuebleID).Nombre == "dummy") return false;
            if(ID.Cantidad <= 0) return false;
        }

        //Añadir coste al total y quitarlo del stock
        let coste:number = 0;
        for(var ID of IDs){
            coste += this.GetMueble(ID.MuebleID).Precio;
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

    /**
     * Crea informes varios sobre el stock o las ventas
     * @param tipoinforme Tipo de informe que se quiere ver:
     * 0: Mueble más vendido
     * 1: Dinero ganado en ventas - Dinero perdido por devoluciones
     * 2: Dinero gastado en compras - Dinero devuelto por devoluciones
     * @param ID ID en caso de mirar mueble o persona específica
     * @returns 
     */
    public Informes(tipoinforme:number, ID:number = 0):string{

        if(tipoinforme == 0){
            
        }else if(tipoinforme == 1){

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