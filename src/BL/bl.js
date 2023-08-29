import { AllProducts } from '../DAL/products.js'; // Assuming you have a type called Product
export function allProducts() {
    try {
        return AllProducts;
    }
    catch (error) {
        throw new Error('Internal server error');
    }
}
export function toDelete(req, res) {
    const productId = req.params.id;
    const productIndex = AllProducts.findIndex(p => p.id == productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    AllProducts.splice(productIndex, 1);
    return res.send('Product has been successfully deleted');
}
