import Router from 'express';
import * as carritosController from '../../controllers/carritosController/index.js'

const v1RouterCarritos = new Router();

v1RouterCarritos.post('/', carritosController.createNewCarritoController);

v1RouterCarritos.get('/:carritoId/productos', carritosController.getAllProductosFromCarritoController);

v1RouterCarritos.post('/:carritoId/productos', carritosController.postProductToCartController);

v1RouterCarritos.delete('/:carritoId/productos/:productoId', carritosController.deleteProductFromCartController);

v1RouterCarritos.delete('/:carritoId', carritosController.deleteAllProductsFromCartController);

export {v1RouterCarritos}