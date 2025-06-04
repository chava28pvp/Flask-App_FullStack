document.addEventListener("DOMContentLoaded", function () {
  console.log("register.js cargado correctamente");

  const form = document.querySelector("#registerForm");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmInput = document.querySelector("#confirm-password");
  const errorBox = document.querySelector("#formErrors");

  let errorTimeout; // variable para controlar el timeout

  if (errorBox) {
    errorBox.classList.add("d-none");
    errorBox.innerHTML = "";
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      console.log("Formulario enviado");

      const errors = [];

      if (!username.value.trim())
        errors.push("El nombre de usuario es obligatorio.");
      if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value))
        errors.push("Correo electrónico inválido.");
      if (!password.value) errors.push("La contraseña es obligatoria.");
      if (password.value !== confirmInput.value)
        errors.push("Las contraseñas no coinciden.");

      if (errors.length > 0) {
        e.preventDefault();
        formErrors.innerHTML =
          "<ul>" + errors.map((e) => `<li>${e}</li>`).join("") + "</ul>";
        formErrors.classList.remove("d-none");
        formErrors.classList.add("show-danger"); // cambia color de fondo
      } else {
        formErrors.classList.add("d-none");
        formErrors.classList.remove("show-danger");
        formErrors.innerHTML = "";
      }
    });
  }
});
