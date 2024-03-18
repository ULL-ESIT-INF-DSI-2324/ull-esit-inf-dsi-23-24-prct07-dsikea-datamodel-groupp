import { Mueble } from "./mueble.js";

/**
 * @interface TipoCantidad señala el tipo de mueble y su cantidad
 * @param mueble indica un mueble
 * @param cantidad indica la cantidad de dicho mueble
 */
export interface TipoCantidad {
  mueble: Mueble;
  cantidad: number;
}