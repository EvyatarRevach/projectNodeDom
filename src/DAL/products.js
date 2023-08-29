import axios from 'axios';
const updateProductsQuantity = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        const productsWithQuantity = products.map(product => ({
            ...product,
            quantity: Math.floor(Math.random() * 100) + 1
        }));
        return productsWithQuantity;
    }
    catch (error) {
        console.error('Error updating products:', error);
        return [];
    }
};
const AllProducts = await updateProductsQuantity();
export { AllProducts };
