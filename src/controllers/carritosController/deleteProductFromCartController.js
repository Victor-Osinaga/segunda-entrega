import * as carritosService from '../../services/carritosService/index.js'

const deleteProductFromCartController = async (req, res)=> {
    try {
        const newCart = await carritosService.deleteProductFromCartService(req);
        if(newCart){
            res.status(201).json({ status: "OK", data: newCart})
        }else{
            res.status(201).json({ status: "Error", data: `Id no válido, revise el Id: ${req.params.carritoId}, ${req.params.productoId}`})
        }
        
    } catch (error) {
        console.log(error);
    }
}

export {deleteProductFromCartController}
