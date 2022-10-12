import {productosDao} from '../../daos/productosDao/index.js';

const getProductoByIdService = async (id) => {
    try {
        id = parseInt(id)
        if (id <= 0){
            console.log("falsooo");
            return false
        }else{
            const producto = await productosDao.getProductoById(id);
            return producto
        }
    } catch (error) {
        console.log(error);
    }
}

export {getProductoByIdService}