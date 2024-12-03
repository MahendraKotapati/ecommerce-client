import { useEffect, useState } from "react";
import { DataService, FAKE_CATEGORY, FAKE_PRODUCTS, IMAGE_URL } from "../services/data.service";
import React from "react";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    picture: string;
    quantity: number;
    category_id: string;
}

export interface Category {
    id: string;
    name: string;
}

export const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const dataService = new DataService();

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);  

    const getProducts = async () => {
        const response = await dataService.getProducts(minPrice, maxPrice, categoryId);
        setProducts(response.data.products);
    }

    const getCategories = async () => {
        const response = await dataService.getCategories();
        setCategoryList(response.data.categories);
    }

    const applyFilters = () => {
        getProducts();
    }

    return (
        <div className="d-flex" style={{marginLeft: 20, gap: 10}}>
            <div className="col-3">
                <Filters 
                    categoryList={categoryList}  
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}

                    applyFilters={applyFilters}
                /> 
            </div>
            <div className="col-9 products-container">
                {
                    products.map((product) => {
                        return <React.Fragment key={product.id}> <ProductCard {...product}> </ProductCard> </React.Fragment>;
                    })
                }
            </div>
        </div>
    )
}


const ProductCard = (props: Product) => {
    const {id, title, description, price, picture } = props;

    return (
        <div className="d-flex flex-column" style={{width: 250}}>
            <div> <img src={picture || IMAGE_URL} style={{height: 200, borderRadius: 4}} /> </div>
            <div>
                <div style={{fontWeight: 700}}> {title} </div>
                <div className="product-description"> {description} </div>
                <div className="d-flex justify-content-between"> 
                    <button className="btn btn-outline add-button"> +Add </button>
                    <div className="price-tag"> { "$" + price} </div>
                </div>
            </div>
        </div>
    )
}


export interface FilterProps {
    categoryList: Category[];
    minPrice: number | null;
    setMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
    maxPrice: number | null;
    setMaxPrice:  React.Dispatch<React.SetStateAction<number | null>>;
    categoryId: string | null;
    setCategoryId: React.Dispatch<React.SetStateAction<string | null>>;

    applyFilters: () => void;
}

const Filters = (props: FilterProps) => {

    const {minPrice, maxPrice, categoryId, applyFilters, setMinPrice, setMaxPrice, setCategoryId, categoryList} = props;

    return (
        <div className="filters-container">
            <div className="h5" style={{borderBottom: "2px solid #E4E4E4", padding: 6}}>Filters</div>
            <div style={{padding: 16}}>
                <div>
                    <div className="mb-1" style={{fontWeight: 600}}>Price</div>
                    <div className="d-flex flex-row align-items-center">
                        <span className="me-1"> Min: </span> 
                            <input type="number" value={minPrice as any} onChange={(e) => setMinPrice(e.target.valueAsNumber)} style={{width: 80}} className="form-control me-3" />
                        <span className="me-1"> Max: </span> 
                            <input type="number" style={{width: 80}} onChange={(e) => setMaxPrice(e.target.valueAsNumber)} className="form-control" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="mb-1" style={{fontWeight: 600}}>Category</div>
                    <select className="form-select" onChange={(e) => setCategoryId(e.target.value)}>
                        <option selected disabled>Select Category</option>
                        {categoryList.map((category) => {
                            return  <option key={category.id} value={category.id}> {category.name}  </option>;
                        })}
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary mt-3" onClick={applyFilters}> Apply </button>
                </div>
            </div>
        </div>
    )
}