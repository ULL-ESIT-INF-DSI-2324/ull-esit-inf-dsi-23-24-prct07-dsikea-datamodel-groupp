import { TipoCantidad } from "./tipoCantidad.js";

/**
 * @interface Transaccion es una colección que
 * define que atributos tienen los objetos de `Transaccion`
 */
export class Transaccion {
  Persona: "Cliente"|"Proveedor";
  Cantidades: TipoCantidad[];
  PersonaID: number;
  Accion: "Obtener"|"Dar";
  Fecha: Date;
  Importe: number;
}