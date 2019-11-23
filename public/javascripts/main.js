tareas();

console.log(document.forms.formRegistrar.user.value);

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
        tareas();
    })
    .catch(err=> console.log(err))
});
function tareas()
{
    fetch('/users',
    {
        method:'GET'
    }).then(res=>res.json())
    .then(data=>{
       let filas = "";
       data.forEach(element => {
           console.log(element);
           filas = filas+`<tr>
           <td>${element.pokemon}</td>
           <td>${element.tipo}</td>
           <td>${element.evolucion}</td>
           <td>${element.habilidad1}</td>
           <td>${element.habilidad2}</td>
           <td>
            <a href="/users/${element._id}" class="btn btn-danger">Actualizar</a>
            <a href="/users/${element._id}" class="btn btn-warning">Eliminae</a>
           </td>
           </tr>`
       });
       document.querySelector("#filas").innerHTML = filas;
    })
}