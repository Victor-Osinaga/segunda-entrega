import * as productosService from '../../services/productosService/index.js';

const updateByIdController = async (req, res)=> {
    try {
        const producto = await productosService.updateByIdService(req.body, req.params.productoId);
        if(producto == false) {
            res.send({ status: 'Error', data: 'Id no válido, ingrese un Id mayor a cero' })
        }else if(producto == null){
            res.status(403).json({ error: `403 Forbidden`, data: `UPDATE reservado para admins` });
        }else if(producto == undefined){
            res.status(403).json({ status: 'Error', data: 'No hay nada en el body' })
        }else if(producto == 'No existe'){
            res.status(403).json({ status: 'Error', data: 'No existe el producto' })
        }else {
            res.send({ status: 'OK', data: 'Producto actualizado exitosamente'})
        }
    } catch (error) {
        console.log(error);
    }
}

export {updateByIdController}