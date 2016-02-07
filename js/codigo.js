oInmobiliaria=new Inmobiliaria();
window.addEventListener("load",inicio,false);


function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	{
	  xhttp=new XMLHttpRequest();
	}
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
} 

var oXML = loadXMLDoc("datos.xml");



function leerDatosPrueba()
{
	var clientes=oXML.getElementsByTagName("CLIENTES")[0].getElementsByTagName("CLIENTE");
	for(i=0;i<clientes.length;i++)
	{
		var dni=clientes[i].getElementsByTagName("DNI")[0].textContent;
		var nombre=clientes[i].getElementsByTagName("NOMBRE")[0].textContent;
		var apellidos=clientes[i].getElementsByTagName("APELLIDOS")[0].textContent;
		var telefono=clientes[i].getElementsByTagName("TELEFONO")[0].textContent;
		
		var oCliente=new Cliente(dni,apellidos,nombre,telefono);
		oInmobiliaria.altaCliente(oCliente);
	}
	
	var inmuebles=oXML.getElementsByTagName("INMUEBLES")[0].getElementsByTagName("INMUEBLE");
	for(i=0;i<inmuebles.length;i++)
	{
		var agente=inmuebles[i].getElementsByTagName("AGENTE")[0].textContent;
		var id=inmuebles[i].getElementsByTagName("ID")[0].textContent;
		var tipo=inmuebles[i].getElementsByTagName("TIPO")[0].textContent;
		var m2=inmuebles[i].getElementsByTagName("M2")[0].textContent;
		var direccion=inmuebles[i].getElementsByTagName("DIRECCION")[0].textContent;
		var descripcion=inmuebles[i].getElementsByTagName("DESCRIPCION")[0].textContent;
		
		var oInmueble=new Inmueble(id,agente,tipo,m2,direccion,descripcion);
		oInmobiliaria.altaInmueble(oInmueble);
		
	}
	
	
	var sedes=oXML.getElementsByTagName("SEDES")[0].getElementsByTagName("SEDE");
	for(i=0;i<sedes.length;i++)
	{
		var id=sedes[i].getElementsByTagName("ID")[0].textContent;
		var jefe=sedes[i].getElementsByTagName("JEFE")[0].textContent;
		var numEmpleados=sedes[i].getElementsByTagName("NUM")[0].textContent;
		var nombre=sedes[i].getElementsByTagName("NOMBRE")[0].textContent;
		
		var oSede=new Sede(id,jefe,numEmpleados,nombre);
		oInmobiliaria.altaSede(oSede);
		
	}
	
	var empleados=oXML.getElementsByTagName("EMPLEADOS")[0].getElementsByTagName("EMPLEADO");
	for(i=0;i<empleados.length;i++)
	{
		var tipo=empleados[i].getElementsByTagName("TIPO")[0].textContent;
		var dni=empleados[i].getElementsByTagName("DNI")[0].textContent;
		var nombre=empleados[i].getElementsByTagName("NOMBRE")[0].textContent;
		var apellidos=empleados[i].getElementsByTagName("APELLIDOS")[0].textContent;
		var telefono=empleados[i].getElementsByTagName("TELEFONO")[0].textContent;
		
		
		if(tipo=="JefeSede")
		{
			var numAgente=empleados[i].getElementsByTagName("NUM")[0].textContent;
			var oEmpleado=new JefeSede(dni,apellidos,nombre,telefono,numAgente);
		}
		else
		{
			var inmueble=empleados[i].getElementsByTagName("INMUEBLE")[0].textContent;
			var sede=empleados[i].getElementsByTagName("SEDE")[0].textContent;
			var oEmpleado=new Agente(dni,apellidos,nombre,telefono,inmueble,sede);
		}
		
		oInmobiliaria.altaEmpleado(oEmpleado);
		
	}
	
	var visitas=oXML.getElementsByTagName("VISITAS")[0].getElementsByTagName("VISITA");
	for(i=0;i<visitas.length;i++)
	{
		var id=visitas[i].getElementsByTagName("ID")[0].textContent;
		var inmueble=visitas[i].getElementsByTagName("INMUEBLE")[0].textContent;
		var agente=visitas[i].getElementsByTagName("AGENTE")[0].textContent;
		var d=visitas[i].getElementsByTagName("FECHA")[0].textContent;
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);		
		var hora=visitas[i].getElementsByTagName("HORA")[0].textContent;
		var estado=visitas[i].getElementsByTagName("ESTADO")[0].textContent;
		
		var oVisita=new Visita(id,inmueble,agente,fecha,hora,estado);
		oInmobiliaria.altaVisita(oVisita);
		
	}
	
	var ventas=oXML.getElementsByTagName("VENTAS")[0].getElementsByTagName("VENTA");
	for(i=0;i<ventas.length;i++)
	{
		var inmueble=ventas[i].getElementsByTagName("INMUEBLE")[0].textContent;
		var cliente=ventas[i].getElementsByTagName("CLIENTE")[0].textContent;
		var d=ventas[i].getElementsByTagName("FECHA")[0].textContent;
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);				
		var precio=ventas[i].getElementsByTagName("PRECIO")[0].textContent;
		
		var oVenta=new Venta(inmueble,cliente,fecha,precio);
		oInmobiliaria.altaVenta(oVenta);
		
	}

	var alquileres=oXML.getElementsByTagName("ALQUILERES")[0].getElementsByTagName("ALQUILER");
	for(i=0;i<alquileres.length;i++)
	{
		var inmueble=alquileres[i].getElementsByTagName("INMUEBLE")[0].textContent;
		var cliente=alquileres[i].getElementsByTagName("CLIENTE")[0].textContent;
		var d=alquileres[i].getElementsByTagName("FECHA")[0].textContent;
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);		
		var duracion=alquileres[i].getElementsByTagName("DURACION")[0].textContent;
		var precio=alquileres[i].getElementsByTagName("PRECIO")[0].textContent;
		
		var oAlquiler=new Alquiler(inmueble,cliente,fecha,duracion,precio);
		oInmobiliaria.altaAlquiler(oAlquiler);
		
	}
	
	
}

function inicio()
{
	leerDatosPrueba();
	var ol=document.querySelectorAll(".opciones")[0];
	ol.children[0].addEventListener("click",mostrarGestionCliente,false);
	ol.children[1].addEventListener("click",mostrarGestionInmueble,false)
	ol.children[2].addEventListener("click",mostrarGestionVentas,false);
	ol.children[3].addEventListener("click",mostrarGestionAlquiler,false);
	ol.children[4].addEventListener("click",mostrarGestionEmpleados,false);
	ol.children[5].addEventListener("click",mostrarGestionVisita,false);
	ol.children[6].addEventListener("click",mostrarGestionSede,false);
	ol.children[7].addEventListener("click",mostrarListado,false);

	
	
	var ol=document.querySelectorAll(".opcionesCliente")[0];
	ol.children[0].addEventListener("click",mostrarAltaCliente,false);
	ol.children[1].addEventListener("click",mostrarbajaCliente,false);
	ol.children[2].addEventListener("click",mostrarModificarCliente,false);

	
	var btnAltaInmueble=document.getElementsByName("altaInmueble")[0];
	btnAltaInmueble.addEventListener("click",altaInmueble,false);
	
	var btnAltaCliente=document.getElementsByName("btnAltaCliente")[0];
	btnAltaCliente.addEventListener("click",altaCliente,false);
	
	var btnBajaCliente=document.getElementsByName("btnBajaCliente")[0];
	btnBajaCliente.addEventListener("click",bajaCliente,false);
	
	var btnModificarCliente=document.getElementsByName("btnModificarCliente")[0];
	btnModificarCliente.addEventListener("click",mostrarModificarDatosCliente,false);
	
	var btnOcultarMensaje=document.getElementsByName("btnCerrarMensaje")[0];
	btnOcultarMensaje.addEventListener("click",ocultarMensaje,false);
	
	
	var btnAltaEmpleado=document.getElementsByName("btnAltaEmpleado")[0];
	btnAltaEmpleado.addEventListener("click",mostrarTipoEmpleado,false);
	
	var btnModificarClienteDatos=document.getElementsByName("btnModificarClienteDatos")[0];
	btnModificarClienteDatos.addEventListener("click",guardarDatos,false);
	
	var btnAltaEmpleadoAgente=document.getElementsByName("btnAltaEmpleadoAgente")[0];
	btnAltaEmpleadoAgente.addEventListener("click",altaEmpleadoAgente,false);
	

	
	var btnAltaEmpleadoJefeSede=document.getElementsByName("btnAltaEmpleadoJefeSede")[0];
	btnAltaEmpleadoJefeSede.addEventListener("click",altaEmpleadoJefeSede,false);

	var btnAltaVisita=document.getElementsByName("btnAltaVisita")[0];
	btnAltaVisita.addEventListener("click",altaVisita,false);


	
	var btnVentas=document.getElementsByName("altaVenta")[0];
	btnVentas.addEventListener("click",altaVenta,false);
	

	
	var btnAlquiler=document.getElementsByName("btnAltaAlquiler")[0];
	btnAlquiler.addEventListener("click",altaAlquiler,false);	
	
	var btnAltaSede=document.getElementsByName("btnAltaSede")[0];
	btnAltaSede.addEventListener("click",altaSede,false);
	
	
	var ol=document.querySelectorAll(".opcionesListado")[0];
	ol.children[0].addEventListener("click",mostrarlistadoCliente,false);
	ol.children[1].addEventListener("click",mostrarInmueble,false);
	ol.children[2].addEventListener("click",mostrarVentas,false);
	ol.children[3].addEventListener("click",mostrarAlquileres,false);
	ol.children[4].addEventListener("click",mostrarEmpleados,false);
	ol.children[5].addEventListener("click",mostrarVisitas,false);
	ol.children[6].addEventListener("click",mostrarSedes,false);
	
	leerDatosPrueba();	
}	



function mostrarInmueble()
{

	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoInmuebles());
	oVentana.document.title="Listado de Inmuebles";

}


////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////MOSTRAR/////////////////////////////////////////////////////////

function mostrarListado()
{
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="block";	


	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";	
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	borrarDatos();

}



function mostrarGestionCliente()
{
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="block";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";	
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";	
	borrarDatos();
}

function mostrarGestionInmueble()
{	

	var inmueblesForm=document.getElementsByName("inmueblesForm")[0];
	var combo=inmueblesForm.agenteAsociado;
	anadirSelectAgente(combo);
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";	
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="block";	
	
	borrarDatos();
}


function mostrarGestionEmpleados()
{
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";	
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="block";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";	
	borrarDatos();
}



function mostrarAltaCliente()
{
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="block";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";	
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	borrarDatos();
}	

function mostrarbajaCliente()
{
	
	var bajaClienteForm=document.getElementsByName("bajaClienteForm")[0];
	var combo=bajaClienteForm.dni;
	anadirSelectCliente(combo);
	
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="block";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";	
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	borrarDatos();
}

function mostrarModificarCliente()
{
	
	
	var modificarCliente=document.getElementsByName("modificarClienteForm")[0];
	var combo=modificarCliente.dni;
	anadirSelectCliente(combo);
	
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var modificarCliente=document.getElementsByName("modificarCliente")[0];
	modificarCliente.style.display="block";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
	modificarCliente.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	borrarDatos();
	
}

function mostrarModificarDatosCliente()
{
	if(validarDniClienteModificar())
	{

		var cliente=document.getElementsByName("clientes")[0];
		cliente.style.display="none";	
		var inmueble=document.getElementsByName("inmuebles")[0];
		inmueble.style.display="none";
		var altaCliente=document.getElementsByName("altaCliente")[0];
		altaCliente.style.display="none";
		var bajaCliente=document.getElementsByName("bajaCliente")[0];
		bajaCliente.style.display="none";
		var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
		altaEmpleado.style.display="none";
		var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
		altaEmpleadoJefeSede.style.display="none";
		var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
		altaEmpleadoAgente.style.display="none";
		var modificarCliente=document.getElementsByName("modificarCliente")[0];
		modificarCliente.style.display="none";
		var modificarCliente=document.getElementsByName("modificarClienteDatos")[0];
		modificarCliente.style.display="block";
		var visita=document.getElementsByName("visita")[0];
		visita.style.display="none";
		var sede=document.getElementsByName("divSede")[0];
		sede.style.display="none";
		var alquiler=document.getElementsByName("alquiler")[0];
		alquiler.style.display="none";	
		var ventas=document.getElementsByName("ventas")[0];
		ventas.style.display="none";	
		var listado=document.getElementsByName("listado")[0];
		listado.style.display="none";
	}
}


function mostrarGestionVisita()
{
	
	anadirDiaVisita();
	anadirMesVisita();
	anadirAnoVisita();
	anadirHoraVisita();
	anadirMinutoVisita();
	
	var visitaForm=document.getElementsByName("visitaForm")[0];
	var combo=visitaForm.inmueble;
	anadirSelectInmueble(combo)

	var combo=visitaForm.agente;
	anadirSelectAgente(combo);
	
	
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="block";
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
}


function mostrarGestionVentas()
{
	anadirDiaVenta();
	anadirMesVenta();
	anadirAnoVenta();
	
	var VentasForm=document.getElementsByName("VentasForm")[0];
	var combo=VentasForm.idInmuebleVenta;
	anadirSelectInmueble(combo);

	var combo=VentasForm.dniClienteVenta;
	anadirSelectCliente(combo);
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";	
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="block";
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";

	
	
}


function mostrarGestionAlquiler()
{
	var alquilerForm=document.getElementsByName("alquilerForm")[0];
	var combo=alquilerForm.idInmuebleAlquiler;
	anadirSelectInmueble(combo);
	
	var combo=alquilerForm.dniClienteAlquiler;
	anadirSelectCliente(combo);
	
	anadirDiaAlquiler();
	anadirMesAlquiler();
	anadirAnoAlquiler();
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";	
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="block";
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	
	
	
}

function mostrarGestionSede()
{

	var sedeForm=document.getElementsByName("sedeForm")[0];
	var combo=sedeForm.jefeSede;
	anadirSelectJefe(combo);	
	
	var cliente=document.getElementsByName("clientes")[0];
	cliente.style.display="none";	
	var inmueble=document.getElementsByName("inmuebles")[0];
	inmueble.style.display="none";
	var altaCliente=document.getElementsByName("altaCliente")[0];
	altaCliente.style.display="none";
	var bajaCliente=document.getElementsByName("bajaCliente")[0];
	bajaCliente.style.display="none";
	var altaEmpleado=document.getElementsByName("altaEmpleado")[0];
	altaEmpleado.style.display="none";
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	
	
	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
	altaEmpleadoJefeSede.style.display="none";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
	altaEmpleadoAgente.style.display="none";
	var alquiler=document.getElementsByName("alquiler")[0];
	alquiler.style.display="none";	
	var visita=document.getElementsByName("visita")[0];
	visita.style.display="none";
	var ventas=document.getElementsByName("ventas")[0];
	ventas.style.display="none";	
	var sede=document.getElementsByName("divSede")[0];
	sede.style.display="block";
	var listado=document.getElementsByName("listado")[0];
	listado.style.display="none";
	
	
}

function mostrarTipoEmpleado()
{

	var altaEmpleado=document.getElementsByName("altaEmpleadoForm")[0];
	var altaEmpleadoTipo=document.getElementsByName("altaEmpleado")[0];
	var tipo=altaEmpleado.tipo.value.trim();
	
	if(tipo=="agenteInmobiliario")
	{
		var altaEmpleadoAgenteForm=document.getElementsByName("altaEmpleadoAgenteForm")[0];
		var combo=altaEmpleadoAgenteForm.sede;
		anadirSelectSede(combo);	
		
		altaEmpleadoTipo.style.display="none";		
		var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgente")[0];
		altaEmpleadoAgente.style.display="block";
		
	}
	else
	{	
		altaEmpleadoTipo.style.display="none";
		var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSede")[0];
		altaEmpleadoJefeSede.style.display="block";

	}

}

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////CLIENTE/////////////////////////////////////////////

function guardarDatos() // GUARDAR LOS DATOS MODIFICADOS
{
	
	if (validarDatosModificarCliente()==true) // Si los datos son validos
	{
		
		var modificarCliente=document.getElementsByName("modificarClienteForm2")[0];	
		var dni=modificarCliente.dni.value;
		var nombre=modificarCliente.nombre.value;
		var apellidos=modificarCliente.apellidos.value;
		var telefono=modificarCliente.telefono.value;
		
		var oCliente = new Cliente(dni,apellidos,nombre,telefono);
	
		if(oInmobiliaria.modificarCliente(oCliente)) //Si damos de alta un cliente correctamente
		{
			mensaje("Modificación de cliente exitosa"); //mensaje
			
			var modificarCliente=document.getElementsByName("modificarCliente")[0];
			modificarCliente.style.display="block";
			var modificarClienteDatos=document.getElementsByName("modificarClienteDatos")[0];
			modificarClienteDatos.style.display="none";
			anadirSelectCliente();
			modificarCliente.reset(); //Borramos los campos
		}
		else
		{
			mensaje("Modificación erronea"); //mensaje
		}
	}
	
	
}
	
function validarDatosModificarCliente() //VALIDAR SI LOS DATOS QUE VAS A MODIFICAR SON CORRECTOS
{
	
	var bValido=true;
	var sErrores = "";

	var modificarCliente=document.getElementsByName("modificarClienteForm2")[0];			
	var nombre=modificarCliente.nombre.value.trim();
	var apellidos=modificarCliente.apellidos.value.trim();
	var telefono=modificarCliente.telefono.value.trim();

	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.nombre.focus();	
		}
	
		sErrores += "\n Nombre incorrecto";
		
		//Marcar error
			modificarCliente.nombre.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		modificarCliente.nombre.className = "form-control";	
	}


	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.apellidos.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto";
		
		//Marcar error
			modificarCliente.apellidos.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		modificarCliente.apellidos.className = "form-control";	
	}

	var oExpReg = /^\d{9}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.telefono.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto";
		
		//Marcar error
			modificarCliente.telefono.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		modificarCliente.telefono.className = "form-control";	
	}

//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	return bValido;

	
}	



function validarDniClienteModificar() //VALIDAR SI EL DNI INTRODUCIDO PARA MODIFICAR ES VALIDO
{
	var bValido=true;
	var sErrores = "";
	
	var modificarCliente=document.getElementsByName("modificarClienteForm")[0];
	var dni=modificarCliente.dni.value.trim();
		
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.dni.focus();	
		}
	
		sErrores = "\n DNI incorrecto";
		
		//Marcar error
		modificarCliente.dni.className = "form-control error";
	
	}
	else 
	{
		
		var oCliente=oInmobiliaria.buscarCliente(dni);		//Buscamos el cliente con el dni	
		
		if(oCliente==null || typeof(oCliente) == "undefined") //Si el cliente es nulo o undefined es que no existe, dara un error
		{
			bValido = false;
			modificarCliente.dni.focus();	
			sErrores = "\n DNI no encontrado";
			//Marcar error
			modificarCliente.dni.className = "form-control error";
			
		}
		else
		{
			rellenarDatosModificar(oCliente);
			//Desmarcar error
			modificarCliente.dni.className = "form-control";	
		}
		
	}
	if(bValido==false)
	{		
		alert(sErrores);
	}
	
	return bValido;
	
}

function rellenarDatosModificar(oCliente) //RELLENA EL FORMULARIO DE MODIFICACION DE CLIENTE
{
	
	var modificarCliente=document.getElementsByName("modificarClienteForm2")[0];
	var input = modificarCliente.dni;
	input.setAttribute("value", oCliente.dni);
	
	modificarCliente.appendChild(input);
	modificarCliente.nombre.value=oCliente.nombre;
	modificarCliente.apellidos.value=oCliente.apellidos;
	modificarCliente.telefono.value=oCliente.telefono;
	
}



function altaCliente () //DAR DE ALTA UN CLIENTE
{

	if (validarDatosAltaCliente()==true) // Si los datos son validos
	{
		
		var altaCliente=document.getElementsByName("altaClienteForm")[0];			
		var dni=altaCliente.dni.value.trim();
		var nombre=altaCliente.nombre.value.trim();
		var apellidos=altaCliente.apellidos.value.trim();
		var telefono=altaCliente.telefono.value.trim();
		var oCliente = new Cliente(dni,apellidos,nombre,telefono);
	
		if(oInmobiliaria.altaCliente(oCliente)) //Si damos de alta un cliente correctamente
		{
			mensaje("Alta de cliente exitosa"); //mensaje
			
			altaCliente.reset(); //Borramos los campos
		}
		else
		{
			mensaje("Cliente existente"); //mensaje
		}
			
	}

}



function validarDatosAltaCliente () // VALIDAR LOS DATOS DE ALTA
{
	var bValido=true;
	var sErrores = "";

	var altaCliente=document.getElementsByName("altaClienteForm")[0];			
	var dni=altaCliente.dni.value.trim();
	var nombre=altaCliente.nombre.value.trim();
	var apellidos=altaCliente.apellidos.value.trim();
	var telefono=altaCliente.telefono.value.trim();
	
	var br=document.createElement("br");
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.dni.focus();	
		}
	
		sErrores += " \n DNI incorrecto";
		
		//Marcar error
		altaCliente.dni.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.dni.className = "form-control";	
	}

var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.nombre.focus();	
		}
	
		sErrores += "\nNombre incorrecto";
		
		//Marcar error
			altaCliente.nombre.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.nombre.className = "form-control";	
	}


	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.apellidos.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto";
		
		//Marcar error
			altaCliente.apellidos.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		altaCliente.apellidos.className = "form-control";	
	}

	var oExpReg = /^\d{9}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.telefono.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto";
		
		//Marcar error
			altaCliente.telefono.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.telefono.className = "form-control";	
	}

//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	return bValido;


}

function bajaCliente () //DAR DE BAJA UN CLIENTE
{

	if (validarDatosBajaCliente()==true) // Si los datos son validos
	{
			var bajaCliente=document.getElementsByName("bajaClienteForm")[0];
			var dni=bajaCliente.dni.value.trim();
			var oCliente=oInmobiliaria.buscarCliente(dni);
			
			if(oCliente==null || typeof(oCliente) == "undefined") //Si el cliente es nulo o undefined es que no existe, dara un error
			{
				bValido=false;
				mensaje("Ese cliente no existe");
				
			}
			else 
			 {
			 	alert("Cliente borrado con éxito");
			 	oCliente=oInmobiliaria.borrarCliente(dni);
				
					var combo=bajaCliente.dni;
					anadirSelectCliente(combo);
				
			 	bajaCliente.reset();

			 }
			 
	}

}


function validarDatosBajaCliente() //VALIDAR SI EL DNI INTRODUCIDO baja
{
	var bValido=true;
	var sErrores = "";
	
	var bajaCliente=document.getElementsByName("bajaClienteForm")[0];
			
	var dni=bajaCliente.dni.value.trim();
					
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			bajaCliente.dni.focus();	
		}
	
		sErrores = "\n DNI incorrecto";
		
		//Marcar error
		bajaCliente.dni.className = "form-control error";
	
	}
	else 
	{
		
		var oCliente=oInmobiliaria.buscarCliente(dni);		//Buscamos el cliente con el dni	
		
		if(oCliente==null || typeof(oCliente) == "undefined") //Si el cliente es nulo o undefined es que no existe, dara un error
		{
			bValido = false;
			bajaCliente.dni.focus();	
			sErrores = "\n DNI no encontrado";
			//Marcar error
			bajaCliente.dni.className = "form-control error";
			
		}
		else
		{
			//Desmarcar error
			bajaCliente.dni.className = "form-control";	
		}
		
	}
	if(bValido==false)
	{		
		alert(sErrores);
	}
	
	return bValido;
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////LISTADOS////////////////////////////////////////////////////////


function mostrarlistadoCliente()
{
	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoClientes());
	oVentana.document.title="Listado de clientes";
}

function mostrarEmpleados() 
{

	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoEmpleados());
	oVentana.document.title="Listado de empleados";



}	

function mostrarVisitas()
{

	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoVisitas());
	oVentana.document.title="Listado de visitas";

}	

function mostrarVentas()
{
	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoVentas());
	oVentana.document.title="Listado de ventas";
	
	
}

function mostrarAlquileres()
{
	var oVentana = open("","","");
	oVentana.document.body.appendChild(oInmobiliaria.listadoAlquileres());
	oVentana.document.title="Listado de alquileres";
	
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////INMUEBLE/////////////////////////////////////////////////////////

function altaInmueble()
{
	if(validarInmueble()==true)
	{

		var formularioAltaInmueble=document.getElementsByName("inmueblesForm")[0];
		var id=formularioAltaInmueble.idInmueble.value;
		var agenteAsociado=formularioAltaInmueble.agenteAsociado.value;
		var sTipo="";
		var sEstado="";
		var m2=formularioAltaInmueble.m2.value;
		var direccion=formularioAltaInmueble.direccion.value;
		var descripcion=formularioAltaInmueble.descripcion.value;
		var tipo=document.getElementsByName("tipoInmueble");
		
		for(var i=0;i<tipo.length;i++)
	    {
			if(tipo[i].checked)
				sTipo=tipo[i].value;
	    }
			
			
			
			var oInmueble=new Inmueble(id, agenteAsociado, sTipo, m2, direccion, descripcion);
			
			if(oInmobiliaria.altaInmueble(oInmueble)==true)
			{
				
				mensaje("Alta de inmueble exitosa");
				var inmueblesForm=document.getElementsByName("inmueblesForm")[0];
				var combo=inmueblesForm.agenteAsociado;
				anadirSelectAgente(combo);
				formularioAltaInmueble.reset();
			}
			else
			{			
				mensaje("Error. El inmueble ya se ha dado de alta anteriormente");
				
			}

	}

}

function validarInmueble()
{
	var bValido=true;
	var formularioAltaInmueble=document.getElementsByName("inmueblesForm")[0];
	var estado=document.getElementsByName("estadoInmueble");
	var sEstado="";
	var sErrores="";
	var idInmueble=formularioAltaInmueble.idInmueble.value.trim();
	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(idInmueble) == false || idInmueble==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.idInmueble.focus();	
		}
	
		sErrores += "\n id Inmueble incorrecto";
		
		//Marcar error
		formularioAltaInmueble.idInmueble.className = "form-control error";
	
	}
	else 
	{
		var oInmueble=oInmobiliaria.buscarInmueble(idInmueble);
			
		if(oInmueble!=null || typeof(oInmueble) != "undefined") //Si el inmueble es diferente de nulo o de undefined es que existe, Dara un error
		{

			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.idInmueble.focus();	
			sErrores += "\n El inmueble ya se ha dado de alta";
			
		}
		else
		{	
			//Desmarcar error
			formularioAltaInmueble.idInmueble.className = "form-control";
		}
	}
	
	var agenteAsociado=formularioAltaInmueble.agenteAsociado.value.trim();
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(agenteAsociado) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.agenteAsociado.focus();	
		}
	
		sErrores = "\n Agente asociado incorrecto";
		
		//Marcar error
		formularioAltaInmueble.agenteAsociado.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		formularioAltaInmueble.agenteAsociado.className = "form-control";	
	}
	
	
	var m2=formularioAltaInmueble.m2.value;

	var oExpReg = /^\d+$/;
	
	if (oExpReg.test(m2) == false || m2==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.m2.focus();	
		}
	
		sErrores += "\n M2 incorrecto";
		
		//Marcar error
		formularioAltaInmueble.m2.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		formularioAltaInmueble.m2.className = "form-control";	
	}
	

	var direccion=formularioAltaInmueble.direccion.value;
	
	var oExpReg = /[a-zA-Z\s]{3,50}/;
	
	if (oExpReg.test(direccion) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.direccion.focus();	
		}
	
		sErrores += "\n Direccion incorrecta";
		
		//Marcar error
		formularioAltaInmueble.direccion.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		formularioAltaInmueble.direccion.className = "form-control";	
	}
	
	
	
	var descripcion=formularioAltaInmueble.descripcion.value;
	
	var oExpReg = /[a-zA-Z\s]{3,80}/;
	
	if (oExpReg.test(descripcion) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			formularioAltaInmueble.descripcion.focus();	
		}
	
		sErrores += "\n Descripcion incorrecta";
		
		//Marcar error
		formularioAltaInmueble.descripcion.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		formularioAltaInmueble.descripcion.className = "form-control";	
	}
	
	
	
	
	if(bValido==false)
	{
		
		alert(sErrores);
		
	}
	
	return bValido;
}



////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////MENSAJE//////////////////////////////////////////////

	function mensaje(sMensaje)
	{
		

		var oTextoMensaje = document.getElementsByName("textoMensaje")[0];
		
		while (oTextoMensaje.firstChild) 
		{
			oTextoMensaje.removeChild(oTextoMensaje.firstChild);
		}
		
		oTextoMensaje.appendChild(document.createTextNode(sMensaje));
		
		var oCapaMensaje = document.getElementsByName("mensajes")[0];
		
		oCapaMensaje.style.display = "block";
		
		var oCapaTransparente = document.getElementsByName("capaTransparente")[0];
		
		oCapaTransparente.style.zIndex = 1;
		
	}
	
	function ocultarMensaje()
	{
			
		var oCapaMensaje = document.getElementsByName("mensajes")[0];
		
		oCapaMensaje.style.display = "none";
		
		var oCapaTransparente = document.getElementsByName("capaTransparente")[0];
		
		oCapaTransparente.style.zIndex = -1;
	
	}
	

////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////EMPLEADO///////////////////////////////////////////////////////	
	
function altaEmpleadoAgente() 
{


	if (validarAltaEmpleadoAgente()==true) // Si los datos son validos
	{

		var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgenteForm")[0];
		var dni=altaEmpleadoAgente.dni.value.trim();
		var nombre=altaEmpleadoAgente.nombre.value.trim();
		var apellidos=altaEmpleadoAgente.apellidos.value.trim();
		var telefono=altaEmpleadoAgente.telefono.value.trim();
		var inmuebleAsociados=altaEmpleadoAgente.inmuebleAsociados.value.trim();
		var sede=altaEmpleadoAgente.sede.value.trim();
		
		var oEmpleado = new Agente(dni,apellidos,nombre,telefono,inmuebleAsociados,sede);
						
		if(oInmobiliaria.altaEmpleado(oEmpleado)) //Si damos de alta un empleado correctamente
		{
			mensaje("Alta de empleado exitosa"); //mensaje
			var altaEmpleadoAgenteForm=document.getElementsByName("altaEmpleadoAgenteForm")[0];
			var combo=altaEmpleadoAgenteForm.sede;
			anadirSelectSede(combo);	
			altaEmpleadoAgente.reset(); //Borramos los campos
			altaEmpleadoAgente.dni.className = "form-control ";
		}
		else
		{
			mensaje("Empleado existente"); //mensaje
			altaEmpleadoAgente.dni.className = "form-control error";
		}
	}


}


function validarAltaEmpleadoAgente()
{

	var bValido=true;
	var sErrores = "";
	var altaEmpleadoAgente=document.getElementsByName("altaEmpleadoAgenteForm")[0];		
	var dni=altaEmpleadoAgente.dni.value.trim();
	var nombre=altaEmpleadoAgente.nombre.value.trim();
	var apellidos=altaEmpleadoAgente.apellidos.value.trim();
	var telefono=altaEmpleadoAgente.telefono.value.trim();
	var inmuebleAsociados=altaEmpleadoAgente.inmuebleAsociados.value.trim();
	var sede=altaEmpleadoAgente.sede.value.trim();
	
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.dni.focus();	
		}
	
		sErrores += "\n DNI incorrecto";
		
		//Marcar error
		altaEmpleadoAgente.dni.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoAgente.dni.className = "form-control";	
	}
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.nombre.focus();	
		}
	
		sErrores += "\nNombre incorrecto";
		
		//Marcar error
			altaEmpleadoAgente.nombre.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoAgente.nombre.className = "form-control";	
	}
	
	
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.apellidos.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto";
		
		//Marcar error
			altaEmpleadoAgente.apellidos.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoAgente.apellidos.className = "form-control";	
	}
	
	
	var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.telefono.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto";
		
		//Marcar error
			altaEmpleadoAgente.telefono.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoAgente.telefono.className = "form-control";	
	}
	
	
	
	
	
	var oExpReg =  /^[0-9]+$/;
	
	if (oExpReg.test(inmuebleAsociados) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.inmuebleAsociados.focus();	
		}
	
		sErrores += "\n Inmueble incorrecto";
		
		//Marcar error
		altaEmpleadoAgente.inmuebleAsociados.className = "form-control error";
	
	}
	
	else 
	{
	
	
		altaEmpleadoAgente.inmuebleAsociados.className = "form-control";	
	}
	
	
	if (sede==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoAgente.sede.focus();	
		}
	
		sErrores += "\n Sede incorrecta";
		
		//Marcar error
		altaEmpleadoAgente.sede.className = "form-control error";
	
	}
	
	else 
	{
	
	
		altaEmpleadoAgente.sede.className = "form-control";	
	}


	//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	
	
	return bValido;

}



function altaEmpleadoJefeSede() 
{
	if (validarAltaEmpleadoJefeSede()==true) // Si los datos son validos
	{
		var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSedeForm")[0];			
		var dni=altaEmpleadoJefeSede.dni.value.trim();
		var nombre=altaEmpleadoJefeSede.nombre.value.trim();
		var apellidos=altaEmpleadoJefeSede.apellidos.value.trim();
		var telefono=altaEmpleadoJefeSede.telefono.value.trim();
		var numEmpleado=altaEmpleadoJefeSede.numEmpleado.value.trim();
		var oEmpleado = new JefeSede(dni,apellidos,nombre,telefono,numEmpleado);
		
		if(oInmobiliaria.altaEmpleado(oEmpleado)) //Si damos de alta un empleado correctamente
		{
			mensaje("Alta de empleado exitosa"); //mensaje
			
				altaEmpleadoJefeSede.reset();
					altaEmpleadoJefeSede.dni.className = "form-control ";
	 //Borramos los campos
		}
		else
		{
			mensaje("empleado existente"); //mensaje
			altaEmpleadoJefeSede.dni.className = "form-control error";

		}
		
	}
}


function validarAltaEmpleadoJefeSede()
{

	var bValido=true;
	var sErrores = "";

	var altaEmpleadoJefeSede=document.getElementsByName("altaEmpleadoJefeSedeForm")[0];			
	var dni=altaEmpleadoJefeSede.dni.value.trim();
	var nombre=altaEmpleadoJefeSede.nombre.value.trim();
	var apellidos=altaEmpleadoJefeSede.apellidos.value.trim();
	var telefono=altaEmpleadoJefeSede.telefono.value.trim();
	var numEmpleado=altaEmpleadoJefeSede.numEmpleado.value.trim();
	var oEmpleado = new JefeSede(dni,apellidos,nombre,telefono,numEmpleado);
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoJefeSede.dni.focus();	
		}
	
		sErrores += "\n DNI incorrecto";
		
		//Marcar error
		altaEmpleadoJefeSede.dni.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoJefeSede.dni.className = "form-control";	
	}
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoJefeSede.nombre.focus();	
		}
	
		sErrores += "\n Nombre incorrecto";
		
		//Marcar error
			altaEmpleadoJefeSede.nombre.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoJefeSede.nombre.className = "form-control";	
	}
	
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoJefeSede.apellidos.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto";
		
		//Marcar error
			altaEmpleadoJefeSede.apellidos.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoJefeSede.apellidos.className = "form-control";	
	}

	var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoJefeSede.telefono.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto";
		
		//Marcar error
			altaEmpleadoJefeSede.telefono.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoJefeSede.telefono.className = "form-control";	
	}
	
	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(numEmpleado) == false || numEmpleado==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaEmpleadoJefeSede.numEmpleado.focus();	
		}
	
		sErrores += "\n Número de empleados incorrecto";
		
		//Marcar error
		altaEmpleadoJefeSede.numEmpleado.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaEmpleadoJefeSede.numEmpleado.className = "form-control";	
	}


	//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	return bValido;

}





////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////BORRAR/////////////////////////////////////////////////////////



function borrarDatos()
{
	var formularios=document.querySelectorAll("form");
	for(i=0;i<formularios.length;i++)
	{
		formularios[i].reset();
	}
	
	campos=document.querySelectorAll(".error");
	for(i=0;i<campos.length;i++)
	{
		campos[i].className="form-control";
	}
	
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////VISITA/////////////////////////////////////////////////////////


function altaVisita()
{

	if (validarAltaVisita()==true) // Si los datos son validos
	{

		var altaVisita=document.getElementsByName("visitaForm")[0];
		var id=altaVisita.id.value.trim();

		var inmueble=altaVisita.inmueble.value.trim();
		var agente=altaVisita.agente.value.trim();
		var dia=altaVisita.cboDiaVisita.value.trim();
		var mes=altaVisita.cboMesVisita.value.trim();
		var ano=altaVisita.cboAnoVisita.value.trim();
		var hora=altaVisita.cboHoraVisita.value.trim();
		var minuto=altaVisita.cboMinutoVisita.value.trim();
		var estado=altaVisita.estado.value.trim();
							
		if(dia<10) //Si el dia es menor que 10, le a񡤩mos un 0, para  que salga con el formato dd
		{
			dia="0"+dia;
		}
		if(mes<10) //Si el mes es menor que 10, le a񡤩mos un 0, para  que salga con el formato mm

		{
			mes="0"+mes;
		}
		var d=ano+"-"+mes+"-"+dia;	 //aaaa-mm-dd
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);		//Creamos la fecha


		if(hora<10) //Si el dia es menor que 10, le a񡤩mos un 0, para  que salga con el formato dd
		{
			hora="0"+hora;
		}
		
		if(minuto<10) //Si el mes es menor que 10, le a񡤩mos un 0, para  que salga con el formato mm
		{
			minuto="0"+minuto;
		}
				
		var tiempo= hora +" : "+ minuto;
					
		var oVisita = new Visita(id,inmueble,agente,fecha,tiempo,estado);

		if(oInmobiliaria.altaVisita(oVisita)) //Si damos de alta un cliente correctamente
		{
			mensaje("Alta de visita exitosa"); //mensaje
			altaVisita.id.className = "form-control";
			
			var visitaForm=document.getElementsByName("visitaForm")[0];
			var combo=visitaForm.inmueble;
			anadirSelectInmueble(combo)

			var combo=visitaForm.agente;
			anadirSelectAgente(combo);

			
			altaVisita.reset(); //Borramos los campos
		}
		else
		{
			mensaje("visita existente"); //mensaje
			altaVisita.id.className = "form-control error";
			altaVisita.id.focus();	
		}
			
	}
			
}




function validarAltaVisita()
{
	var bValido=true;
	var sErrores = "";
	var altaVisita=document.getElementsByName("visitaForm")[0];
	var id=altaVisita.id.value.trim();
	var inmueble=altaVisita.inmueble.value.trim();
	var agente=altaVisita.agente.value.trim();
	var dia=altaVisita.cboDiaVisita.value.trim();
	var mes=altaVisita.cboMesVisita.value.trim();
	var ano=altaVisita.cboAnoVisita.value.trim();
	var hora=altaVisita.cboHoraVisita.value.trim();
	var minuto=altaVisita.cboMinutoVisita.value.trim();
	var estado=altaVisita.estado.value.trim();
		
	var oExpReg = /^[0-9]+$/;
	
	if (oExpReg.test(id) == false || id==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVisita.id.focus();	
		}
	
		sErrores += "\n  Id incorrecto";
		
		//Marcar error
		altaVisita.id.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaVisita.id.className = "form-control";	
	}

				
	var oExpReg =  /^[0-9]+$/;
	
	if (oExpReg.test(inmueble) == false || inmueble==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVisita.inmueble.focus();	
		}
	
		sErrores += "\n  Inmueble incorrecto";
		
		//Marcar error
		altaVisita.inmueble.className = "form-control error";
	
	}
	else 
	{
		
		//Desmarcar error
		altaVisita.inmueble.className = "form-control";	
	}
	
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;

	
	if (oExpReg.test(agente) == false || agente==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVisita.agente.focus();	
		}
	
		sErrores += "\n  Agente incorrecto";
		
		//Marcar error
		altaVisita.agente.className = "form-control error";
	
	}
	else 
	{
		
		//Desmarcar error
		altaVisita.agente.className = "form-control";	
	}


			//fecha
			
	var dias=document.querySelector("#form_birthday_day").value;
	
	if(dias==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#form_birthday_day").focus();		
		}
	
		sErrores += "\n Elija un dia";
		
		//Marcar error
		document.querySelector("#form_birthday_day").className = "form-control error";

	}
	else 
	{
		//Desmarcar error
		document.querySelector("#form_birthday_day").className = "form-control ";	
	}
	
	var mes=document.querySelector("#form_birthday_month").value;
	
	if(mes==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#form_birthday_month").focus();		
		}
	
		sErrores += "\n Elija un mes";
		
		//Marcar error
		document.querySelector("#form_birthday_month").className = "form-control error";

	
	}
	else 
	{
		//Desmarcar error
		document.querySelector("#form_birthday_month").className = "form-control ";	
	}
	
	var year=document.querySelector("#form_birthday_year").value;
	
	if(year==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#form_birthday_year").focus();		
		}
	
		sErrores += "\n Elija un año";
		
		//Marcar error
		document.querySelector("#form_birthday_year").className = "form-control error";

	
	}
	else
	{
		//Desmarcar error
		document.querySelector("#form_birthday_year").className = "form-control ";	
	}
		
	if(dias>30)
	{
		
		if(mes=="2" || mes=="4" || mes=="6" || mes=="9" || mes=="11" )
		{
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#form_birthday_day").focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			document.querySelector("#form_birthday_day").className = "form-control error";
			
			
		}
		else
		{
			document.querySelector("#form_birthday_day").className = "form-control ";
			
		}
		
		
	}

	if(mes==2)
	{
		
		if(dias>28)
		{
			
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#form_birthday_day").focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			document.querySelector("#form_birthday_day").className = "form-control error";
			
			
		}
		else
		{
			document.querySelector("#form_birthday_day").className = "form-control ";
			
		}
	}	

	//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	return bValido;

}



////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////VENTAS/////////////////////////////////////////////////////////

function altaVenta()
{
	
	
	if(validarDatosAltaVenta()==true)
	{
		var VentasForm=document.getElementsByName("VentasForm")[0];
				
		var idInmuebleVenta=VentasForm.idInmuebleVenta.value.trim();
		var dniClienteVenta=VentasForm.dniClienteVenta.value.trim();
		var dia=VentasForm.cboDiaCompraFechaInicio.value.trim();
		var mes=VentasForm.cboMesCompraFechaInicio.value.trim();
		var ano=VentasForm.cboAnoCompraFechaInicio.value.trim();
		var precio=VentasForm.precioVenta.value.trim();
		
		var d=ano+"-"+mes+"-"+dia;	
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);		
		
		var oVenta=new Venta(idInmuebleVenta,dniClienteVenta,fecha,precio);
		
		
		if(oInmobiliaria.altaVenta(oVenta))
		{
			mensaje("Alta de venta exitosa"); //mensaje
			var VentasForm=document.getElementsByName("VentasForm")[0];
			var combo=VentasForm.idInmuebleVenta;
			anadirSelectInmueble(combo);

			var combo=VentasForm.dniClienteVenta;
			anadirSelectCliente(combo);
			VentasForm.reset(); //Borramos los campos
		}
		else
		{
			VentasForm.idInmuebleVenta.focus();	
			VentasForm.idInmuebleVenta.className = "form-control error";
			mensaje("Venta existente"); //mensaje
		}
	}
	
	
}

function validarDatosAltaVenta()
{
	var bValido=true;
	var altaVenta=document.getElementsByName("VentasForm")[0];
	var sErrores="";	
	
	
	var idInmuebleVenta=altaVenta.idInmuebleVenta.value.trim();
	

	
	if (idInmuebleVenta == 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVenta.idInmuebleVenta.focus();	
		}
	
		sErrores += " \n Inmueble incorrecto";
		
		//Marcar error
		altaVenta.idInmuebleVenta.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaVenta.idInmuebleVenta.className = "form-control";	
	}
	
	
	
	
	var dni=altaVenta.dniClienteVenta.value.trim();
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVenta.dniClienteVenta.focus();	
		}
	
		sErrores += " \n Cliente incorrecto";
		
		//Marcar error
		altaVenta.dniClienteVenta.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaVenta.dniClienteVenta.className = "form-control";	
	}
	
	
	
	var dias=document.querySelector("#dia").value;
	
	if(dias==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#dia").focus();		
		}
	
		sErrores += "\n Elija un dia";
		
		//Marcar error
		document.querySelector("#dia").className = "form-control error";

	}
	else 
	{
		//Desmarcar error
		document.querySelector("#dia").className = "form-control control";	
	}
	
	var mes=document.querySelector("#mes").value;
	
	if(mes==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#mes").focus();		
		}
	
		sErrores += "\n Elija un mes";
		
		//Marcar error
		document.querySelector("#mes").className = "form-control error";

	
	}
	else 
	{
		//Desmarcar error
		document.querySelector("#mes").className = "form-control ";	
	}
	
	var year=document.querySelector("#ano").value;
	
	if(year==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#ano").focus();		
		}
	
		sErrores += "\n Elija un año";
		
		//Marcar error
		document.querySelector("#ano").className = "form-control error";

	
	}
	else
	{
		//Desmarcar error
		document.querySelector("#ano").className = "form-control ";	
	}
		
	if(dias>30)
	{
		
		if(mes=="2" || mes=="4" || mes=="6" || mes=="9" || mes=="11" )
		{
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#dia").focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			document.querySelector("#dia").className = "form-control error";
			
			
		}
		else
		{
			document.querySelector("#dia").className = "form-control ";
			
		}
		
		
	}

	if(mes==2)
	{
		
		if(dias>28)
		{
			
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			document.querySelector("#dia").focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			document.querySelector("#dia").className = "form-control error";
			
			
		}
		else
		{
			document.querySelector("#dia").className = "form-control ";
			
		}
	}

	var precioVenta=altaVenta.precioVenta.value.trim();
		
	var oExpReg =  /^[0-9]+$/;
	
	if (oExpReg.test(precioVenta) == false || precioVenta==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaVenta.precioVenta.focus();	
		}
	
		sErrores += "\n Precio incorrecto";
		
		//Marcar error
		altaVenta.precioVenta.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaVenta.precioVenta.className = "form-control";	
	}	
	
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	
	return bValido;
}



////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////ALQUILER///////////////////////////////////////////////////////






function altaAlquiler()
{
	
	if(validarDatosAltaAlquiler()==true)
	{
		var alquilerForm=document.getElementsByName("alquilerForm")[0];
				
		var idInmuebleAlquiler=alquilerForm.idInmuebleAlquiler.value.trim();
		var dniClienteAlquiler=alquilerForm.dniClienteAlquiler.value.trim();
		var dia=alquilerForm.cboDiaAlquilerFechaInicio.value.trim();
		var mes=alquilerForm.cboMesAlquilerFechaInicio.value.trim();
		var ano=alquilerForm.cboAnoAlquilerFechaInicio.value.trim();
		var precio=alquilerForm.precioAlquiler.value.trim();
		var duracion=alquilerForm.duracion.value.trim();
		var d=ano+"-"+mes+"-"+dia;	
		var ms=Date.parse(d);		//Lo pasamos a milisegundos
		var fecha=new Date(ms);		//Creamos la fecha

		
		var oAlquiler=new Alquiler(idInmuebleAlquiler,dniClienteAlquiler,fecha,duracion,precio);
		
		
		if(oInmobiliaria.altaAlquiler(oAlquiler))
		{
			mensaje("Alta de alquiler exitosa"); //mensaje
	
			var combo=alquilerForm.idInmuebleAlquiler;
			anadirSelectInmueble(combo);	
			
			var combo=alquilerForm.dniClienteAlquiler;
			anadirSelectCliente(combo);
			
			alquilerForm.reset(); //Borramos los campos
			
		}
		else
		{
			mensaje("Alquiler existente"); //mensaje
		}
		
		
		
		
		
		
		
		
	}
	
	
	
	
}

function validarDatosAltaAlquiler()
{
	var bValido=true;
	var alquilerForm=document.getElementsByName("alquilerForm")[0];			
	
	var sErrores="";	
	
	
	var idInmuebleAlquiler=alquilerForm.idInmuebleAlquiler.value.trim();
		
	if (idInmuebleAlquiler == 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.idInmuebleAlquiler.focus();	
		}
	
		sErrores += " \n Inmueble incorrecto";
		
		//Marcar error
		alquilerForm.idInmuebleAlquiler.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		alquilerForm.idInmuebleAlquiler.className = "form-control";	
	}
	
	
	
	
	var dniClienteAlquiler=alquilerForm.dniClienteAlquiler.value.trim();
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dniClienteAlquiler) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.dniClienteAlquiler.focus();	
		}
	
		sErrores += " \n Cliente incorrecto";
		
		//Marcar error
		alquilerForm.dniClienteAlquiler.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		alquilerForm.dniClienteAlquiler.className = "form-control";	
	}
	
	
	
	var dia=alquilerForm.cboDiaAlquilerFechaInicio.value.trim();
	
	if(dia==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.cboDiaAlquilerFechaInicio.focus();		
		}
	
		sErrores += "\n Elija un dia";
		
		//Marcar error
		alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control error";

	}
	else 
	{
		//Desmarcar error
		alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control control";	
	}
	
	var mes=alquilerForm.cboMesAlquilerFechaInicio.value.trim();
	
	if(mes==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.cboMesAlquilerFechaInicio.focus();		
		}
	
		sErrores += "\n Elija un mes";
		
		//Marcar error
		alquilerForm.cboMesAlquilerFechaInicio.className = "form-control error";

	
	}
	else 
	{
		//Desmarcar error
		alquilerForm.cboMesAlquilerFechaInicio.className = "form-control ";	
	}
	
	var year=alquilerForm.cboAnoAlquilerFechaInicio.value.trim();
	
	if(year==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.cboAnoAlquilerFechaInicio.focus();		
		}
	
		sErrores += "\n Elija un año";
		
		//Marcar error
		alquilerForm.cboAnoAlquilerFechaInicio.className = "form-control error";

	
	}
	else
	{
		//Desmarcar error
		alquilerForm.cboAnoAlquilerFechaInicio.className = "form-control ";	
	}
		
	if(dia>30)
	{
		
		if(mes=="2" || mes=="4" || mes=="6" || mes=="9" || mes=="11" )
		{
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.cboDiaAlquilerFechaInicio.focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control error";
			
			
		}
		else
		{
			alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control ";
			
		}
		
		
	}

	if(mes==2)
	{
		
		if(dia>28)
		{
			
			
			if(bValido == true)
			{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.cboDiaAlquilerFechaInicio.focus();		
			}
	
			sErrores += "\n Elija una fecha valida";
		
			//Marcar error
			alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control error";
			
			
		}
		else
		{
			alquilerForm.cboDiaAlquilerFechaInicio.className = "form-control ";
			
		}
	}

	var duracion=alquilerForm.duracion.value.trim();
		
	var oExpReg =  /^[0-9]+$/;
	
	if (oExpReg.test(duracion) == false || duracion==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.duracion.focus();	
		}
	
		sErrores += "\n Duracion del contrato incorrecta";
		
		//Marcar error
		alquilerForm.duracion.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		alquilerForm.duracion.className = "form-control";	
	}	
	
	
	
	
	var precioAlquiler=alquilerForm.precioAlquiler.value.trim();
		
	var oExpReg =  /^[0-9]+$/;
	
	if (oExpReg.test(precioAlquiler) == false || precioAlquiler==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			alquilerForm.precioAlquiler.focus();	
		}
	
		sErrores += "\n Precio incorrecto";
		
		//Marcar error
		alquilerForm.precioAlquiler.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		alquilerForm.precioAlquiler.className = "form-control";	
	}	
	
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	
	return bValido;
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////COMBOS/////////////////////////////////////////////////////////



function anadirDiaVisita()
{
	var cboDiaVisita=document.getElementsByName("cboDiaVisita")[0];
	cboDiaVisita.length=0;
		for(var i=1;i<=30;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboDiaVisita.appendChild(option);
		}
	
	

}



function anadirMesVisita()
{
	var cboMesVisita=document.getElementsByName("cboMesVisita")[0];
	cboMesVisita.length=0;
		for(var i=1;i<=12;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboMesVisita.appendChild(option);
		}
	
	

}
function anadirAnoVisita()
{
	var cboAnoVisita=document.getElementsByName("cboAnoVisita")[0];
	cboAnoVisita.length=0;
		for(var i=2015;i<=2030;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboAnoVisita.appendChild(option);
		}
	
	

}

function anadirHoraVisita()
{
	var cboHoraVisita=document.getElementsByName("cboHoraVisita")[0];
	cboHoraVisita.length=0;
		for(var i=0;i<=23;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboHoraVisita.appendChild(option);
		}
	
	

}
function anadirMinutoVisita()
{
	var cboMinutoVisita=document.getElementsByName("cboMinutoVisita")[0];
	cboMinutoVisita.length=0;
		for(var i=0;i<=59;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboMinutoVisita.appendChild(option);
		}
	
	

}

function anadirDiaVenta()
{
	var cboDiaVenta=document.getElementsByName("cboDiaCompraFechaInicio")[0];
	cboDiaVenta.length=0;
		for(var i=1;i<=30;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboDiaVenta.appendChild(option);
		}
	
	

}



function anadirMesVenta()
{
	var cboMesVenta=document.getElementsByName("cboMesCompraFechaInicio")[0];
	cboMesVenta.length=0;
		for(var i=1;i<=12;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboMesVenta.appendChild(option);
		}
	
	

}
function anadirAnoVenta()
{
	var cboAnoVenta=document.getElementsByName("cboAnoCompraFechaInicio")[0];
	cboAnoVenta.length=0;
		for(var i=2015;i<=2030;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboAnoVenta.appendChild(option);
		}
	
	

}

function anadirDiaAlquiler()
{
	var cboDiaVenta=document.getElementsByName("cboDiaAlquilerFechaInicio")[0];
	cboDiaVenta.length=0;
		for(var i=1;i<=30;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboDiaVenta.appendChild(option);
		}
	
	

}



function anadirMesAlquiler()
{
	var cboMesVenta=document.getElementsByName("cboMesAlquilerFechaInicio")[0];
	cboMesVenta.length=0;
		for(var i=1;i<=12;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboMesVenta.appendChild(option);
		}
	
	

}

function anadirAnoAlquiler()
{
	var cboAnoVenta=document.getElementsByName("cboAnoAlquilerFechaInicio")[0];
	cboAnoVenta.length=0;
		for(var i=2015;i<=2030;i++)
		{
			
			var option =document.createElement("option");
			option.text=i;
			cboAnoVenta.appendChild(option);
		}
	
	

}


function anadirSelectCliente(combo)
{
	if ( combo.hasChildNodes() )
	{
		while ( combo.childNodes.length >= 1 )
		{
			combo.removeChild( combo.firstChild );
		}
	}
	var pd=document.createElement("OPTION");
	pd.setAttribute("value",0);
	pd.appendChild(document.createTextNode("--- Seleccione un cliente ---"));
	combo.appendChild(pd);	
	
	var arrayOptions=oInmobiliaria.optionClientes();
	
	for(i=0;i<arrayOptions.length;i++)
	{
		combo.appendChild(arrayOptions[i]);
	}
}


function anadirSelectAgente(combo)
{
	if ( combo.hasChildNodes() )
	{
		while ( combo.childNodes.length >= 1 )
		{
			combo.removeChild( combo.firstChild );
		}
	}
	var pd=document.createElement("OPTION");
	pd.setAttribute("value",0);
	pd.appendChild(document.createTextNode("--- Seleccione un agente ---"));
	combo.appendChild(pd);	
	
	var arrayOptions=oInmobiliaria.optionAgentes();
	
	for(i=0;i<arrayOptions.length;i++)
	{
		combo.appendChild(arrayOptions[i]);
	}
}

function anadirSelectSede(combo)
{
	if ( combo.hasChildNodes() )
	{
		while ( combo.childNodes.length >= 1 )
		{
			combo.removeChild( combo.firstChild );
		}
	}
	var pd=document.createElement("OPTION");
	pd.setAttribute("value",0);
	pd.appendChild(document.createTextNode("--- Seleccione una sede ---"));
	combo.appendChild(pd);	
	
	var arrayOptions=oInmobiliaria.optionSedes();
	
	for(i=0;i<arrayOptions.length;i++)
	{
		combo.appendChild(arrayOptions[i]);
	}
}


function anadirSelectJefe(combo)
{
	if ( combo.hasChildNodes() )
	{
		while ( combo.childNodes.length >= 1 )
		{
			combo.removeChild( combo.firstChild );
		}
	}
	var pd=document.createElement("OPTION");
	pd.setAttribute("value",0);
	pd.appendChild(document.createTextNode("--- Seleccione un jefe de sede ---"));
	combo.appendChild(pd);	
	
	var arrayOptions=oInmobiliaria.optionJefes();
	
	for(i=0;i<arrayOptions.length;i++)
	{
		combo.appendChild(arrayOptions[i]);
	}
}


function anadirSelectInmueble(combo)
{
	if (combo.hasChildNodes() )
	{
		while (combo.childNodes.length >= 1 )
		{
			combo.removeChild( combo.firstChild );
		}
	}
	var pd=document.createElement("OPTION");
	pd.setAttribute("value",0);
	pd.appendChild(document.createTextNode("--- Seleccione un inmueble ---"));
	combo.appendChild(pd);	
	
	var arrayOptions=oInmobiliaria.optionInmuebles();
	
	for(i=0;i<arrayOptions.length;i++)
	{
		combo.appendChild(arrayOptions[i]);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////COPIAR//////////////////////////////////////////////////////




function altaSede()
{
	if (validarAltaSede()==true) // Si los datos son validos
	{

		var altaSede=document.getElementsByName("sedeForm")[0];
		var id=altaSede.id.value.trim();
		var jefe=altaSede.jefeSede.value.trim();
		var numEmpleado=altaSede.numEmpleado.value.trim();
		var nombre=altaSede.nombreSede.value.trim();
		
		var oSede = new Sede(id,jefe,numEmpleado,nombre);
		if(oInmobiliaria.altaSede(oSede)) //Si damos de alta un cliente correctamente
		{
			mensaje("Alta de sede exitosa"); //mensaje
			altaSede.id.className = "form-control";
			
			var sedeForm=document.getElementsByName("sedeForm")[0];
			var combo=sedeForm.jefeSede;
			anadirSelectJefe(combo);	
			
			altaSede.reset(); //Borramos los campos
		}
		else
		{
			mensaje("Sede existente"); //mensaje
			altaSede.id.className = "form-control error";

		}
			
	}

}


function validarAltaSede()
{
	var bValido=true;
	var sErrores = "";
		
	var altaSede=document.getElementsByName("sedeForm")[0];
	var id=altaSede.id.value.trim();
	var jefe=altaSede.jefeSede.value.trim();
	var numEmpleado=altaSede.numEmpleado.value.trim();
	var nombre=altaSede.nombreSede.value.trim();
				
	var oExpReg = /^\d+$/;
	
	if (oExpReg.test(id) == false || id==0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaSede.id.focus();	
		}
	
		sErrores += "\n  ID incorrecto";
		
		//Marcar error
		altaSede.id.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaSede.id.className = "form-control";	
	}
	
	
	
			
		if(jefe!=0) //Si el jefe es diferente de 0 hemos escogido un jefe del combo, sino dara un error
		{
		altaSede.jefeSede.className = "form-control";	

	
						
		}
		else
		{	
			bValido = false;			//Desmarcar error
			sErrores += "\n Jefe de sede incorrecto";
			altaSede.jefeSede.className = "error  form-control";
		}

	
	
	
	
		var oExpReg = /^\d+$/;
	
	if (oExpReg.test(numEmpleado) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaSede.numEmpleado.focus();	
		}
	
		sErrores += "\n  Número de empleados incorrecto";
		
		//Marcar error
		altaSede.numEmpleado.className = "form-control error";
	
	}
else 
	{
		//Desmarcar error
		altaSede.numEmpleado.className = "form-control";	
	}

	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaSede.nombreSede.focus();	
		}
	
		sErrores += "\n Nombre incorrecto";
		
		//Marcar error
			altaSede.nombreSede.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaSede.nombreSede.className = "form-control";	
	}

			


//Resultado
	if (bValido == false)
	{	
		//Mostrar errores
		alert(sErrores);
	}
	
	return bValido;

}




function mostrarSedes()
{
	var oVentana = open("","","");	
	oVentana.document.body.appendChild(oInmobiliaria.listadoSedes());
	oVentana.document.title="Listado de sedes";

}


