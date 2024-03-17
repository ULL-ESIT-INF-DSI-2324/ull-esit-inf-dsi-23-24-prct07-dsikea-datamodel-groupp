import { TipoCantidad } from "./tipoCantidad.js";

/**
 * @interface Transaccion es una colección que
 * define que atributos tienen los objetos de `Transaccion`
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