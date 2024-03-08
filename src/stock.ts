import { Mueble } from "./mueble";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Persona } from "./persona";

interface TipoCantidad {
    MuebleID:number;
    Cantidad:number;
}

interface Transaccion{
    Persona:"Cliente"|"Proveedor";
    MuebleIDs:number[];
    PersonaID:number;
    Accion:"Obtener"|"Dar";
    Fecha:Date;
    Importe:number;
}

export class Stock{
    
    private stock:TipoCantidad[];
    private muebles:Mueble[];
    private transacciones:Transaccion[];
    private clientes:Persona[];
    private proveedores:Persona[];

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
    public Vender(cliente:Cliente, ID:number, fecha:Date):boolean{
        if(this.GetMueble(ID).Nombre == "dummy") return false;

        //Sería poner fecha actual aquí.
        let coste:number = this.GetMueble(ID).Precio;

        this.QuitarMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
        return true;
    }

    /**
     * Cliente realiza una devolución de un mueble y se guarda la transacción.
     * @param cliente Cliente que está devolviendo.
     * @param ID Mueble que se va a devolver.
     */
    public DevolverCliente(cliente:Cliente, ID:number, fecha:Date):boolean{
        if(this.GetMueble(ID).Nombre == "dummy") return false;
        //Sería poner fecha actual aquí.
        let coste:number = this.GetMueble(ID).Precio;

        if(this.AddMueble(ID) == false) return false;
        
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
        return true;
    }


    /**
     * Proveedor vende un mueble, se añade uno al stock y se guarda la transacción.
     * @param proveedor Proveedor que está vendiendo.
     * @param ID Mueble que se va a comprar.
     */
    //Comprar varios ID y varios de cada iD
    public Comprar(proveedor:Proveedor, ID:number, fecha:Date):boolean{
        //Sería poner fecha actual aquí.
        if(this.GetMueble(ID).Nombre == "dummy") return false;

        let coste:number = this.GetMueble(ID).Precio;

        this.AddMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:proveedor.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
        return true;
    }

    /**
     * Realizamos una devolución de un mueble a un proveedor y se guarda la transacción.
     * @param proveedor Proveedor al que le devolvemos.
     * @param ID Mueble que se va a devolver.
     */
    public DevolverProveedor(proveedor:Proveedor, ID:number, fecha:Date):boolean{
        if(this.GetMueble(ID).Nombre == "dummy") return false;
        //Sería poner fecha actual aquí.
        //Fecha como parámetro de la función.
        
        let coste:number = this.GetMueble(ID).Precio;

        this.QuitarMueble(ID);
        this.transacciones.push({Persona:"Cliente", MuebleID:ID, PersonaID:proveedor.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
        return true;
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