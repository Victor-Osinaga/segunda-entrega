import {carritosDao} from '../../daos/carritosDao/index.js';

const deleteAllProductsFromCartService = async (req) => {
    try {
        const carritoId = parseInt(req.params.carritoId)
        if(carritoId <= 0){
            return false
        }else{
            const emptyCart = await carritosDao.deleteAllProductsFromCart(carritoId);
            return emptyCart
        }
    } catch (error) {
        console.log(error);
    }
}
export {deleteAllProductsFromCartService}