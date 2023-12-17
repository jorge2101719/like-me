import pkg from 'pg';
const { Pool } = pkg;

// const accesoBD = {
//     host: 'localhost',
//     user: 'jorge',
//     password: '1234',
//     database: 'likeme',
//     allowExitOnIdle: true
// }

const accesoBD = {
    // host: process.env.PGHOST,
    // user: process.env.PGUSER,
    // password: process.env.PGPASSWORD,
    // database: process.env.PGDATABASE,
    // port: process.env.PGPORT,
    allowExitOnIdle: true
}

const pool = new Pool(accesoBD)

// GET

// Versión sencilla de verPosts
// const verPosts = async () => {
    // const { rows, command, rowCount } = await pool.query('SELECT * FROM posts;');
    // return rows;
// }

// Versión basada en lo visto en tutoría
const verPosts = async () => {
    const { rows, command, rowCount } = await pool.query("SELECT * FROM posts");//destructuring
    console.log("----------------------------------------------")
    console.log("Instruccion procesada: ", command)
    console.log("Filas procesadas: ", rowCount)
    console.log("informacion obtenida: ", rows)
    console.log("----------------------------------------------")
    
    return rows; //respuesta de la funcion
};

// Prueba de la función verPosts(). Comprobada y funcionando.
//  verPosts()

// Versión sencilla de unPost
// const unPost = asycn (id) => {
    // const {rows } = await pool.query('SELECT * FROM posts WHERE id = #1', [id]);
    // return rows[0]
// }


// Busca un registro en específico, si existiere (versión basada en la tutoría)
// Verificada con Thunder Client
const unPost = async (id) => {

    const text = "SELECT * FROM posts WHERE id = $1";
    const { rows, command, rowCount } = await pool.query(text, [id]); //destructuring
    console.log("----------------------------------------------")
    console.log("Instruccion procesada: ", command)
    console.log("Filas procesadas: ", rowCount)
    console.log("Informacion obtenida ", rows)
    console.log("----------------------------------------------")

    // validacion por si retorna rows vacio
    if (rows.length === 0) {
        throw { code: "404" }; //respuesta de la funcion
    }
    
    return rows[0]  //respuesta de la funcion
};

// Prueba de la función unPost(). Comprobada y funcionando
// unPost(1)
// unPost(2)



// POST (versión basada en la tutoría). Comprobada y funcionando
const agregarPost = async ({titulo, img, descripcion, likes}) => {
    if(!titulo || !img || !descripcion || !likes) {
        throw { code: '400' };
    }

    const consulta = 'INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *'
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(consulta, values)
    console.log('Post agregado con éxito')

    return result.rows[0]
}

// Compruebo que la función hace lo que debe en Thunder Client. Funciona.
// agregarPost('Capitán Futuro', 'ImagenCapitánFuturo', 'La justicia del mañana', 1)
// agregarPost('Pikachú', 'ImagenPikachú', 'El Poke más famoso', 20)

export { verPosts, agregarPost, unPost, pool }