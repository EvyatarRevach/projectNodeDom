import {ProductWithQuantity, AllProducts  } from '../DAL/products'; // Assuming you have a type called Product
import { Request, Response } from 'express';


export function allProducts(): ProductWithQuantity[] {
  try {
    return AllProducts;
  } catch (error) {
    throw new Error('Internal server error');
  }
}


export function toDelete(req: Request) {
    const productId = req.params.id;
    const productIndex = AllProducts.findIndex(p => p.id == productId);
    if (productIndex === -1) {
      throw new Error('Product not found'); 
    }
    AllProducts.splice(productIndex, 1);
  }
  