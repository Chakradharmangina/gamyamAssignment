import productsData from "../mockdata/products.json";

class ApiService {
    fetchProducts () {
        return productsData || []
    }
}

export default ApiService;