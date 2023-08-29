import axios, { AxiosResponse } from 'axios';

type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

type ProductWithQuantity = Product & {
    quantity: number;
};

const updateProductsQuantity = async () => {
    try {
        const response: AxiosResponse<any, any> = await axios.get('https://fakestoreapi.com/products');
        const products: Product[] = response.data;
        
        const productsWithQuantity: ProductWithQuantity[] = products.map(product => ({
            ...product,
            quantity: Math.floor(Math.random() * 100) + 1 
        }));
        
        return productsWithQuantity;
    } catch (error) {
        console.error('Error updating products:', error);
        return [];
    }
};


const AllProducts: ProductWithQuantity[] = await updateProductsQuantity();
console.log(AllProducts);


export {ProductWithQuantity, AllProducts };
