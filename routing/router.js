import express from 'express';
import * as control from '../CONTROL/control.js';
import jsonfile  from 'jsonfile';
const productRouter = express.Router();



productRouter.get('/',control.allProducts);

productRouter.post('/addProduct', control.addProduct)


productRouter.put('/ProductEditing/:id', control.editProduct)

productRouter.delete('/deleteProduct/:id', control.deleteProduct)


// productRouter.get('/:id', control.productById)

// async (req, res) => {
    
//     try {
//         const productId = Number(req.params.id);
//         const data = await control.toDeleteProduct(productId, res);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// (req, res) =>{
//     try {
//         const product = req.body;
//         const data = control.toAddProduct(product, res); 
//         // res.send(data)
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
// productRouter.post('/addProduct', control.toAddProduct)

// productRouter.put('/ProductEditing/:id', async(req, res) =>{
//     try {
//         const productId = Number(req.params.id);
//         const productDetails = req.body
//         const data = await control.toEdit(productId, productDetails, res); 
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



// productRouter.post('/addUser', async (req, res) => {
//     try {
//         const data = await control.addUser(req, res);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })
// productRouter.put('/logIn', async (req, res) => {
//     try {
//         const data = await control.logIn(req, res);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })




export default productRouter;