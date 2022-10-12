import * as productosService from '../../services/productosService/index.js';

const deleteByIdController = async (req, res)=> {
    try {
        const producto = await productosService.deleteByIdService(req.params.productoId);
        if(producto == false) {
            res.send({ status: 'Error', data: 'Id inexistente o no válido' })
        }else if(producto == null){
            res.status(403).json({ error: `403 Forbidden`, data: `DELETE reservado para admins` });
        }else {
            res.send({ status: 'OK', data: 'Producto eliminado exitosamente'})
        }
    } catch (error) {
        console.log(error);
    }
}

export {deleteByIdController}