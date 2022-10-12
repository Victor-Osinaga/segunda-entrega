import * as productosService from '../../services/productosService/index.js'

const getAllProductosController = async (req, res)=> {
    try {
        const allProductos = await productosService.getAllProductosService();
        res.send({ staus: 'OK', data: allProductos })
    } catch (error) {
        console.log(error);
    }
}

export {getAllProductosController}