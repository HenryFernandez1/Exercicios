const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    addProduct(product) {
        const productData = this._formatProduct(product);
        fs.appendFileSync(this.filePath, productData);
    }

    getProducts() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        const products = this._parseProducts(data);
        return products;
    }

    getProductById(productId) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        const products = this._parseProducts(data);
        const product = products.find(p => p.Id === productId);
        return product;
    }

    updateProduct(productId, updatedProduct) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        let products = this._parseProducts(data);
        const index = products.findIndex(p => p.Id === productId);

        if (index !== -1) {
            products[index] = { ...updatedProduct, Id: productId };
            const updatedData = products.map(p => this._formatProduct(p)).join('\n');
            fs.writeFileSync(this.filePath, updatedData);
            return true;
        } else {
            return false;
        }
    }

    deleteProduct(productId) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        let products = this._parseProducts(data);
        const index = products.findIndex(p => p.Id === productId);

        if (index !== -1) {
            products.splice(index, 1);
            const updatedData = products.map(p => this._formatProduct(p)).join('\n');
            fs.writeFileSync(this.filePath, updatedData);
            return true;
        } else {
            return false;
        }
    }

    _formatProduct(product) {
        return `${product.Id}\n${product.title}\n${product.description}\n${product.price}\n${product.thumbnail}\n${product.code}\n${product.stock}\n`;
    }

    _parseProducts(data) {
        const lines = data.split('\n');
        const products = [];
        for (let i = 0; i < lines.length; i += 7) {
            const product = {
                Id: parseInt(lines[i]),
                title: lines[i + 1],
                description: lines[i + 2],
                price: parseFloat(lines[i + 3]),
                thumbnail: lines[i + 4],
                code: lines[i + 5],
                stock: parseInt(lines[i + 6])
            };
            products.push(product);
        }
        return products;
    }
}