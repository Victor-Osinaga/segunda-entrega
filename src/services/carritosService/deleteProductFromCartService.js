import {carritosDao} from '../../daos/carritosDao/index.js';

const deleteProductFromCartService = async (req) => {
    try {
        const productoId = parseInt(req.params.productoId)
        const carritoId = parseInt(req.params.carritoId)
        if(carritoId <= 0){
            return false
        }else{
            const newCart = await carritosDao.deleteProductFromCart(productoId, carritoId);
            return newCart
        }
    } catch (error) {
        console.log(error);
    }
}

export {deleteProductFromCartService}