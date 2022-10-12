import {carritosDao} from '../../daos/carritosDao/index.js';

const getAllProductosFromCarritoService = async (id) => {
    id = parseInt(id)
    try {
        if(id <= 0){
            return false
        }else{
            const productosFromCarrito = await carritosDao.getProductosFromCart(id);
            return productosFromCarrito
        }
    } catch (error) {
        console.log(error);
    }
}

export {getAllProductosFromCarritoService}