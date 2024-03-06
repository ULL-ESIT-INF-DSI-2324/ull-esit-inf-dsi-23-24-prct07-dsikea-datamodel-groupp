
export class Proveedor{
    //ID debe ser único
    ID:number = 0;

    Nombre:string = "";
    Contacto:string = "";
    Direccion:string = "";

    constructor(ID:number, nombre:string, contacto:string, direccion:string){
        this.ID = ID;
        this.Nombre = nombre;
        this.Contacto = contacto;
        this.Direccion = direccion;
    }

}