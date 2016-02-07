function Cliente(dni,apellidos,nombre,telefono)
{
//Atributos de Cliente
this.dni=dni;
this.apellidos=apellidos;
this.nombre=nombre;
this.telefono=telefono;

}

//Funcion toHTMLRow de Cliente
Cliente.prototype.toHTMLRow = function ()
{


	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var dni = this.dni;
	var texto=nodoTexto(dni);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var nombre = this.nombre;
	var textonombre=nodoTexto(nombre);
	td.appendChild(textonombre);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var apellidos= this.apellidos;
	var textoApellidos=nodoTexto(apellidos);
	td.appendChild(textoApellidos);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var telefono = this.telefono;
	var textoTelefono=nodoTexto(telefono);
	td.appendChild(textoTelefono);
	oTr.appendChild(td);
	
	
	return oTr;
}

function Inmueble(id,agente,tipo,m2,direccion,descripcion)
{
	//Atributos de Inmueble
	this.id=id;
	this.agente=agente;
	this.tipo=tipo;
	this.m2=m2;
	this.direccion=direccion;
	this.descripcion=descripcion;
}

//Funcion toHTMLRow de inmueble
Inmueble.prototype.toHTMLRow = function ()
{


	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var id= this.id;
	var texto=nodoTexto(id);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var agente= this.agente;
	var textoAgente=nodoTexto(agente);
	td.appendChild(textoAgente);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var tipo= this.tipo;
	var textoTipo=nodoTexto(tipo);
	td.appendChild(textoTipo);
	oTr.appendChild(td);
	
		
	var td = document.createElement("td");
	var m2= this.m2;
	var textoM2=nodoTexto(m2);
	td.appendChild(textoM2);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var direccion= this.direccion;
	var textoDireccion=nodoTexto(direccion);
	td.appendChild(textoDireccion);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var descripcion= this.descripcion;
	var textoDescripcion=nodoTexto(descripcion);
	td.appendChild(textoDescripcion);
	oTr.appendChild(td);

	
	
	return oTr;
}



function Empleado(dni,apellidos,nombre,telefono)
{
//Atributos de Empleados
this.dni=dni;
this.apellidos=apellidos;
this.nombre=nombre;
this.telefono=telefono;

}

function Venta(idInmueble,dniCliente,fecha,precio)
{
	this.idInmueble=idInmueble;
	this.dniCliente=dniCliente;
	this.fecha=fecha;
	this.precio=precio;
	
}

Venta.prototype.toHTMLRow = function ()
{

	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var idInmueble = this.idInmueble;
	var texto=nodoTexto(idInmueble);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var dniCliente = this.dniCliente;
	var texto=nodoTexto(dniCliente);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var fecha = this.fecha;
	var texto=nodoTexto(fecha);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var precio = this.precio;
	var texto=nodoTexto(precio);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	return oTr;

}


//Objeto Agente Inmobiliario
function Agente(dni,apellidos,nombre,telefono,inmueble,sede)
{

//Llamada al constructor base (Empleado)
Empleado.call(this,dni,apellidos,nombre,telefono)
//Atributo de Agente
this.inmueble=inmueble;
this.sede=sede;

}
//Heredamos de Empleado
Agente.prototype = Object.create(Empleado.prototype);
Agente.prototype.constructor = Agente;





Agente.prototype.toHTMLRow = function ()
{
	var oTr = document.createElement("tr");
	
	var td = document.createElement("td");
	var tipo = "Agente inmobiliario";
	var texto=nodoTexto(tipo);
	td.appendChild(texto);
	oTr.appendChild(td);


	var td = document.createElement("td");
	var dni = this.dni;
	var texto=nodoTexto(dni);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var nombre = this.nombre;
	var texto=nodoTexto(nombre);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var apellidos= this.apellidos;
	var texto=nodoTexto(apellidos);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var telefono = this.telefono;
	var texto=nodoTexto(telefono);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	var td = document.createElement("td");
	var inmueble= this.inmueble;
	var texto=nodoTexto(inmueble);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var sede = this.sede;
	var texto=nodoTexto(sede);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var numAgente = "-";
	var texto=nodoTexto(numAgente);
	td.appendChild(texto);
	oTr.appendChild(td);



return oTr;
}







//Objeto JefeSede
function JefeSede(dni,apellidos,nombre,telefono,numAgente)
{

//Llamada al constructor base (Empleado)
Empleado.call(this,dni,apellidos,nombre,telefono)
//Atributo de Agente
this.numAgente=numAgente;


}
//Heredamos de Empleado
JefeSede.prototype = Object.create(Empleado.prototype);
JefeSede.prototype.constructor = JefeSede;


JefeSede.prototype.toHTMLRow = function ()
{

	var oTr = document.createElement("tr");
	
	var td = document.createElement("td");
	var tipo = "Jefe de sede";
	var texto=nodoTexto(tipo);
	td.appendChild(texto);
	oTr.appendChild(td);


	var td = document.createElement("td");
	var dni = this.dni;
	var texto=nodoTexto(dni);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var nombre = this.nombre;
	var texto=nodoTexto(nombre);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var apellidos= this.apellidos;
	var texto=nodoTexto(apellidos);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var telefono = this.telefono;
	var texto=nodoTexto(telefono);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	var td = document.createElement("td");
	var inmueble= "-";
	var texto=nodoTexto(inmueble);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	var td = document.createElement("td");
	var sede = "-";
	var texto=nodoTexto(sede);
	td.appendChild(texto);
	oTr.appendChild(td);

	
	var td = document.createElement("td");
	var numAgente= this.numAgente;
	var texto=nodoTexto(numAgente);
	td.appendChild(texto);
	oTr.appendChild(td);


return oTr;
}




function Visita(id,inmueble,agente,fecha,hora,estado)
{
//Atributos de visita
this.id=id;
this.inmueble=inmueble;
this.agente=agente;
this.fecha=fecha;
this.hora=hora;
this.estado=estado;

}

//Funcion toHTMLRow de visita
Visita.prototype.toHTMLRow = function ()
{
	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var id = this.id;
	var texto=nodoTexto(id);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var inmueble = this.inmueble;
	var texto=nodoTexto(inmueble);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var agente = this.agente;
	var texto=nodoTexto(agente);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var fecha = this.fecha;
	var texto=nodoTexto(fecha);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var hora = this.hora;
	var texto=nodoTexto(hora);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var estado = this.estado;
	var texto=nodoTexto(estado);
	td.appendChild(texto);
	oTr.appendChild(td);

	return oTr;

}


Inmobiliaria.prototype.altaSede = function (oSede) //FUNCION ALTA CLIENTE
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.sedes.length;i++)
	{
		if(this.sedes[i].id == oSede.id) //Si encuentra ese id que no lo inserte
		{
			bValido=false;
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.sedes.push(oSede);
	}
	
	return bValido;
}

function Sede(id,jefe,numEmpleados,nombre)
{
	//Atributos de visita
	this.id=id;
	this.jefe=jefe;
	
	this.numEmpleados=numEmpleados;
	this.nombre=nombre;
	
}

//Funcion toHTMLRow de visita
Sede.prototype.toHTMLRow = function ()
{



	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var id = this.id ;
	var texto=nodoTexto(id);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var jefe= this.jefe;
	var texto=nodoTexto(jefe);
	td.appendChild(texto);
	oTr.appendChild(td);

	
	var td = document.createElement("td");
	var numEmpleados= this.numEmpleados;
	var texto=nodoTexto(numEmpleados);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var nombre= this.nombre;
	var texto=nodoTexto(nombre);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	
	return oTr;

}




// Objeto Inmobiliaria
function Inmobiliaria(){
	this.clientes = new Array();
	this.empleados = new Array();
	this.visitas= new Array();
	this.inmuebles=new Array();
	this.sedes=new Array();
	this.alquileres= new Array();
	this.ventas= new Array();
}

Inmobiliaria.prototype.altaInmueble = function (oInmueble) //FUNCION ALTA INMUEBLE
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.inmuebles.length;i++)
	{
		if(this.inmuebles[i].id == oInmueble.id) //Si encuentra ese id que no lo inserte
		{
			bValido=false;
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.inmuebles.push(oInmueble);
	}
	
	return bValido;
}

Inmobiliaria.prototype.buscarInmueble = function (id) //FUNCION BUSCAR CLIENTES
{
	var i;
	var oInmueble;
	for(i=0;i<this.inmuebles.length;i++)
	{
		if(this.inmuebles[i].id == id) //Si encuentra ese dni existe
		{
			oInmueble = this.inmuebles[i];
			
		}
	}	
	
	return oInmueble;	
	
}


Inmobiliaria.prototype.optionClientes=function()
{
	arrayOption=new Array();
	
	for(i=0;i<this.clientes.length;i++)
	{
		oCliente=this.clientes[i];
		
		var options=document.createElement("OPTION");
		options.setAttribute("value",oCliente.dni);
		options.appendChild(nodoTexto(oCliente.nombre+" "+oCliente.apellidos));
		
		arrayOption.push(options);
	}	
	
	return arrayOption;	
	
	
}

Inmobiliaria.prototype.optionInmuebles=function()
{
	arrayOption=new Array();
	
	for(i=0;i<this.inmuebles.length;i++)
	{
		oInmueble=this.inmuebles[i];	
		var options=document.createElement("OPTION");
		options.setAttribute("value",oInmueble.id);
		options.appendChild(nodoTexto(oInmueble.direccion));
		
		arrayOption.push(options);

	}	
	
	return arrayOption;	

}

Inmobiliaria.prototype.optionJefes=function()
{
	arrayOption=new Array();
	
	for(i=0;i<this.empleados.length;i++)
	{
		oEmpleado=this.empleados[i];	
		
		if(oEmpleado instanceof JefeSede)
		{
			var options=document.createElement("OPTION");
			options.setAttribute("value",oEmpleado.dni);
			options.appendChild(nodoTexto(oEmpleado.nombre+", "+oEmpleado.apellidos));
			
			arrayOption.push(options);
		}
	}	
	
	return arrayOption;	

}

Inmobiliaria.prototype.optionAgentes=function()
{
	arrayOption=new Array();
	
	for(i=0;i<this.empleados.length;i++)
	{
		var oEmpleado=this.empleados[i];	
		
		if(oEmpleado instanceof Agente)
		{
			var options=document.createElement("OPTION");
			options.setAttribute("value",oEmpleado.dni);
			options.appendChild(nodoTexto(oEmpleado.nombre+", "+oEmpleado.apellidos));
			
			arrayOption.push(options);
		}
	}	
	
	return arrayOption;	

}


Inmobiliaria.prototype.optionSedes=function()
{
	arrayOption=new Array();
	
	for(i=0;i<this.sedes.length;i++)
	{
		var oSedes=this.sedes[i];	
		var options=document.createElement("OPTION");
		options.setAttribute("value",oSedes.id);
		options.appendChild(nodoTexto(oSedes.nombre));
		
		arrayOption.push(options);

	}	
	
	return arrayOption;	

}




Inmobiliaria.prototype.listadoSedes= function() //LISTADO DE VISITAS
{
	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1px");
	
	
	
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("ID"));
	tr.appendChild(th);


	var th = document.createElement("th");
	th.appendChild(nodoTexto("Jefe de Sede"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Número de empleados"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Nombre"));
	tr.appendChild(th);

	tr.appendChild(th);



	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.sedes.length;i++)
	{
	
	oTabla.appendChild(this.sedes[i].toHTMLRow());
		
	
		
	}
	return oTabla;
}

Inmobiliaria.prototype.altaAlquiler = function (oAlquiler) //FUNCION ALTA ALQUILER
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.alquileres.length;i++)
	{
		if(this.alquileres[i].idInmueble == oAlquiler.idInmueble) //Si encuentra ese id que no lo inserte
		{
			if(this.alquileres[i].fecha.getTime()>=oAlquiler.fecha.getTime())
			{
				bValido=false;
			}
			
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.alquileres.push(oAlquiler);
	}
	
	return bValido;
}




Inmobiliaria.prototype.altaVenta = function (oVenta) //FUNCION ALTA VENTA
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.ventas.length;i++)
	{
		if(this.ventas[i].idInmueble == oVenta.idInmueble) //Si encuentra ese id que no lo inserte
		{
			bValido=false;
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.ventas.push(oVenta);
	}
	
	return bValido;
}

Inmobiliaria.prototype.listadoVentas = function() //LISTADO DE VENTAS
{




	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	oTabla.setAttribute("class","table");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");

	var th = document.createElement("th");
	var dni =
	
	th.appendChild(nodoTexto("IdInmueble"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("DniCliente"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Fecha"))
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Precio"))
	tr.appendChild(th);

	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.ventas.length;i++)
	{
		oTBody.appendChild(this.ventas[i].toHTMLRow());
	}
	
	return oTabla;
}

Inmobiliaria.prototype.listadoAlquileres = function() //LISTADO DE ALQUILERES
{




	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	oTabla.setAttribute("class","table");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");

	var th = document.createElement("th");
	var dni =
	
	th.appendChild(nodoTexto("IdInmueble"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("DniCliente"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Fecha"))
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Duracion"))
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Precio"))
	tr.appendChild(th);

	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.alquileres.length;i++)
	{
		oTBody.appendChild(this.alquileres[i].toHTMLRow());
	}
	
	return oTabla;
}


Inmobiliaria.prototype.altaCliente = function (oCliente) //FUNCION ALTA CLIENTE
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.clientes.length;i++)
	{
		if(this.clientes[i].dni == oCliente.dni) //Si encuentra ese dni que no lo inserte
		{
			bValido=false;
		}
	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.clientes.push(oCliente);
	}
	
	return bValido;
}


Inmobiliaria.prototype.modificarCliente = function (oCliente) //FUNCION ALTA CLIENTE
{
	var i=0;
	var bValido=false;
	
	for(i=0;i<this.clientes.length;i++)
	{
		if(this.clientes[i].dni == oCliente.dni) //Si encuentra ese dni que no lo inserte
		{
			
			this.clientes[i].nombre=oCliente.nombre;
			this.clientes[i].apellidos=oCliente.apellidos;
			this.clientes[i].telefono=oCliente.telefono;
			bValido=true;
		}
	}	
	
	return bValido;
}

Inmobiliaria.prototype.buscarCliente = function (dni) //FUNCION BUSCAR CLIENTES
{
	var i;
	var oCliente;
	for(i=0;i<this.clientes.length;i++)
	{
		if(this.clientes[i].dni == dni) //Si encuentra ese dni existe
		{
			oCliente = this.clientes[i];
			
		}
	}	
	
	return oCliente;	
	
}


Inmobiliaria.prototype.borrarCliente = function (dni) //FUNCION borrar CLIENTES
{
	var i;
	var oCliente;
	for(i=0;i<this.clientes.length;i++)
	{
		if(this.clientes[i].dni == dni) //Si encuentra ese dni existe
		{
			oCliente = this.clientes[i];
			this.clientes.splice(i,1);
		}
	}	
	
	return oCliente;	
	
}

Inmobiliaria.prototype.listadoClientes = function() //LISTADO DE CLIENTES
{
	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	oTabla.setAttribute("class","table");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");

	var th = document.createElement("th");
	var dni =
	
	th.appendChild(nodoTexto("DNI"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Nombre"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Apellidos"))
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Teléfono"))
	tr.appendChild(th);

	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.clientes.length;i++)
	{
		oTabla.appendChild(this.clientes[i].toHTMLRow());
	}
	
	return oTabla;
}


Inmobiliaria.prototype.listadoEmpleados= function() //LISTADO DE CLIENTES
{
	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Tipo"));
	tr.appendChild(th);


	var th = document.createElement("th");
	th.appendChild(nodoTexto("DNI"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Nombre"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Apellidos"));
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Teléfono"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Inmueble"));
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Sede"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Números de Agente"));
	tr.appendChild(th);


	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.empleados.length;i++)
	{
	
	oTabla.appendChild(this.empleados[i].toHTMLRow());
		
	
		
	}
	return oTabla;
}



Inmobiliaria.prototype.listadoInmuebles = function() //LISTADO DE Inmueble
{

	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	oTabla.setAttribute("class","table");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");

	var th = document.createElement("th");		
	th.appendChild(nodoTexto("ID"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Agente asociado"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Tipo"))
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("M2"))
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Direccion"))
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Descripcion"))
	tr.appendChild(th);


	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.inmuebles.length;i++)
	{
		oTBody.appendChild(this.inmuebles[i].toHTMLRow());
	}
	
	return oTabla;
}


Inmobiliaria.prototype.altaEmpleado= function (oEmpleado) //FUNCION ALTA CLIENTE
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.empleados.length;i++)
	{
		if(this.empleados[i].dni == oEmpleado.dni) //Si encuentra ese dni que no lo inserte
		{
			bValido=false;
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.empleados.push(oEmpleado);
	}
	
	return bValido;
}

Inmobiliaria.prototype.altaVisita = function (oVisita) //FUNCION ALTA VISITA
{
	var i=0;
	var bValido=true;
	
	for(i=0;i<this.visitas.length;i++)
	{
		if(this.visitas[i].id == oVisita.id) //Si encuentra ese id que no lo inserte
		{
			bValido=false;
		}

	}	
	
	// Caso de no encontrarlo
	if (bValido == true)
	{
		this.visitas.push(oVisita);
	}
	
	return bValido;
}


Inmobiliaria.prototype.listadoVisitas= function() //LISTADO DE VISITAS
{
	var oTabla = document.createElement("TABLE");
	oTabla.setAttribute("border","1");
	var oTHead = document.createElement("THEAD");
	
	oTabla.appendChild(oTHead);
	
	var tr = document.createElement("tr");
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("ID"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Inmueble"));
	tr.appendChild(th);


	var th = document.createElement("th");
	th.appendChild(nodoTexto("Agente"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Fecha"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(nodoTexto("Hora"));
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(nodoTexto("Estado"));
	tr.appendChild(th);

	oTHead.appendChild(tr);


	var oTBody = document.createElement("TBODY");

	oTabla.appendChild(oTBody);
	
	for(i=0;i<this.visitas.length;i++)
	{
	
	oTabla.appendChild(this.visitas[i].toHTMLRow());
		
	
		
	}
	return oTabla;
}


function Alquiler(idInmueble,dniCliente,fecha,duracion,precio)
{
	this.idInmueble=idInmueble;
	this.dniCliente=dniCliente;
	this.fecha=fecha;
	this.duracion=duracion;
	this.precio=precio;
	
}

Alquiler.prototype.toHTMLRow = function ()
{

	var oTr = document.createElement("tr");

	var td = document.createElement("td");
	var idInmueble = this.idInmueble;
	var texto=nodoTexto(idInmueble);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var dniCliente = this.dniCliente;
	var texto=nodoTexto(dniCliente);
	td.appendChild(texto);
	oTr.appendChild(td);

	var td = document.createElement("td");
	var fecha = this.fecha;
	var texto=nodoTexto(fecha);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var duracion = this.duracion;
	var texto=nodoTexto(duracion);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	var td = document.createElement("td");
	var precio = this.precio;
	var texto=nodoTexto(precio);
	td.appendChild(texto);
	oTr.appendChild(td);
	
	
	return oTr;

}





///////////// funcion de crear el nodo
function nodoTexto(sTexto){
	
	
	var texto=document.createTextNode(sTexto);	
	
	return texto;
	
}
