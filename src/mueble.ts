
/**
 * @class Mueble precisa las características de los objetos tipo `Mueble`
 * @param ID es el identificador unico de cada mueble
 * @param Nombre señala el tipo de mueble: silla, mesa, armario, cama, etc...
 * @param Descripcion cuenta una breve descripción del mueble
 * @param Material señala de que tipo de material es fabricado: madera, acero, plástico...
 * @param Dimensiones figura en [ancho, largo, alto] las dimensiones del mueble
 * @param Precio determina el precio por unidad de cada mueble
 */
export class Mueble {
	
	ID: number = 0;
	Nombre: string = "";
	Descripcion: string = "";
	Material: string = "";
	Dimensiones: number[] = [];
	Precio: number = 0;

	constructor(ID: number, nombre: string, descripcion: string, material: string, dimensiones: number[], precio: number) {
		this.ID = ID;
		this.Nombre = nombre;
		this.Descripcion = descripcion;
		this.Material = material;
		this.Dimensiones = dimensiones;
		this.Precio = precio;
	}
}