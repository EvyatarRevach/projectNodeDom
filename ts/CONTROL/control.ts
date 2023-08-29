import { Request, Response } from 'express';
import { AllProducts, ProductWithQuantity } from '../DAL/products';
import * as bl from '../BL/bl';
import { v4 as uuidv4 } from 'uuid';
// import { AllProducts } from '../DAL/products'; 

export function all(req: Request, res: Response) {
    try {
        res.send(bl.allProducts());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function toDeleteProduct(req: Request, res: Response) {
    try {
        bl.toDelete(req);
        return res.send('Product has been successfully deleted');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function toAddProduct(req: Request, res: Response) {
    const product = req.body as ProductWithQuantity;
    try {
        if (
            product.title &&
            product.price &&
            product.description &&
            product.category &&
            product.image &&
            product.rating?.rate &&
            product.rating?.count &&
            product.quantity
        ) {
            product.id = uuidv4();
            AllProducts.push(product);
            res.send('The product has been successfully added');
        } else {
            throw new Error(
                'The product has not been added. Please complete the missing details'
            );
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
}

export async function toEdit(req: Request, res: Response) {
    const productId = req.params.id;
    const productDetails = req.body as Partial<ProductWithQuantity>;
    const productIndex = AllProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    AllProducts[productIndex] = { ...AllProducts[productIndex], ...productDetails };
    return res.send('Product has been successfully edited');
}
