import { Mueble } from "./mueble";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";

interface TipoCantidad {
    MuebleID:number;
    Cantidad:number;
}

interface Transaccion{
    Persona:"Cliente"|"Proveedor";
    MuebleID:number;
    PersonaID:number;
    Accion:"Obtener"|"Dar";
    Fecha:Date;
    Importe:number;
}

export class Stock{
    
    private stock:TipoCantidad[];
    private muebles:Mueble[]
    private transacciones:Transaccion[];
    private clientes:Cliente[];
    private proveedores:Proveedor[];

    /**
     * Devuelve un mueble a partir de su ID única
     * @param ID Mueble que se está buscando
     * @returns Mueble buscado
     */
    //Otra función para buscar por nombre, tipo y descripción, usar lenguajes regulares ahí, devolver Mueble[]
    private GetMueble(ID:number):Mueble|undefined{
        for(var i of this.muebles){
            if(i.ID == ID){
                return i;
            }
        }

        console.log("Mueble no encontrado");
        return undefined;
    }

    /**
     * Añade una unidad de mueble al stock.
     * @param Mueble Mueble a añadir
     */
    private AddMueble(ID:number):void{
        for(var i of this.stock){
            if(i.MuebleID == ID){
                i.Cantidad++;
                return;
            }
        }

        console.log("Mueble no encontrado");
        return;
    }   
    
    /**
     * Elimina una unidad de mueble del stock
     * @param ID Mueble a eliminar
     */
    private QuitarMueble(ID:number):void{
        for(var i of this.stock){
            if(i.MuebleID == ID){
                if(i.Cantidad > 0){
                    i.Cantidad--;
                    return;
                }else{
                    console.log("No quedan unidades de ese mueble");
                    return;
                }
            }
        }
        console.log("Mueble no encontrado");
        return;
    }

    /**
     * Añadir nuevo mueble al stock.
     * @param mueble Mueble a añadir.
     */
    public CrearMueble(mueble:Mueble):void{
        let existe:boolean = false;

        for(var i of this.stock){
            if(i.MuebleID == mueble.ID){
                existe = true;
            }
        }

        if(existe == false){
            this.stock.push({MuebleID:mueble.ID, Cantidad:1});
            this.muebles.push(mueble);
            return;
        }else{
            console.log("Se intentó añadir mueble ya existente");
            return;
        }
    }

    /**
     * Cliente compra un mueble, se elimina uno del stock y se guarda la transacción.
     * @param cliente Cliente que está comprando.
     * @param ID Mueble que se va a vender.
     */
    public Vender(cliente:Cliente, ID:number):void{
        //Sería poner fecha actual aquí.
        let fecha:Date = new Date(21-1-2024);
        let coste:number = this.GetMueble(ID).Precio;

        this.QuitarMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
    }

    /**
     * Cliente realiza una devolución de un mueble y se guarda la transacción.
     * @param cliente Cliente que está devolviendo.
     * @param ID Mueble que se va a devolver.
     */
    public DevolverCliente(cliente:Cliente, ID:number):void{
        //Sería poner fecha actual aquí.
        let fecha:Date = new Date(21-1-2024);
        let coste:number = this.GetMueble(ID).Precio;

        this.AddMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
    }


    /**
     * Proveedor vende un mueble, se añade uno al stock y se guarda la transacción.
     * @param proveedor Proveedor que está vendiendo.
     * @param ID Mueble que se va a comprar.
     */
    public Comprar(proveedor:Proveedor, ID:number):void{
        //Sería poner fecha actual aquí.
        let fecha:Date = new Date(21-1-2024);
        let coste:number = this.GetMueble(ID).Precio;

        this.AddMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:proveedor.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
    }

    /**
     * Realizamos una devolución de un mueble a un proveedor y se guarda la transacción.
     * @param proveedor Proveedor al que le devolvemos.
     * @param ID Mueble que se va a devolver.
     */
    public DevolverProveedor(proveedor:Proveedor, ID:number):void{
        //Sería poner fecha actual aquí.
        let fecha:Date = new Date(21-1-2024);
        let coste:number = this.GetMueble(ID).Precio;

        this.QuitarMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:proveedor.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
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
            let mas_vendido:TipoCantidad = {MuebleID:0, Cantidad:0};

            for(var i of this.stock){
                if(i.Cantidad >= mas_vendido.Cantidad) mas_vendido = i;
            }

            return ("Mueble más vendido: " + this.GetMueble(mas_vendido.MuebleID)?.Nombre);
        }

        return "Tipo de informe no existente";
    }

    //Buscar cliente por nombre, contacto o dirección
    public BuscarCliente():Cliente{
        return this.clientes[0];
    }

    //Buscar proveedor por nombre, contacto o dirección
    public BuscarProveedor():Proveedor{
        return this.proveedores[0];
    }

}