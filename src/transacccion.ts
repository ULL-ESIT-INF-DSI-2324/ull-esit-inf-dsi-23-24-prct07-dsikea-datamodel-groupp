import { TipoCantidad } from "./tipoCantidad.js";

/**
 * @interface Transaccion es una colección que
 * define que atributos tienen los objetos de `Transaccion`
 * @param ID señala el identificador de la transaccion
 * @param Persona señala si la persona es un cliente o un proveedor
 * @param Cantidades registra los muebles adquiridos y su cantidad
 * @param PersonaID indica el identificar de la persona compradora
 * @param Accion indica si se obtiene o da un mueble
 * @param Fecha indicia la fecha de la transaccion
 * @param importe señala el importe final de la transaccion 
 */
export class Transaccion {

  constructor (  
    public ID: number,
    public Persona: "Cliente"|"Proveedor",
    public Cantidades: TipoCantidad[],
    public PersonaID: number,
    public Accion: "Obtener"|"Dar",
    public Fecha: Date,
    public Importe: number
    ){}
}