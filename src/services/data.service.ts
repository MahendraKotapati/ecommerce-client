import axios from "axios";

const IMAGE_URL = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMAGE_URL2 = "https://m.media-amazon.com/images/I/71K+bhq9bZL._AC_UF894,1000_QL80_.jpg";

export const FAKE_PRODUCTS = [
    {id: "1", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 1000 },
    {id: "2", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 1200 },
    {id: "3", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 900 },
    {id: "4", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 },
    {id: "5", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 },
    {id: "6", title: "MacBook Pro", description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum", image_url: IMAGE_URL, price: 7000 }
];


export class DataService {
    constructor() {

    }

    getProducts() {

    }

    async registerUser(name: string, email: string, password: string) {
        return (await axios.post("https://ecommerce-aaf4.onrender.com/api/user/register", {name, email, password})).data;
    }

    async login(email: string, password: string) {
        return (await axios.post("https://ecommerce-aaf4.onrender.com/api/user/login", {email, password})).data;
    }
}