import Router from 'express';
import * as productosController from '../../controllers/productosController/index.js'

const v1RouterProductos = new Router();

v1RouterProductos.get('/', productosController.getAllProductosController);

v1RouterProductos.get('/:productoId', productosController.getProductoByIdController);

v1RouterProductos.post('/', productosController.createNewProductoController);

v1RouterProductos.delete('/:productoId', productosController.deleteByIdController);

v1RouterProductos.put('/:productoId', productosController.updateByIdController);

export {v1RouterProductos}