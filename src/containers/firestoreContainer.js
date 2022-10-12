import admin from 'firebase-admin'
import config from '../../config.js'

// var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(config.firestore)
});

export default class FirestoreContainer {
    constructor(collection, config) {
        (this.config = config), (this.db = admin.firestore()), (this.collection = this.db.collection(collection));
    }

    async getAll() {
      const snapshot = await this.collection.get();
      const show = [];
      snapshot.forEach((doc) => show.push({ id: doc.id, ...doc.data() }));
      return show;
    }

    async createNewProducto(newProducto) {
      const allProdcts = await this.getAll();
      
      await this.collection.doc(newProducto.id.toString()).set({
        id: newProducto.id,
        nombre: newProducto.nombre,
        descripcion: newProducto.descripcion,
        codigo: newProducto.codigo,
        foto: newProducto.foto,
        precio: newProducto.precio,
        stock: newProducto.stock,
        timestamp: newProducto.timestamp,
    });
      return newProducto
    }
  
    async getProductoById(i) {
      const elements = await this.getAll();
      const element = elements.find((elem) => parseInt(elem.id) === parseInt(i));
      return element;
    }
  
    async deleteById(id) {
      const toDelete = await this.getProductoById(id);
      if (toDelete) {
        await this.collection.doc(id).delete();
        return true;
      } else return false;
    }
  
    async updateById(body, id) {
      const element = await this.getProductoById(id);
      if (element) {
        await this.collection.doc(id.toString()).update({
          nombre: body.nombre || element.nombre,
          descripcion: body.descripcion || element.descripcion,
          codigo: body.codigo || element.codigo,
          foto: body.foto || element.foto,
          precio: body.precio || element.precio,
          stock: body.stock || element.stock,
        });
        return true;
      } else {
        return false;
      }
    }

    async createNewCarrito(){
      const allCarts = await this.getAll();
      const id = !allCarts.length ? 1 : parseInt(allCarts[allCarts.length - 1].id) + 1;
      await this.collection.doc(id.toString()).set({ productos: [] });
      return id
    }

    async postProductToCart(idCart, idProduct){
      const productsCollection = this.db.collection('productos');
      const snapshot = await productsCollection.get();
      const allProdcts = [];
      snapshot.forEach((doc) => allProdcts.push({ id: doc.id, ...doc.data() }));

      const productToAdd = allProdcts.find((prod) => prod.id === idProduct);
      if (!productToAdd) return 'Ups... No encontramos el producto a agregar';

      const cart = await this.getProductoById(idCart);
      if (!cart) return 'Ups... No encontramos el carrito... :O';

      cart.productos.push(productToAdd);

      this.collection.doc(idCart.toString()).update({ productos: [...cart.productos] });

      return cart.productos;
    }

    async getProductosFromCart(carritoId){
      const cart = await this.getProductoById(carritoId);
      return cart
      // return cart ? cart : undefined;
    }

    async deleteProductFromCart(productoId, carritoId){
      let cart = await this.getProductosFromCart(carritoId);
      if(!cart){
          return false
      }else{
          const productIndex = cart.productos.findIndex((prod) => prod.id == productoId);
          if(productIndex > -1){
            cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));

            this.collection.doc(carritoId.toString()).update({ productos: [...cart.productos] });

            // console.log(cart.productos);
            return cart.productos
          }else{
              return false
          }
      }
    }

    async deleteAllProductsFromCart(carritoId){
      const cartToEmpty = await this.getProductoById(carritoId)
      if (!cartToEmpty) return false
      this.collection.doc(carritoId.toString()).update({ productos: [] });
      return true
    }
}