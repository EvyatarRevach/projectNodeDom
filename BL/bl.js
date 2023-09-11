import * as dal from "../DAL/DAL.js";
import { uuid } from 'uuidv4';
 

export async function allProducts() {
    try{
    const all = await dal.allProducts();
    return all;
    }catch (error) {
        console.log(error);
        throw new Error('Failed to ');
    }
}



export async function addProduct(product) {
    try {
        if (product.title && product.price && product.description && product.category && product.image && product.rating.rate && product.rating.count && product.quantity) {
            product.id = uuid();
            await dal.addProduct(product)
            return 'The product has been successfully added';
        } else {
            return 'The product has not been added. Please complete the missing details';
        }
    } catch (error) {
        console.log(error);
        return Error('Failed to add product');
    }
}

export async function editProduct(req, res) {

    const productId = req.params.id;
    const productDetails = req.body;

    const productIndex = await dal.isProductExists(productId);

    if (productIndex === false) {
        throw new Error('Product not found');
    }else
    await dal.editProduct(productDetails, productId)
    return 'Product has been successfully edited';
}



export async function deleteProduct(req, res){
    const productId = req.params.id;
    const productDetails = req.body;

    const productIndex = await dal.isProductExists(productId);

    if (productIndex === false) {
        throw new Error('Product not found');
    }else
    await dal.deleteProduct(productId)
    return 'Product has been successfully deleted';
}
