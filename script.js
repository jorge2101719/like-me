const tbody = document.querySelector("tbody")

const getPosts = async () => {
    alert("entro en getPosts para conexion a Backend")
    try {
        console.log('Dentro de getPosts')
        const res = await fetch("http://localhost:3000") //conectando a una ruta del backend
        const posts = await res.json()
        return posts
    } catch(error) {
        console.log(error)
    }
}

const fillTableWithPosts = async () => {
    const posts = await getPosts()
    tbody.innerHTML = ""
    posts.result.forEach(post => {
        tbody.innerHTML += `
                <tr>
                    <th>${post.id}</th>
                    <td>${post.titulo}</td>
                    <td>${post.imagen}</td>
                    <td>${post.descripcion}</td>
                </tr >
                `
    })
}

fillTableWithPosts()