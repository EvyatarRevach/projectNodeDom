import { MongoClient } from 'mongodb';
import axios from 'axios';

const client = new MongoClient('mongodb://127.0.0.1:27017');

// const updateProductsQuantity = async () => {
//     try {
//         const response = await axios.get('https://fakestoreapi.com/products');
//         const productsWithQuantity = response.data.map(product => ({
//             ...product,
//             quantity: Math.floor(Math.random() * 100) + 1 
//         }));
//         return productsWithQuantity;
//     } catch (error) {
//         console.error('Error updating products:', error);
//     }
// };

// async function insertProducts() {
//     const products = await updateProductsQuantity();

//     try {
//         const client = new MongoClient('mongodb://127.0.0.1:27017');
//         await client.connect();
//         const db = client.db('Studies');
//         const collection = db.collection('products');

//         await collection.insertMany(products);
        
//         console.log('Products inserted successfully');

//     } catch (error) {
//         console.error('Error inserting products:', error);
//     } finally {
//         await client.close();
//     }
// }

// insertProducts();




async function connection() {
    try {
        await client.connect();
        const db = client.db('Studies');
        const collection = db.collection('products');
        return collection;
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

export async function allProducts(){
    try {
        const productsCollection = await connection();
        const allProducts = await productsCollection.find({}).toArray();
        // await Promise.all(allProducts.map(async function(doc) {
        //     if (/^\d+$/.test(doc.id)) {
        //         await productsCollection.updateOne(
        //             { _id: doc._id },
        //             { $set: { id: doc.id.toString() } } 
        //         );
        //     }
        // }));
        await client.close(); 
        return allProducts;
    } catch (error) {
        console.error('Error in AllProducts function:', error);
    }
}




export async function addProduct(product){
    try {
        const productsCollection = await connection();
        const oneDoc = await productsCollection.insertOne(product)
        await client.close(); 

        return 
    } catch (error) {
        console.error( error);

    }
}
export async function isProductExists(productId) {
    try {
        const productsCollection = await connection();
        const product = await productsCollection.findOne({ id: productId });
        await client.close(); 

        return !!product; 
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to check product existence');
    }
}




export async function editProduct(newPro, productId) {
    try {
        const productsCollection = await connection();
        const updateQuery = { $set: {} };
        for (const key in newPro) {
            updateQuery.$set[key] = newPro[key];
        }
        await productsCollection.updateOne({ id: productId}, updateQuery);
        await client.close(); 

    } catch (error) {
        console.error('Error:', error);
        await client.close(); 
        throw new Error('Failed to update product');
    }
}


export async function deleteProduct(productId) {
    const collection = await connection();
    const deleteResult = await collection.deleteOne(
        { id: productId }
        );
        await client.close(); 

       return deleteResult
}