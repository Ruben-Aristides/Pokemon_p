tareas();

console.log(document.forms.formRegistrar.pokemon.value);
//Registrar
document.querySelector("#formRegistrar").addEventListener('submit',function(e)
{
    e.preventDefault();
    let data = {
        pokemon : document.forms.formRegistrar.pokemon.value,
        tipo : document.forms.formRegistrar.tipo.value,
        evolucion : document.forms.formRegistrar.evolucion.value,
        habilidad1 : document.forms.formRegistrar.habilidad1.value,
        habilidad2 : document.forms.formRegistrar.habilidad2.value
    }
    console.log(data);
    fetch('/users',{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response =>{
        alert("Tarea insertada con exito")
    })
    .catch(err=> {
        alert("Por favor revise los datos ingresados");
        console.log(err);
    });
});
//Actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        pokemon : document.forms.formUpdate.pokemonU.value,
        tipo : document.forms.formUpdate.tipoU.value,
        evolucion : document.forms.formUpdate.evolucionU.value,
        habilidad1 : document.forms.formUpdate.habilidad1U.value,
        habilidad2 : document.forms.formUpdate.habilidad2U.value
    }
    //peticion
    fetch('/users/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea Actualizada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//tareas
function tareas() {
    fetch('/users',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
                filas = filas + `<tr>
           <td>${element.pokemon}</td>
           <td>${element.tipo}</td><td>
           <td>${element.evolucion}</td>
           <td>${element.habilidad1}</td>
           <td>${element.habilidad2}</td>
           <td>
            <a href="/users/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
            <a href="/users/${element._id}" class="delete btn btn-danger">Eliminar</a>
           </td>
           </tr>`
            });
            document.querySelector("#filas").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.userU.value = response.userName;
                            document.forms.formUpdate.rolU.value = response.rol;
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Tarea eliminada con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al eliminar la tarea");
                            console.log(err);
                        });
                });
            })
        })
}