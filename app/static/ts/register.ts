document.addEventListener('DOMContentLoaded', () => {
  const formts = document.querySelector('#registerForm') as HTMLFormElement;
  const usernamets = document.querySelector('#username') as HTMLInputElement;
  const emailts = document.querySelector('#email') as HTMLInputElement;
  const passwordts = document.querySelector('#password') as HTMLInputElement;
  const confirmInputts = document.querySelector('#confirm-password') as HTMLInputElement;
  const errorBoxts = document.querySelector('#formErrors') as HTMLDivElement;

  formts?.addEventListener('submit', (e) => {
    const errors: string[] = [];

    if (!usernamets.value.trim()) errors.push('El nombre de usuario es obligatorio.');
    if (!emailts.value.trim() || !/^\S+@\S+\.\S+$/.test(emailts.value)) errors.push('Correo electrónico inválido.');
    if (!passwordts.value) errors.push('La contraseña es obligatoria.');
    if (passwordts.value !== confirmInputts.value) errors.push('Las contraseñas no coinciden.');

    if (errors.length > 0) {
      e.preventDefault();
      if (errorBoxts) {
        errorBoxts.innerHTML = `<ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
        errorBoxts.classList.remove('d-none');
      }
    } else {
      errorBoxts?.classList.add('d-none');
    }
  });
});
