import { Mueble } from "./mueble.js";

/**
 * @interface TipoCantidad señala el tipo de mueble y su cantidad
 */
export interface TipoCantidad {
  mueble: Mueble;
  cantidad: number;
}