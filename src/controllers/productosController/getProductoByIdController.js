import * as productosService from '../../services/productosService/index.js';

const getProductoByIdController = async (req, res)=> {
    try {
        const producto = await productosService.getProductoByIdService(req.params.productoId);
        if(!producto) {
            res.send({ status: 'Error', data: 'Id indexistente o no válido' })
        }else{
            res.send({ status: 'OK', data: producto })
        }
    } catch (error) {
        console.log(error);
    }
}

export {getProductoByIdController}