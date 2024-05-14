document.addEventListener("DOMContentLoaded", function () {
  // URL
  const urlParams = new URLSearchParams(window.location.search);
  const perfilID = urlParams.get("perfil");
 
      // Obtener idioma
const lang = document.documentElement.lang; 

   
  // Realizar una solicitud fetch para obtener los datos del perfil
  if (perfilID) {
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
        // perfil

        fetch(`/${perfilID}/perfil.json`)
          .then((response) => response.json())
          .then((perfil) => {
            document.getElementById("nombre").innerHTML = perfil.nombre;
            document.title=perfil.nombre;
            document.getElementById("descripcion").innerHTML =
              perfil.descripcion;
            document.getElementById("color").innerHTML =
              config.color + ":" + perfil.color;
            document.getElementById("libro").innerHTML =
              config.libro + ":" + perfil.libro;
            document.getElementById("musica").innerHTML =
              config.musica + ":" + perfil.musica;
            document.getElementById("videojuego").innerHTML =
              config.video_juego + ":" + perfil.video_juego;
            document.getElementById("lenguajes").innerHTML =
              config.lenguajes + ":" + perfil.lenguajes;
            document.getElementById("contacto").innerHTML =
              config.email + ":" + perfil.email;

            console.log(config.sitio);
            // Crear una imagen
            const imagen = document.createElement("img");

            // Verificar formato PNG
            fetch(`/${perfilID}/${perfilID}.png`).then((response) => {
              if (response.ok) {
                imagen.src = `/${perfilID}/${perfilID}.png`;
              } else {
                // Si no verificar formato JPG
                fetch(`/${perfilID}/${perfilID}.jpg`).then((response) => {
                  if (response.ok) {
                    imagen.src = `/${perfilID}/${perfilID}.jpg`;
                  } 
                });
              }
            });

            imagen.alt = perfil.nombre;

            const profileElement = document.querySelector(".profile");
            const perfilElement = document.querySelector(".perfil");
            perfilElement.insertAdjacentElement("beforebegin", imagen);

           
            imagen.id = "foto";
            imagen.className = "foto";
          });
      });
  } else {
    
    console.error("No se ha proporcionado un perfil válido en el URL.");
  }
});
