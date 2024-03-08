import 'mocha';
import { expect } from 'chai';
import { Stock } from '../src/stock';
import { Mueble } from '../src/mueble';

let stock = new Stock;
let mueble:Mueble = new Mueble(1, "silla", "Silla de madera", "madera", [2, 2, 10], 50);

stock.CrearMueble(mueble);

describe("Prueba GetMueble", () => {
    it("Lo encuentra", () => {
        expect(stock.GetMueble(1)).to.equal(mueble);
    });


});