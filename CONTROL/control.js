import { AllProducts } from "../DAL/products.js";
// import jsonfile from 'jsonfile';
// import bcrypt from 'bcrypt';
// import shortid from 'shortid';
// import products from "../BL/bl.js";
import * as bl from "../BL/bl.js";
import { v4 as uuidv4 } from 'uuid';



export function all(req, res) {
    try {
        res.send(bl.allProducts())
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export async function toDeleteProduct(req, res) {
    try {
        const productId = Number(req.params.id)
        const productIndex = AllProducts.findIndex(p => p.id === productId);
        AllProducts.splice(productIndex, 1);
        return res.send('Product has been successfully deleted');
    } catch (error) {

    }
}

export function toAddProduct(req, res) {
    const product = req.body;
    try {
        if (product.title && product.price && product.description && product.category && product.image && product.rating.rate && product.rating.count && product.quantity) {
            product.id = uuidv4();
            AllProducts.push(product)
            res.send('The product has been successfully added')
        } else {
            throw 'The product has not been added. Please complete the missing details'
        }
    } catch (error) {
        console.log(error);
        res.status(401)
        res.send(error)
    }

}

export async function toEdit(req, res) {

    const productId = Number(req.params.id);
    const productDetails = req.body;
    const productIndex = AllProducts.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    AllProducts[productIndex] = { ...AllProducts[productIndex], ...productDetails };
    return res.send('Product has been successfully edited');
};




// export function productById  (req, res) {
//     try {
//         const data = bl.productById(req, res);
//         res.send(data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
// export async function addUser(req, res) {
//     const saltRounds = 10;
//     const user = req.body;
//     if (user.password && user.email && user.name) {
//         try {
//             user.id = shortid.generate();
//             user.password = await bcrypt.hash(user.password, saltRounds);
//             const users = await jsonfile.readFile('./users.json');

//             const existingUser = users.find(existingUser => existingUser.email === user.email);
//             if (existingUser) {
//                 return res.send('User with this email already exists');
//             }

//             users.push(user);

//             await jsonfile.writeFile('./users.json', users, { spaces: 2 });

//             res.send('User added successfully');
//         } catch (error) {
//             console.error('Error adding user:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     } else {
//         return res.send('The user has not been added. Please complete the missing details');
//     }

// }
// export async function logIn(req, res) {
//     const user = req.body;
//     if (user.password && user.email) {
//         try {
//             const users = await jsonfile.readFile('./users.json');

//             const existingUser = users.find(existingUser => existingUser.email === user.email);

//             if (existingUser) {
//                 const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
//                 if (passwordMatch) {
//                     return res.send('User logged in successfully');
//                 } else {
//                     return res.send('Invalid password');
//                 }
//             } else {
//                 return res.send('User not found');
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     } else {
//         return res.send('Please provide both email and password');
//     }
// }
