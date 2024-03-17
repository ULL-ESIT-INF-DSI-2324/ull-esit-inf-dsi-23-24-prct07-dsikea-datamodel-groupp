import { Stock } from "./stock.js";
import { Mueble } from "./mueble.js";
import { Persona } from "./persona.js";
import { Transaccion } from "./transacccion.js";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js"

type schemaType = {
  muebles: { ID: number, nombre: string, descripcion: string, materiales: string[], dimensiones: number[], precio: number}[]
  persona: { ID: number, nombre: string, contacto: string, direccion: string}
};

export class jsonStock extends Stock {
  private baseDatos: lowdb.LowdbSync<schemaType>;
  constructor(public muebles: Mueble[] = [], cantidad: number, clientes: Persona[] = [], proveedores: Persona[] = [], transacciones: Transaccion[] = []){
    super([], cantidad, [], [], []);
    this.baseDatos = lowdb(new FileSync("stock.json"));
    if(this.baseDatos.has("muebles").value()) {
      let mueblesBaseDatos = this.baseDatos.get("muebles").value();
      mueblesBaseDatos.forEach(item => this.stock.set(new Mueble(item.ID, item.nombre, item.descripcion, item.materiales, item.dimensiones, item.precio), cantidad));
    } else {
      this.baseDatos.set("muebles", muebles).write();
      muebles.forEach(item => this.stock.set(item, cantidad));
    }
  }
}