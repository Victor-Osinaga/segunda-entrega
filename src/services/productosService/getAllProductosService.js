import {productosDao} from '../../daos/productosDao/index.js';

const getAllProductosService = async () => {
    try {
        const allProductos = await productosDao.getAll();
        return allProductos
    } catch (error) {
        console.log(error);
    }
}

export {getAllProductosService}