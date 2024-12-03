import { useEffect, useState } from "react";
import { DataService } from "../services/data.service";
import { Category, Product } from "./CatalogPage";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

export const Admin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showProductModal, setProductModal] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);
    const {token} = useAuth();
    const dataService = new DataService();

    useEffect(() => {
        getProducts();
    }, [])

    const closeProductModal = () => {
        setProductModal(false);
        setSelectedProduct({} as Product);
        setIsNewProduct(false);
    }

    const getProducts = async () => {
        const response = await dataService.getProducts(null, null, null);
        setProducts(response.data.products);
    }

    const deleteProduct = async (id: string) => {
        if (window.confirm("Please Confirm Deletion?")) {
           await dataService.deleteProduct(id, token);
        }

        getProducts();
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{marginLeft: 60}}>
            <div> <h3>Manage Products</h3> </div>
            <button className="btn btn-success mt-2" 
                onClick={() => {setProductModal(true); setIsNewProduct(true);}}> 
                Add New 
            </button>
            <div style={{marginTop: 30}}>
            {
                products.map((product) => {
                    return (
                    <div className="product-row"> 
                        <div> {product.title} </div>
                        <div> { "$" + product.price} </div>
                        <button className="btn btn-sm btn-warning" onClick={() => { setProductModal(true); setSelectedProduct(product); }}> Edit </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.id)}> Delete </button>
                    </div>
                   );
                })
            }
            </div>
            {showProductModal && 
                <ProductEdit isNewProduct={isNewProduct} product={selectedProduct} show={showProductModal} handleClose={closeProductModal} getProducts={getProducts} />
            }
        </div>
);
}

export interface ProductEditProps {
    product: Product;
    show: boolean;
    isNewProduct: boolean;
    handleClose: () => any;
    getProducts: () => any;
}

export const ProductEdit = (props: ProductEditProps) => {
    const { product: existingProduct, show, handleClose, isNewProduct, getProducts } = props;
    const {token} = useAuth();
    const [product, setProduct] = useState<Product>({...existingProduct});
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const dataService = new DataService();

    useEffect(() => {
        getCategories();
    }, [])

    const saveProduct = async () => {
        if (product.id) {
            await dataService.updateProduct(product.id, product.title, product.description, product.price, product.quantity, product.category_id, token);
            window.alert("Product updated successfully");
        } else {
            await dataService.addProduct(product.title, product.description, product.price, product.quantity, product.category_id, token);
            window.alert("Product added successfully");
        } 

        getProducts();
        handleClose();
    };

    const getCategories = async () => {
        const response = await dataService.getCategories();
        setCategoryList(response.data.categories);
    }


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isNewProduct ? 'Add Product' : 'Edit Product'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div className="input-field">
                        <label className="field-label">Title </label>
                        <input value={product.title} 
                        onChange={
                            (e) => setProduct((product)=> { 
                                return {...product, title: e.target.value}}
                            )} 
                        type="text" className="form-control" placeholder="Title" />
                    </div>

                    <div className="input-field">
                        <label className="field-label"> Description </label>
                        <textarea value={product.description} 
                            onChange={
                                (e) => setProduct((product)=> { 
                                    return {...product, description: e.target.value}}
                                )} 
                            className="form-control" placeholder="Description" />
                    </div>

                    <div className="input-field">
                        <label className="field-label">Price </label>
                        <input
                            value={product.price} 
                            onChange= {
                                (e) => setProduct((product)=> { 
                                    return {...product, price: e.target.valueAsNumber}
                                })
                            } 
                            type="number" 
                            className="form-control" placeholder="Price" 
                        />
                    </div>

                    <div className="input-field">
                        <label className="field-label"> Quantity </label>
                        <input
                            value={product.quantity} 
                            onChange= {
                                (e) => setProduct((product)=> { 
                                    return {...product, quantity: e.target.valueAsNumber}
                                })
                            } 
                            type="number" 
                            className="form-control" placeholder="Quantity" 
                        />
                    </div>
                    <div>
                    <label className="field-label"> Category </label>
                    <select className="form-select" onChange= {
                                (e) => setProduct((product)=> { 
                                    return {...product, category_id: e.target.value}
                                })
                            } 
                    >
                        <option selected disabled>Select Category</option>
                        {categoryList.map((category) => {
                            return  <option key={category.id} value={category.id}> {category.name}  </option>;
                        })}
                    </select>
                    </div>

                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveProduct}>
                    Save Changes
                </Button>
            </Modal.Footer>
      </Modal>
    );
}