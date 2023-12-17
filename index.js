// para manejar variables de ambiente
// import * as dotenv from "dotenv";
// dotenv.config();
import 'dotenv/config';

// importar manejador de errores y modulos propios
import { handleErrors } from "./database/errors.js";
import { verPosts, agregarPost, unPost, pool } from './database/consultas.js';

// Importar express y cors
import express from "express";
const app = express();

// middleware de cors y de parseo del body
import cors from "cors";
app.use(cors());
app.use(express.json());

// levantando servidor USANDO UN PUERTO PREDETERMINADO EN .ENV
// Se comprobó funcionamiento con Thunder Client
const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor listo en http://localhost:" + PORT);
});

/* const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
}) */

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

// GET para ver ruta raiz
// Funcionamiento comprobado con Thunder Client
app.get("/", (req, res) => {
    res.json({ ok: true, result: "Bienvenido(a) a nuestra página..." });
});

// GET para ver el contenido de la tabla Posts
// Comprobado con Thunder Client
app.get("/posts", async (req, res) => {
    try {
        const result = await verPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Lista de posts registrados.", result }); 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});


// GET búsqueda de un posts específico (basado en la tutoría)
// Sometido a pruebas con Thunder Client. Todo funciona bien
app.get("/posts/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await unPost(id);
        return res.status(200).json({ ok: true, message: "Registro existente", result });
    } catch (error) {
        console.log("Error proveniente de respuesta de funcion de consulta: ", error);
        console.log("Error Code proveniente de respuesta de funcion de consulta: ", error.code);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});



// POST para ingresar en post en la tabla Posts (visto en tutoría)
// Verificado con Thunder Client. Funciona bien
app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    console.log("valor req.body en la ruta /posts: ", req.body);

    try {
        const result = await agregarPost({titulo, img, descripcion, likes})
        return res.status(201).json({ ok: true, message: "Post agregado con éxito", result }); //respuesta del servidor 
    } catch (error) {
        console.log('Error mostrado', error);
        console.log("Error proveniente de respuesta de funcion de INSERTAR: ", error);
        console.log("Error Code proveniente de respuesta de funcion de INSERTAR: ", error.code);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});


// GET para ver ruta raiz
app.use("*", (req, res) => {
    res.json({ ok: false, result: "404 Página no Encontrada" });
});