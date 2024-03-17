import { Mueble } from "./mueble.js";

/**
 * @interface TipoCantidad es una colección que
 * define que atributos tienen los objetos de `TipoCantidad`
 */
export interface TipoCantidad {
  Mueble: Mueble;
  Cantidad: number;
}