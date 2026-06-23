const Item = require('../models/itemsModel')

const getAll = async (req, res) => {

    try {
        const items = await Item.find()
        res.json({ total: items.length, data: items })
    }
    catch (error) {
        res.status(500).json({ error: 'Error obteniendo los datos' })
    }
}

const getById = async (req, res) => {

    try {
        const id = req.params.id
        const item = await Item.findById(id)

        if (!item) {
            return res.status(404).json({ error: 'Item no encontrado' })
        }

        res.json(item)
    }
    catch (error) {
        res.status(500).json({ error: 'Error obteniendo los datos' })
    }
}

const create = async (req, res) => {

    try {
        const nuevoItem = new Item(req.body)
        console.log(nuevoItem)

        await nuevoItem.save()
        res.status(201).json(nuevoItem)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const update = async (req, res) => {

    try {
        const id = req.params.id

        const itemActualizado = await Item.findByIdAndUpdate(id, req.body)

        res.json(itemActualizado)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {

    try {
        const id = req.params.id
        const eliminado = await Item.findByIdAndDelete(id)

        if (!eliminado) {
            return res.status(404).json({ error: 'Item no encontrado' })
        }

        res.json({ msg: 'item eliminado!', data: eliminado })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}


class Estudiante {
    constructor(nombre, matricula, nota) {
        this.nombre = nombre
        this.matricula = matricula
        this.nota = nota
    }
}