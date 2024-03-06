import { Mueble } from "./mueble";

interface TipoCantidad {
    mueble:Mueble;
    Cantidad:number;
}

export class Stock{
    stock:TipoCantidad[];

    /**
     * Devuelve un mueble a partir de su ID única
     * @param ID Mueble que se está buscando
     * @returns Mueble buscado
     */
    GetMueble(ID:number):Mueble|undefined{
        for(var i of this.stock){
            if(i.mueble.ID == ID){
                return i.mueble;
            }
        }

        //Mueble no encontrado
        return undefined;
    }

    /**
     * Añade una unidad de mueble, si no está se añade a la lista, por eso no puede ser el ID
     * @param Mueble Mueble a añadir
     */
    AddMueble(Mueble:Mueble):void{
        for(var i of this.stock){
            if(i.mueble.ID == Mueble.ID){
                i.Cantidad++;
            }
        }

        this.stock.push({mueble:Mueble, Cantidad:1});
    }


}