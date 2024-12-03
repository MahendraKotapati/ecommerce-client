import axios from "axios";

export const IMAGE_URL = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMAGE_URL2 = "https://m.media-amazon.com/images/I/71K+bhq9bZL._AC_UF894,1000_QL80_.jpg";

export const FAKE_PRODUCTS = [
    {id: "1", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 1000 },
    {id: "2", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 1200 },
    {id: "3", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 900 },
    {id: "4", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 },
    {id: "5", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 },
    {id: "6", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 }
];

export const FAKE_CATEGORY = [{id: '1', name: 'Games'}, {id: '2', name: 'Phone'}, {id: '3', name: 'laptops'}];

export const apiClient = axios.create();

export class DataService {

    constructor() {

    }

    async getProducts(priceGTE: number | null, priceLTE: number | null, categoryId: string | null) {
        let url = "https://ecommerce-aaf4.onrender.com/api/product?";
        if (priceLTE) {
            url += `price_lte=${priceLTE}`
        }
        if (priceGTE) {
            url += `&price_gte=${priceGTE}`
        }
        if (categoryId) {
            url += `&category_id=${categoryId}`;
        }
        return (await apiClient.get(url)).data;
    }

    async addProduct(title: string, description: string, price: number, quantity: number, categoryId: string, token: string) {
        return (await axios.post(`https://ecommerce-aaf4.onrender.com/api/product`, {title, description, price, quantity, category_id: categoryId}, { headers: {Authorization: `Bearer ${token}`} } )).data;
    }

    async updateProduct(id: string, title: string, description: string, price: number, quantity: number, categoryId: string, token: string) {
        return (await axios.put(`https://ecommerce-aaf4.onrender.com/api/product/${id}`, 
            {title, description, price, quantity, category_id: categoryId}, {headers: {Authorization: `Bearer ${token}`} } )
        ).data;
    }

    async deleteProduct(id: string, token: string) {
        // console.log({id});
        // return ;
        return (await axios.delete(`https://ecommerce-aaf4.onrender.com/api/product/${id}`, {headers: {Authorization: `Bearer ${token}`} })).data;
    }

    async getCategories() {
        return (await axios.get(`https://ecommerce-aaf4.onrender.com/api/category`)).data;
    }

    async registerUser(name: string, email: string, password: string, token: string) {
        return (await axios.post("https://ecommerce-aaf4.onrender.com/api/user/register", {name, email, password}, {headers: {Authorization: `Bearer ${token}`} })).data;
    }

    async login(email: string, password: string) {
        return (await axios.post("https://ecommerce-aaf4.onrender.com/api/user/login", {email, password})).data;
    }
}