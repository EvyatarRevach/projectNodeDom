import { AllProducts } from "../DAL/products.js";
import jsonfile from 'jsonfile';
import bcrypt from 'bcrypt';
import shortid from 'shortid';





export function allProducts() {
    try{
        return AllProducts
    }catch(error){
        throw new Error ("Internal server error");

    }
};

export async function toDelete(req, res){
    const productId = Number(req.params.id)
        const productIndex = AllProducts.findIndex(p => p.id === productId);
        AllProducts.splice(productIndex, 1);
        return res.send('Product has been successfully deleted');
}



