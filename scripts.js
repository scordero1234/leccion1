const API = 'https://swapi.dev/api/people/'

function personaje(texto,  id) {
    
    const heading = document.createElement('h1');
    heading.textContent = 'Nombre '+id;
    heading.style.color = 'red';
    heading.style.fontSize = '24px';
    let div = document.createElement('div')
    let h1_texto = document.createTextNode(texto.name)
    let h1 = document.createElement('h1')
    h1.appendChild(h1_texto)
    div.appendChild(heading)
    div.appendChild(h1)

    let contenedor = document.getElementById('contenedor')
    contenedor.appendChild( div )
}

function obtener_personaje(id) {
    return new Promise((resolve, reject) => {
        fetch(`${API}${id}`)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`))
    })
}

let ids = []
for (let i=1; i<=15; i++) {
    ids.push(i)
}

let promesas = ids.map( id => obtener_personaje(id) )

// Promesas Encadenadas
Promise
    .all( promesas )
    .then( data => {
        for (let i=0; i<data.length; i++) {
            personaje( data[i],[i] )
        }
    } )