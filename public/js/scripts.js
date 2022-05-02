if (document.querySelector(".container-form-responder")) {
  const containerFormResponder = document.querySelector(
    ".container-form-responder"
  );
  const btnResponder = document.querySelector(".button");
  const btnCancelarResponder = document.querySelector(
    ".btn-cancelar-responder"
  );

  btnResponder.addEventListener("click", () => {
    containerFormResponder.classList.add("container-form-responder-revelado");
  });
  btnCancelarResponder.addEventListener("click", () => {
    containerFormResponder.classList.remove(
      "container-form-responder-revelado"
    );
  });
}