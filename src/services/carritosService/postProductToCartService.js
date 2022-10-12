import {carritosDao} from '../../daos/carritosDao/index.js';

const postProductToCartService = async (req) => {
    let idCart = parseInt(req.params.carritoId)
    let idProduct = parseInt(req.body.id)
    try {
        if(idCart <= 0){
            return false
        }else{
            const newCarrito = await carritosDao.postProductToCart(idCart, idProduct);
            return newCarrito
        }
    } catch (error) {
        console.log(error);
    }
}

export {postProductToCartService}