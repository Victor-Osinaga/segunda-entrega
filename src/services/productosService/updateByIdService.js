import {productosDao} from '../../daos/productosDao/index.js';
import config from '../../../config.js'

const updateByIdService = async (body, id) => {
    try {
        if(config.isAdmin){
            id = parseInt(id)
            if (id <= 0){
                return false
            }else{
                if(!body){
                    return undefined
                }else{
                    const producto = await productosDao.updateById(body, id);
                    return producto
                }
            }
        }else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export {updateByIdService}