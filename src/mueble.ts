
export class Mueble{
    //ID debe ser único
    ID:number = 0;

    //Por lo que nombre no, aquí irá el tipo, silla, mesa, etc...
    Nombre:string = "";

    Descripcion:string = "";
    Material:string = "";
    Dimensiones:number[] = [];
    Precio:number = 0;

    constructor(ID:number, nombre:string, descripcion:string, material:string, dimensiones:number[], precio:number){
        this.ID = ID;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Material = material;
        this.Dimensiones = dimensiones;
        this.Precio = precio;
    }

}