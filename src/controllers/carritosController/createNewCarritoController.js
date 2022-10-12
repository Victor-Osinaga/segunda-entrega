import * as carritosService from '../../services/carritosService/index.js'

const createNewCarritoController = async (req, res)=> {
    try {
        const createdCarrito = await carritosService.createNewCarritoService();
        res.status(201).json({ status: "OK", data: `Carrito creado, ID: ${createdCarrito}`})
        
    } catch (error) {
        console.log(error);
    }
}

export {createNewCarritoController}

