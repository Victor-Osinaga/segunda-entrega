import * as carritosService from '../../services/carritosService/index.js'

const getAllProductosFromCarritoController = async (req, res)=> {
    try {
        const productosFromCarrito = await carritosService.getAllProductosFromCarritoService(req.params.carritoId);
        if(productosFromCarrito == false){
            res.send({ status: 'Error', data: 'Id del carrito no valido' })
        }else{
            res.send({ status: 'OK', data: productosFromCarrito.productos })
        }
    } catch (error) {
        console.log(error);
    }
}

export {getAllProductosFromCarritoController}