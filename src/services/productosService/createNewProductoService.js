import {productosDao} from '../../daos/productosDao/index.js';
import config from '../../../config.js'

const createNewProductoService = async (req) => {
    try {
        const { body } = req;
        if (config.isAdmin){
            if (
                !body.nombre ||
                !body.descripcion ||
                !body.codigo ||
                !body.foto ||
                !body.precio ||
                !body.stock
            ){
                return 
            }
            let data = await productosDao.getAll()
            let id= !data.length ? 1 : parseInt(data[data.length - 1].id) + 1;
            const newProducto = {
                id: parseInt(id),
                nombre: body.nombre,
                descripcion: body.descripcion,
                codigo: body.codigo,
                foto: body.foto,
                precio: body.precio,
                stock: body.stock,
                timestamp: new Date().toLocaleString('en-US', {timeZone: 'UTC'})
            }

            let result= true;
            data.forEach(e=>{
                if(e.nombre == newProducto.nombre){
                    return result = null
                }
            })
            if(result){
                const createdNewProducto = await productosDao.createNewProducto(newProducto)
                return createdNewProducto
            }
        }else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}

export {createNewProductoService}