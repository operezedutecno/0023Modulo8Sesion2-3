const express = require("express")
const app = express()
const { v4: uuid} = require("uuid")
const port = 3000

app.use(express.json())

app.listen(port, () => console.log(`Servicio ejecutando por el puerto ${port}`))

const dispositivos = []

//Ruta para listar dispositivos
app.get("/dispositivos", (request, response) => {
    response.json({ success: true, message: "Listado de dispositivos", data: dispositivos })
})

app.get("/dispositivos/:id", (request, response) => {
    const id = request.params.id
    const fila = dispositivos.find(item => String(item.id) === String(id))
    if(!fila) {
        return response.status(404).json({ success: false, message: "Dispositivo no encontrado"})
    }
    response.json({ success: true, message: "Consulta exitosa", data: fila})
})


//Ruta para registrar dispositivos
app.post("/dispositivos", (request, response) => {
    const id = uuid().slice(0,8)
    const registrar = { id, ...request.body}
    dispositivos.push(registrar)
    response.status(201).json({ success: true, message: "Registro de dispositivo exitoso", data: registrar})
})


//Ruta para modificar toda la data de un registro
app.put("/dispositivos/:id", (request, response) => {
    const id = request.params.id
    const indice = dispositivos.findIndex(item => String(item.id) === String(id))
    if(!request.body.nombre) {
        return response.status(400).json({ success: false, message: "Falta ingresar el nombre"})
    }
    if(!request.body.tipo_dispositivo) {
        return response.status(400).json({ success: false, message: "Falta ingresar el tipo_dispositivo"})
    }
    if(indice === -1) {
        return response.status(404).json({ success: false, message: "Dispositivo no encontrado"})
    }
    const actualizar = { id, ...request.body}
    dispositivos[indice] = actualizar
    response.json({ success: true, message: "Dispositivo actualizado con éxito", data: actualizar})
})


app.delete("/dispositivos/:id", (request, response) => {
    const id = request.params.id
    const indice = dispositivos.findIndex(item => String(item.id) === String(id))
    if(indice === -1) {
        return response.status(404).json({ success: false, message: "Dispositivo no encontrado"})
    }
    const eliminado = dispositivos.splice(indice, 1)
    response.json({ success: true, message: "Dispositivo eliminado con éxito", data: eliminado })
})
