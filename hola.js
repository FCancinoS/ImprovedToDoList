// Mapeamos los botones
$(document).on("click", "#button", adder);
$(document).on("click", ".revisado", checker);
$(document).on("click", ".borrar", deleter);


// Función para añadir artículo
function adder(e) {
  e.preventDefault();
  const nuevaEntrada = $("input").val().trim();
  if (nuevaEntrada === "") return;
  const nuevoArticulo = $(`
    <li>
      <p>${nuevaEntrada}</p>
      <div>
        <button class="revisado"><i class="fas fa-check"></i></button>
        <button class="borrar"><i class="fas fa-trash-alt"></i></button>
      </div>
    </li>
  `);
  $("ul").append(nuevoArticulo);
  $("input").val("");
}

// Función para checar artículo
function checker(e) {
  e.preventDefault();
  const item = $(this).closest("li");
  const isReady = item.hasClass("ready");

  if (isReady) {
    item.removeClass("ready");
    $("ul").prepend(item); // volver arriba
  } else {
    item.addClass("ready");
    $("ul").append(item); // mover abajo
  }
}



// Función para borrar artículo
function deleter(e) {
  e.preventDefault();
  $(this).closest("li").remove();
}
