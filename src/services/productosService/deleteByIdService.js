import {productosDao} from '../../daos/productosDao/index.js';
import config from '../../../config.js'

const deleteByIdService = async (id) => {
    try {
        if(config.isAdmin){
            id = parseInt(id)
            if (id <= 0){
                return false
            }else{
                const producto = await productosDao.deleteById(id);
                return producto
            }
        }else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export {deleteByIdService}