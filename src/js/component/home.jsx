import React, {useState, useEffect} from "react";



//create your first component
const Home = () => {

	const[lista,setLista]=useState([])
	const[seved,setSeved]=useState("")



function createUser(){ //creo el usuario se usa una vez
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/3agusabrru`,
    {method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify([])
})
.then((response)=>response.json())
.then((response)=>console.log(response))
}

useEffect(() =>{  // Primero creo el usuario y luego lo uso para traer la lista
	// createUser()
	getLista()
}, [])

useEffect(() => {    //Modifico la lista
    uptdateLista()
},[lista])

function uptdateLista(){   //Guardo la lista en el usuario
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/3agusabrru`,
	{method: 'PUT',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(lista)
  })
	.then((response)=>response.json())
	.then((response)=>console.log(response))
}

function getLista(){                    //Traigo la lista del usuario
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/3agusabrru`,
	{method: 'GET'
  })
	.then((response)=>response.json())
	.then((response)=>setLista(response))
}

const guardarTarea=(e)=>{  //"crea" la lista
	e.preventDefault()
	setSeved("")
	setLista([...lista, { "label": seved, "done": false }])
}
console.log(lista)
console.log(seved)

const borrar =(posicion)=>{    //Borra los items de la lista
setLista(lista.filter((item, index) => index !== posicion));

	
}

return (
<>
<h1 className="d-flex justify-content-center">ToDoList</h1>
<form className="container" onSubmit={guardarTarea}>
<div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    {/*2. definimos el evento ochange en el input */}
	<input 
	type="text" 
	className="form-control" 
	id="exampleInputEmail1" 
	aria-describedby="emailHelp" 
	onChange={(e)=>{setSeved(e.target.value)}}/>
</div>

<ul className="list-group">
  {lista.map((item, index)=>(<li className="list-group-item" key={index}>{item.label}<button type="button" className="btn btn-outline-light" onClick={(()=>borrar(index))}>X</button></li>))}
</ul>
  

</form>

</>
	);
};

export default Home;