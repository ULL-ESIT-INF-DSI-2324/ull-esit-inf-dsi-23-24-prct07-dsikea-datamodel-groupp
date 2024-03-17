import { Stock } from "./stock.js";
import { Mueble } from "./mueble.js";
import { Persona } from "./persona.js";
import { Transaccion } from "./transacccion.js";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js"

type schemaType = {
  muebles: { ID: number, nombre: string, descripcion: string, materiales: string[], dimensiones: number[], precio: number, cantidad:number}[]
  clientes: { ID: number, nombre: string, contacto: string, direccion: string}[]
  proveedores: { ID: number, nombre: string, contacto: string, direccion: string}[]
};

export class jsonStock extends Stock {
  private baseDatos: lowdb.LowdbSync<schemaType>;
  constructor(public muebles: Mueble[] = [], clientes: Persona[] = [], proveedores: Persona[] = [], transacciones: Transaccion[] = []){
    super([], [], [], []);
    this.baseDatos = lowdb(new FileSync("stock.json"));
    if(this.baseDatos.has("muebles").value()) {
      let mueblesBaseDatos = this.baseDatos.get("muebles").value();
      mueblesBaseDatos.forEach(item => this.stock.set(item.ID, new Mueble(item.ID, item.nombre, item.descripcion, item.materiales, item.dimensiones, item.precio, item.cantidad)));
    } else {
      this.baseDatos.set("muebles", muebles).write();
      muebles.forEach(item => this.stock.set(item.ID, item));
    }

    this.baseDatos = lowdb(new FileSync("clientes.json"));
    if(this.baseDatos.has("clientes").value()) {
      let clienteBaseDatos = this.baseDatos.get("clientes").value();
      clienteBaseDatos.forEach(item => this.clientes.set(item.ID, new Persona(item.ID, item.nombre, item.contacto, item.direccion)));
    } else {
      this.baseDatos.set("clientes", clientes).write();
      clientes.forEach(item => this.clientes.set(item.ID, item));
    }

    this.baseDatos = lowdb(new FileSync("proveedores.json"));
    if(this.baseDatos.has("proveedores").value()) {
      let proveedoresBaseDatos = this.baseDatos.get("proveedores").value();
      proveedoresBaseDatos.forEach(item => this.proveedores.set(item.ID, new Persona(item.ID, item.nombre, item.contacto, item.direccion)));
    } else {
      this.baseDatos.set("proveedores", proveedores).write();
      proveedores.forEach(item => this.proveedores.set(item.ID, item));
    }
  }
}