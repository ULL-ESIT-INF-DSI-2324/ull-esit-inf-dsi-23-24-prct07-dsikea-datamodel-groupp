
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

	constructor(public ID: number, public nombre: string, public descripcion: string, 
		public materiales: string[], public dimensiones: number[], public precio: number) {
	}
}