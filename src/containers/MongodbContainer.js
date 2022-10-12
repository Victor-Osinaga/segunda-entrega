import mongoose from 'mongoose';

import config from '../../config.js';

await mongoose.connect(config.mongodb);

export default class MongodbContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }
  
  async getAll() {
    return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
  }

  async createNewProducto(newProducto) {
    await this.collection.create(newProducto);
    return await this.collection.find({nombre : newProducto.nombre}, { _id: 0, __v: 0 }).lean();
  }

  async getProductoById(i) {
    return await this.collection.findOne({ id: i }, { _id: 0, __v: 0 }).lean();
  }

  async deleteById(id) {
    const toDelete = await this.getProductoById(id)
    if(!toDelete)return false
    await this.collection.deleteOne({ id: id });
    return true
  }

    async updateById(body, id) {
      const toUpdate = await this.getProductoById(id);
      if(!toUpdate) return false
      await this.collection.updateOne(
        { id: id },
        {
          $set: {
            id: id,
            nombre: body.nombre || toUpdate.nombre,
            descripcion: body.descripcion || toUpdate.descripcion,
            foto: body.foto || toUpdate.foto,
            precio: body.precio || toUpdate.precio,
            codigo: body.codigo || toUpdate.codigo,
            stock: body.stock || toUpdate.stock,
          },
        }
      );
      return true
    }

    async createNewCarrito(){
      const allCarts = await this.getAll();
      const cartToCreate = {
        id: !allCarts.length ? 1 : parseInt(allCarts[allCarts.length - 1].id) + 1,
        productos: [],
      }
      await this.collection.create(cartToCreate);
      return cartToCreate.id
    }

    async postProductToCart(idCart, idProduct){
      const productsCollection = mongoose.model('productos')
  
      const productToAdd = await productsCollection.findOne({ id: idProduct }, { _id: 0, __v: 0 }).lean();

      if(!productToAdd) return 'No existe'
      const cartToUpdate = await this.getProductoById(idCart);
      if(!cartToUpdate) return 'Ups... no encontramos el carrito!!! oh por dias!'
      cartToUpdate.productos.push(productToAdd);

      await this.collection.updateOne(
        { id: idCart },
        {
          $set: {
            productos: cartToUpdate.productos,
          },
        }
      );
      return true
    }

    async getProductosFromCart(carritoId){
      const cartProducts = await this.getProductoById(carritoId)
      return cartProducts
    }

    async deleteProductFromCart(productoId, carritoId){
      const cart = await this.getProductoById(carritoId)
      if(!cart){
          return false
      }else{
          const productIndex = cart.productos.findIndex((prod) => prod.id == productoId);
          if(productIndex > -1){
            cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
            await this.collection.updateOne(
              { id: carritoId },
              {
                $set: {
                  productos: [...cart.productos],
                },
              }
            );
            return cart.productos
          }else{
              return false
          }
      }
    }

    async deleteAllProductsFromCart(carritoId){
      const cart = await this.getProductoById(carritoId)
      if(!cart) return false
      await this.collection.updateOne(
          { id: carritoId },
          {
            $set: {
              productos: [],
            },
          }
        );
      return true
    }
}