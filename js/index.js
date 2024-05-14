document.addEventListener("DOMContentLoaded", function() {
    // Cargar archivo de configuración
    fetch("/reto5/conf/configES.json")
        .then(response => response.json())
        .then(config => {
           
            document.getElementById("curso").innerHTML = config.sitio.join(" ");
            
            console.log(config.sitio);

            // Cargar archivo de perfil
            fetch("/25858414/perfil.json")
                .then(response => response.json())
                .then(perfil => {
                   
                    document.getElementById("saludo").innerHTML = config.saludo + ", " + perfil.nombre;
                    
                })
                
        })
        .catch(error => console.error("Error al cargar el archivo de configuración:", error));
});
