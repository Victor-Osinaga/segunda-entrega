import * as carritosService from '../../services/carritosService/index.js'

const deleteAllProductsFromCartController = async (req, res)=> {
    try {
        const emptyCart = await carritosService.deleteAllProductsFromCartService(req);
        if(emptyCart){
            res.status(201).json({ status: "OK", data: `Carrito con Id: ${req.params.carritoId} vaciado correctamente`})
        }else{
            res.status(201).json({ status: "Error", data: `Id no válido, revise el Id: ${req.params.carritoId}`})
        }
        
    } catch (error) {
        console.log(error);
    }
}

export {deleteAllProductsFromCartController}