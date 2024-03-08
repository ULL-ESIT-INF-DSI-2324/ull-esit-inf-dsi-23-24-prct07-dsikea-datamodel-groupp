
export class Mueble{
    //ID debe ser único
    ID:number = 0;

    //Por lo que nombre no, aquí irá el tipo, silla, mesa, etc...
    Nombre:string = "";

    //Silla de oficina, silla gamer, silla de salón...
    Descripcion:string = "";

    //Madera, plástico...
    Material:string = "";

    //[ancho, largo, altura]
    Dimensiones:number[] = [];

    //Euros
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