import * as bl from "../BL/bl.js";


export async function addProduct(req, res) {
    const product = req.body;
    try {
        const message = await bl.addProduct(product);
        res.send(message);
    } catch (error) {
        console.error('Error:', error);
        res.status(401).send(error);
    }
}

export async function allProducts(req, res) {
    try {
        const products = await bl.allProducts();
        res.send(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function editProduct(req, res) {
    try {
        const message = await bl.editProduct(req);
        res.send(message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export function deleteProduct(req, res) {
    try {
        const deleted = bl.deleteProduct(req);
        if (deleted) {
            res.send('Product has been successfully deleted');
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



