import { Mueble } from "./mueble.js";
import { Persona } from "./persona.js";
import { Transaccion } from "./transacccion.js";
import { TipoCantidad } from "./tipoCantidad.js";

/**
 * Cosas por hacer
 * Funciones BuscarCliente BuscarProveedor (Por expresiones regulares)
 * Funcion BuscarMueble información se podrá mostrar ordenada alfabéticamente y por precio, 
 * tanto ascendente como descendente, en ambos casos.
 * Informes, todos faltan, cuando alguno hecho porner aquí,
 * Inquirer.js y Lowdb
 * Documentación y Sonarcloud
 */

/**
 * @class Stock gestiona todo el stock en cuestiones de:
 * - almacenaje de diferentes muebles y sus cantidades almacenadas
 * - ventas y comprar a proveedores y clientes 
 * - informes detallados sobre transacciones sobre el stock
 * 
 * @param stock señala todo lo que se alamcena en el stock (muebles y sus cantidades)
 * @param muebles define las características de cada tipo de mueble
 * @param transaccciones recoge las transacciones realizadas sobre el stock
 * @param cliente almacena y señala los datos de los clientes sobre los que trabajamos
 * @param proveedores almacena y señala los datos de los proveedores sobre los que trabajamos
 */
export class Stock{
    
	private stock:TipoCantidad[];
	private muebles:Mueble[];
	private transacciones:Transaccion[];
	private clientes:Persona[];
	private proveedores:Persona[];


	/**
	 * Devuelve la cantidad de un mueble almacenado
	 * @param ID el indentificador del mueble
	 * @returns la cantidad almacenada de dicho mueble
	 */
	private GetCantidad( ID: number ): number{
		for(var i of this.stock) {
			if(ID == i.MuebleID) {
				return i.Cantidad;
			}
		}
		return -1;
	}

	/**
	 * Devuelve un mueble a partir de su ID única
	 * @param ID es el identificador del mueble a buscar
	 * @returns en caso de encontrarlo, devolverá dicho mueble
	 * en caso contrario, se devolverá un mueble _dummy_
	 */

	//Otra función para buscar por nombre, tipo y descripción, usar lenguajes regulares ahí, devolver Mueble[]
	//Quiero que sea private pero debe ser publico para hacer test
	
	public GetMueble( ID: number ): Mueble {
		for(var i of this.muebles) {
			if(i.ID == ID) {
				return i;
			}
		}

		//Mueble no encontrado
		return new Mueble(0, "dummy", "dummy", "nada", [0], 0);
	}

	/**
	 * Una función que se encarga de añadir un mueble a la transaccion
	 * @param ID el identificador del mueble a añadir
	 * @returns true si se ha podido añadir el mueble, false en otro caso
	 */
	private AddMueble( ID: number ): boolean {
		for(var i of this.stock) {
			if(i.MuebleID == ID) {
				i.Cantidad++;
				return true;
			}
		}

		console.log("Mueble no encontrado");
		return false;
	}   
    
	/**
	 * Una función que se encarga de quitar un mueble a la transaccion
	 * @param ID el identificador del mueble a quitar
	 * @returns true si se ha podido quitar el mueble, false en otro caso
	 */
	private QuitarMueble( ID: number ): boolean {
		for(var i of this.stock) {
			if(i.MuebleID == ID) {
				if(i.Cantidad > 0) {
					i.Cantidad--;
					return true;
				} else {
					console.log("No quedan unidades de ese mueble");
					return false;
				}
			}
		}
		console.log("Mueble no encontrado");
		return false;
	}


	/**
	 * Una función que se encarga de añadir nuevos muebles al stock
	 * @param mueble el mueble que se pretende unir al stock
	 * @returns true si se ha podido crear el mueble y añadir al stock, 
	 * false en caso de que ya existiese dicho mueble
	 */
	//Poner booleano por si pudo crear el mueble o no
	public CrearMueble( mueble: Mueble ): boolean {
		let existe: boolean = false;

		for(var i of this.stock) {
			if(i.MuebleID == mueble.ID) {
				existe = true;
			}
		}
		if(existe == false) {
			this.stock.push({MuebleID:mueble.ID, Cantidad:1});
			this.muebles.push(mueble);
			return true;
		} else {
			return false;
		}
	}

  /**
	 * Una función que se encarga de remover un mueble del stock 
	 * @param cliente señala al cliente al que le vamos a vender el mueble
	 * @param IDs recoge los muebles que se van a vender
	 * @param fecha expone la fecha de la venta
	 * @returns retorna true si se ha podido realizar la venta, false en caso contrario
	 */
	public RemoverDeStock( cliente: Persona, IDs: TipoCantidad[], fecha: Date ): boolean {

		//Sección de errores
		for(var ID of IDs) {
			if(this.GetMueble(ID.MuebleID).Nombre == "dummy") return false;
			if(ID.Cantidad > this.GetCantidad(ID.MuebleID) || ID.Cantidad <= 0) return false;
		}

		
		//Añadir coste al total y quitarlo del stock
		let coste:number = 0;
		for(var ID of IDs) {
			coste += this.GetMueble(ID.MuebleID).Precio;
			this.QuitarMueble(ID.MuebleID);
		}
		
		//La persona es un cliente, cambiar por BuscarCliente
		for(var i of this.clientes) {
			if(cliente.ID == i.ID) {
				this.transacciones.push({Persona:"Cliente", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
				return true;
			}
		}

		//La persona es un proveedor, cambiar por BuscarProveedor
		for(var i of this.proveedores) {
			if(cliente.ID == i.ID) {
				this.transacciones.push({Persona:"Proveedor", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Dar", Fecha:fecha, Importe:coste});
				return true;
			}
		}

		//No se encontró la persona
		return false;
	}

  /**
	 * Una función que se encarga de añadir un mueble al stock 
	 * @param cliente señala al cliente al que le vamos a comprar el mueble
	 * @param IDs recoge los muebles que se van a comprar
	 * @param fecha expone la fecha de la compra
	 * @returns retorna true si se ha podido realizar la compra, false en caso contrario
	 */
	public AñadiendoDeStock(cliente:Persona, IDs:TipoCantidad[], fecha:Date):boolean{

		//Sección de errores
		for(var ID of IDs) {
			if(this.GetMueble(ID.MuebleID).Nombre == "dummy") return false;
			if(ID.Cantidad <= 0) return false;
		}

		//Añadir coste al total y quitarlo del stock
		let coste:number = 0;
		for(var ID of IDs) {
			coste += this.GetMueble(ID.MuebleID).Precio;
			this.AddMueble(ID.MuebleID);
		}

			//La persona es un cliente, cambiar por BuscarCliente
		for(var i of this.clientes) {
			if(cliente.ID == i.ID) {
				this.transacciones.push({Persona:"Cliente", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Obtener", Fecha:fecha, Importe:coste});
				return true;
			}
		}

			//La persona es un proveedor, cambiar por BuscarProveedor
		for(var i of this.proveedores) {
			if(cliente.ID == i.ID) {
				this.transacciones.push({Persona:"Proveedor", Cantidades:IDs, PersonaID:cliente.ID, Accion:"Obtener", Fecha:fecha, Importe:coste});
				return true;
			}
		}

		//No se encontró la persona.
		return false;
	}

	/**
	 * Crea informes varios sobre el stock o las transacciones realizadas
	 * @param tipoinforme señala el tipo de informe que se quiere ver:
	 * 0: Mueble más vendido
	 * 1: Dinero ganado en ventas - Dinero perdido por devoluciones
	 * 2: Dinero gastado en compras - Dinero devuelto por devoluciones
	 * @param ID el identificador en caso de buscar un mueble o una persona y/o proveedor específico
	 * @returns una busqueda filtrada por los parametros definidos
	 */
	public Informes(tipoinforme:number, ID:number = 0): string {

		if(tipoinforme == 0) {
		  // insertar filtros para mueble mas vendido
		} else if(tipoinforme == 1) {
			// insertar filtros para dinero ganado en ventas
		} else {
			// insertar dinero gastado en compras
		}
		return "Tipo de informe no existente";
	}

	//Buscar cliente por nombre, contacto o dirección
	public BuscarCliente():Persona{
		return this.clientes[0];
	}

	//Buscar proveedor por nombre, contacto o dirección
	public BuscarProveedor():Persona{
		return this.proveedores[0];
	}
}