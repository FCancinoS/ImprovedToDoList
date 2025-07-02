let currentSession = null;

$(document).ready(function () {
  $(document).on("click", "#button", addItem);
  $(document).on("click", ".revisado", toggleCheck);
  $(document).on("click", ".borrar", deleteItem);

  $("#crear").on("click", crearSesion);
  $("#entrar").on("click", entrarSesion);
});

function crearSesion(e) {
  e.preventDefault();
  const codigo = generarCodigo();
  currentSession = codigo;
  window.location.hash = codigo;
  $("#session-id").remove(); // Limpia si ya existe
  $(".container h2").after(`<p id="session-id">ID de sesión: ${codigo}</p>`);
  cargarSesion();
}

function entrarSesion(e) {
  e.preventDefault();
  const codigo = $("#codigo").val().trim();
  if (codigo === "") return;
  currentSession = codigo;
  window.location.hash = codigo;
  $("#session-id").remove();
  $(".container h2").after(`<p id="session-id">ID de sesión: ${codigo}</p>`);
  cargarSesion();
}

function cargarSesion() {
  $(".session-bar").hide();
  $(".container").fadeIn();
  $("ul").empty();

  const sesionRef = window.ref(window.db, `listas/${currentSession}`);
  window.onValue(sesionRef, (snapshot) => {
    $("ul").empty();
    snapshot.forEach((child) => {
      const key = child.key;
      const { texto, revisado } = child.val();
      const li = $(`
        <li data-id="${key}" class="${revisado ? 'ready' : ''}">
          <p>${texto}</p>
          <div>
            <button class="revisado"><i class="fas fa-check"></i></button>
            <button class="borrar"><i class="fas fa-trash-alt"></i></button>
          </div>
        </li>
      `);
      revisado ? $("ul").append(li) : $("ul").prepend(li);
    });
  });
}

function addItem(e) {
  e.preventDefault();
  const texto = $("#entrada").val().trim();
  if (!texto || !currentSession) return;

  const sesionRef = window.ref(window.db, `listas/${currentSession}`);
  window.push(sesionRef, { texto, revisado: false });
  $("#entrada").val("");
}

function toggleCheck(e) {
  e.preventDefault();
  const li = $(this).closest("li");
  const key = li.data("id");
  const checked = li.hasClass("ready");

  window.update(window.ref(window.db, `listas/${currentSession}/${key}`), {
    revisado: !checked
  });
}

function deleteItem(e) {
  e.preventDefault();
  const key = $(this).closest("li").data("id");
  window.remove(window.ref(window.db, `listas/${currentSession}/${key}`));
}

function generarCodigo() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
