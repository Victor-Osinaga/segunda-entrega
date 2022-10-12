import {carritosDao} from '../../daos/carritosDao/index.js';

const createNewCarritoService = async () => {
    try {
        const carrito = await carritosDao.createNewCarrito();
        return carrito
    } catch (error) {
        console.log(error);
    }
}

export {createNewCarritoService}

// import {carritosDao} from '../../daos/carritos/index.js'

// const postNewCart = async (req, res) => {
//     const newCartId = await carritosDao.addNewCart();
//     res.json(`Carrito creado exitosamente con id: ${newCartId}`);
//   };

//   export default postNewCart

//   createNewProducto