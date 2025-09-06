import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();


const dataBasePath = path.resolve("./productos.json") // en esta variable, se almacena la ruta del archivo.json


app.use(express.json())

// FUNCIONES

// NOTA: se optó por fs asíncronos utilizando promesas, para un mejor manejo de datos en el futuro

// readData: permite la lectura de los datos presentes en el archivo.json. En caso de no haber, se crea uno vacío.
const readData = async () => {
    try {
        const data = await fs.readFile(dataBasePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log("No existe la base de datos indicada. Se procederá a crearla");
        fs.writeFile(dataBasePath, "[]", "utf-8")
    }
};

// writeData: permite escribir nuevos datos al archivo.json
const writeData = async (data) => {
    try {
        await fs.writeFile(dataBasePath, JSON.stringify(data), "utf-8");
    } catch (error) {
        console.log(error);
    }
}

// OPERACIONES CRUD

// GET 1: obtener la lista de productos cargados en el archivo.json
app.get("/productos", async (req, res) => {
    const productos = await readData();
    res.json(productos);
});

// GET 2: obtener un producto especifico, indicado por su ID
app.get("/productos/:id", async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);
    const producto = data.find(producto => producto.id === id);

    // el ID ingresado no coincide con ningun producto
    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
})


// POST: cargar un nuevo producto al archivo.json
app.post("/productos", async (req, res) => {
    const productos = await readData();
    const body = req.body; // almacena los datos ingresados en la petición HTTP

    // primero se valida que ambos datos estén presentes antes de continuar
    if (!body.nombre || !body.precio) {
        return res.status(400).json({ mensaje: "Debe ingresar nombre y precio." });
    }

    const precioNum = Number(body.precio); // convierte a número si es string

    // se valida si el nombre es un String y si precioNum corresponde a un número 
    if (typeof body.nombre !== "string" || isNaN(precioNum)) {
        res.status(400).json({ mensaje: "Asegurese de ingresar datos válidos. (Nombre debe ser texto y Precio numero)" });
        return;
    }

    const maxId = productos.reduce((max, producto) => Math.max(max, producto.id), 0); // se obtiene el ID con el máximo valor númerico
    const productoNuevo = {
        id: maxId + 1,
        nombre: body.nombre,
        precio: precioNum
    };


    productos.push(productoNuevo); // se agrega el nuevo producto al array de productos
    writeData(productos); //se actualizan los datos del archivo.json

    res.status(201).json({ mensaje: "Producto agregado con éxito", producto: productoNuevo });
});

// DELETE: borrar un producto especifico, indicado por su ID
app.delete("/productos/:id", async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);

    const productoIndex = data.findIndex((producto) => producto.id === id);

    // no se encontró ningún producto asociado al indice ingresado
    if (productoIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    data.splice(productoIndex, 1); // el producto indicado es borrado del array
    writeData(data); // se actualizan los datos del archivo.json
    
    res.json({ message: "Se eliminó el producto de forma correcta" });
});

// el servidor es lanzado
app.listen(3000, () => {
    console.log("Abriendo el server: http://localhost:3000/productos");
});


