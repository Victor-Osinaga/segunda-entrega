import mongoose from 'mongoose';
import config from '../../../config.js';

let carritosDao;

switch (config.env) {
    case 'firebase':
        const { default: FirestoreCarritosDAO } = await import('./FirestoreCarritosDAO.js');
        carritosDao = new FirestoreCarritosDAO('carritos', config.firestore);
        
        break;

    case 'json':
        const { default: FileSystemCarritosDAO } = await import('./FileSystemCarritosDAO.js');
        carritosDao = new FileSystemCarritosDAO(config.dbPath);
        break;

    case 'mongodb':
        const { default: MongodbCarritosDAO } = await import('./MongodbCarritosDAO.js');
        carritosDao = new MongodbCarritosDAO('carritos', new mongoose.Schema({
            id: Number,
            productos: Array,
        }));
    break;

    default:
        const {default: MemoryCartsDAO} = await import('./MemoryCarritosDAO.js')
        carritosDao = new MemoryCartsDAO()
        break;
}

export { carritosDao }