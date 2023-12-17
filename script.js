const tbody = document.querySelector("tbody")

const getPosts = async () => {
    alert("entro en getPost para conexion a Backend")
    const res = await fetch("http://localhost:3000/productos") //conectando a una ruta del backend
    const posts = await res.json()
    return posts
}

const fillTableWithPots = async () => {
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