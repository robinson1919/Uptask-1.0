
addEventListeners();

function addEventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

        if(usuario, password === "" ){
            // la validacion fallo
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Los 2 Campos son obligatorios!',
                
              })
              
        } else {
            // Ambos campos son correctos, mandar ejecutar Ajax


            // datos que se envian al servidor
            var datos = new FormData();
            datos.append('usuario', usuario);
            datos.append('password', password);
            datos.append('accion', tipo);

            // crear el llamado a ajax

            var xhr = new XMLHttpRequest();

            // abrir la conexion
            xhr.open('POST', 'inc/modelos/modelo-admin.php', true);

            // retorno de datos

            xhr.onload = function(){
                if(this.status === 200){
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    console.log(respuesta);
                    // Si la respuesta es correcta
                    if(respuesta.respuesta === 'correcto'){
                        // si es un nuevo usuario
                        if(respuesta.tipo === 'crear'){
                            Swal({
                                type: 'success',
                                title: 'Usuario creado',
                                text: 'El usuario se creo correctamente!'
                                
                            })
                        } else if(respuesta.tipo === 'login'){
                            Swal({
                                type: 'success',
                                title: 'Login Correcto',
                                text: 'Presiona OK para continuar!'                                
                            })
                            .then(resultado => {
                                if(resultado.value){
                                    window.location.href = 'index.php';
                                }
                            })
                        }

                    } else {
                        // Hubo un error
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Compruebe usuario y contraseña!'
                            
                        });
                    }
                }
            }
            
            // Enviar la peticion
            xhr.send(datos);







        }
}