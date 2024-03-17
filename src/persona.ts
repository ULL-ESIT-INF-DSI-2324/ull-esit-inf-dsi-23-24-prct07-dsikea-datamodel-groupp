

/**
 * @class Persona concreta las entidades externas con las que realizamos las compras y ventas de muebles
 * @param ID es el identificador unico de cada cliente / proveedor
 * @param Nombre señala el nombre de la entidad
 * @param Contacto el telefono de contacto que nos provee la entidad
 * @param Direccion concreta una dirrecion sobre la que establecer contacto de forma presencial
 */
export class Persona {
  constructor(public ID: number, public nombre: string, public contacto: string, public direccion: string) {}
}

