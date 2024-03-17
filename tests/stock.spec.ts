import 'mocha';
import { expect } from 'chai';
import { Stock } from '../src/stock.js';
import { Mueble } from '../src/mueble.js';
import { Persona } from '../src/persona.js';

let stock = new Stock([], );
let mueble:Mueble = new Mueble(1, "silla", "Silla de madera", ["madera"], [2, 2, 10], 50, 1);



describe("Prueba CrearMueble", () => {
    it("Lo crea", () => {
        expect(stock.CrearMueble(mueble)).to.equal(true);
    });
    it("Error por ya existente", () => {
        expect(stock.CrearMueble(mueble)).to.equal(false);
    });
});

describe("Prueba GetMueble", () => {
    it("Caso correcto", () => {
        expect(stock.GetMueble(1)).to.equal(mueble);
    });
    
});

describe("Prueba GetCantidad", () => {
    it("Lo encuentra", () => {
        expect(stock.GetCantidad(mueble)).to.equal(1);
    });
    let mueblefalso:Mueble = new Mueble(-1, "silla", "Silla de madera", ["madera"], [2, 2, 10], 50, 1);
    it("No lo encuentra", () => {
        expect(stock.GetCantidad(mueblefalso)).to.equal(-1);
    });
});

describe("Prueba GetMueble", () => {
    it("Lo encuentra", () => {
        expect(stock.GetMueble(1)).to.equal(mueble);
    });
});

describe("Prueba AddMueble", () => {
    it("Lo encuentra", () => {
        expect(stock.AddMueble(1, 2)).to.equal(true);
        expect(stock.GetCantidad(mueble)).to.equal(3);
    });
    it("Caso error negativo", () => {
        expect(stock.AddMueble(1, -2)).to.equal(false);
        expect(stock.GetCantidad(mueble)).to.equal(3);
    });
    it("Caso error no encontrado", () => {
        expect(stock.AddMueble(-1, 2)).to.equal(false);
        expect(stock.GetCantidad(mueble)).to.equal(3);
    });
});

describe("Prueba QuitarMueble", () => {
    it("Lo encuentra", () => {
        expect(stock.QuitarMueble(1, 2)).to.equal(true);
        expect(stock.GetCantidad(mueble)).to.equal(1);
    });
    it("Se pasa", () => {
        expect(stock.QuitarMueble(1, 4)).to.equal(false);
        expect(stock.GetCantidad(mueble)).to.equal(1);
    });
    it("Caso error negativo", () => {
        expect(stock.QuitarMueble(1, -4)).to.equal(false);
        expect(stock.GetCantidad(mueble)).to.equal(1);
    });
    it("Caso error no encontrado", () => {
        expect(stock.QuitarMueble(-1, 4)).to.equal(false);
        expect(stock.GetCantidad(mueble)).to.equal(1);
    });
});

let cliente:Persona = new Persona(1, "Cliente1", "correo1", "calle1");
describe("Prueba NuevoCliente", () => {
    it("Lo crea", () => {
        expect(stock.NuevoCliente(cliente)).to.equal(true);
    });
});

describe("Prueba BuscarCliente", () => {
    it("Por nombre", () => {
        expect(stock.BuscarCliente("Nombre", "Cliente1")).to.equal(cliente);
    });
    it("Por contacto", () => {
        expect(stock.BuscarCliente("Contacto", "correo1")).to.equal(cliente);
    });
    it("Por direccion", () => {
        expect(stock.BuscarCliente("Direccion", "calle1")).to.equal(cliente);
    });
    it("Por ID", () => {
        expect(stock.BuscarCliente("ID", "1")).to.equal(cliente);
    });
});

describe("Prueba GetID", () => {
    it("Cliente", () => {
        expect(stock.GetClienteID()).to.equal(2);
    });
    it("Proveedor", () => {
        expect(stock.GetProveedorID()).to.equal(1);
    });
    it("Mueble", () => {
        expect(stock.GetMuebleID()).to.equal(2);
    });
    it("Transaccion", () => {
        expect(stock.GetTransaccionID()).to.equal(1);
    });
});