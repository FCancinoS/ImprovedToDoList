// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAamr4cEpGYcHHhmDJ9a2EuVqeMDeoiuYg",
  authDomain: "market-list-566f4.firebaseapp.com",
  databaseURL: "https://market-list-566f4-default-rtdb.firebaseio.com",
  projectId: "market-list-566f4",
  storageBucket: "market-list-566f4.firebasestorage.app",
  messagingSenderId: "1090519932866",
  appId: "1:1090519932866:web:d77f70ab3e89d40202c05b",
  measurementId: "G-JH7X22EJQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


let currentSession = null;

// Mapeamos los botones y acciones del DOM
$(document).ready(function () {
  $(document).on("click", "#button", addItem);
  $(document).on("click", ".revisado", toggleCheck);
  $(document).on("click", ".borrar", deleteItem);

  // Manejadores de sesión
  $("#crear").on("click", crearSesion);
  $("#entrar").on("click", entrarSesion);
});

function crearSesion(e) {
  e.preventDefault();
  const codigo = generarCodigo();
  currentSession = codigo;
  window.location.hash = codigo;
  cargarSesion();
}

function entrarSesion(e) {
  e.preventDefault();
  const codigo = $("#codigo").val().trim();
  if (codigo === "") return;
  currentSession = codigo;
  window.location.hash = codigo;
  cargarSesion();
}

function cargarSesion() {
  $(".session-bar").hide();
  $(".container").fadeIn();
  $("ul").empty();

  const sesionRef = ref(db, `listas/${currentSession}`);
  onValue(sesionRef, (snapshot) => {
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

  const sesionRef = ref(db, `listas/${currentSession}`);
  push(sesionRef, { texto, revisado: false });
  $("#entrada").val("");
}

function toggleCheck(e) {
  e.preventDefault();
  const li = $(this).closest("li");
  const key = li.data("id");
  const checked = li.hasClass("ready");

  update(ref(db, `listas/${currentSession}/${key}`), {
    revisado: !checked
  });
}

function deleteItem(e) {
  e.preventDefault();
  const key = $(this).closest("li").data("id");
  remove(ref(db, `listas/${currentSession}/${key}`));
}

function generarCodigo() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
