//Mapeamos los botones
$("#button").click(adder);//se le asigna la funcion adder al boton principal
$("div").on("click",".revisado", checker) //se le asigna la funcion de listo a su respectivo boton
$("div").on("click",".borrar", deleter);//se le asigna la funcion de borrar a su respectivo boton
//funciones para añadir articulo
function adder(e){
    e.preventDefault();
    var lista = $("ul");
    var nuevaEntrada = $("input").val();
    var nuevoArticulo = $('<li> <p>'+ nuevaEntrada +'</p> <div > <button class="revisado">check</button> <button class="borrar">delete</button> </div></li>')
    lista.append(nuevoArticulo);
}
//funcion para checar articulo
function checker(e){
    e.preventDefault();
    var padre = $(this).parent();
    padre.parent().toggleClass("ready");
}
//funcion para borrar articulo
function deleter(e){
    e.preventDefault();
    var padre = $(this).parent();
    padre.parent().remove();
}

