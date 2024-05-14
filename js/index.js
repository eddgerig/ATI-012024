document.addEventListener("DOMContentLoaded", function () {
    // Obtener idioma
    const lang = document.documentElement.lang; 
    
   
    // Cargar archivo JSON de configuración
  
      let configURL = "";
      if (lang === "es") {
          configURL = "/conf/configES.json";
      } else if (lang === "en") {
          configURL = "/conf/configEN.json";
      } else {
          configURL = "/conf/configES.json";
      }

  // configuracion
  fetch(configURL)
    .then((response) => response.json())
    .then((config) => {
      document.getElementById("curso").innerHTML = config.sitio.join(" ");

      console.log(config.sitio);

      // perfil
      fetch("/25858414/perfil.json")
        .then((response) => response.json())
        .then((perfil) => {
          document.getElementById("saludo").innerHTML =
            config.saludo + ", " + perfil.nombre;
          document.getElementById("copyright").innerHTML = config.copyRight;
        });
    })
    .catch((error) =>
      console.error("Error al cargar el archivo de configuración:", error)
    );

  // Cargar archivo JSON de estudiantes
  fetch("datos/index.json")
    .then((response) => response.json())
    .then((estudiantes) => {
      const listaEstudiantes = document.getElementById("listaEstudiantes");

      estudiantes.forEach((estudiante) => {
        const tarjeta = document.createElement("li");
        tarjeta.className = "tarjeta";

        const imagen = document.createElement("img");
        imagen.src = estudiante.imagen;
        imagen.alt = estudiante.nombre;

        const parrafo = document.createElement("p");
        parrafo.textContent = estudiante.nombre;

        // Obtener la CI
        const perfilID = estudiante.ci;
        tarjeta.setAttribute("data-id", perfilID);

        tarjeta.addEventListener("click", function () {
          window.location.href = `perfil.html?perfil=${perfilID}`;
        });

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(parrafo);
        listaEstudiantes.appendChild(tarjeta);
      });
    })
    .catch((error) =>
      console.error("Error al cargar el archivo de estudiantes:", error)
    );
});