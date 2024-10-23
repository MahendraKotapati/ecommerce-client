import { FAKE_PRODUCTS } from "../services/data.service";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

export const CatalogPage = () => {
    const products: Product[] = FAKE_PRODUCTS;

    return (
        <div className="d-flex flex-row row" style={{marginLeft: 20}}>
            {/* <div className="col-3">
                <Filters /> 
            </div> */}
            <div className="col-12 products-container">
                {
                    products.map((product) => {
                        return <ProductCard {...product}> </ProductCard>;
                    })
                }
            </div>
        </div>
    )
}


const ProductCard = (props: Product) => {
    const {id, title, description, price, image_url } = props;

    return (
        <div className="d-flex flex-column" style={{width: 250}}>
            <div> <img src={image_url} style={{height: 200, borderRadius: 4}} /> </div>
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

const Filters = () => {
    return (
        <div className="filters-container">
            <div className="h5" style={{borderBottom: "2px solid #E4E4E4", padding: 6}}>Filters</div>
            <div style={{padding: 16}}>
                <div>
                    <h6>Price</h6>
                    <div className="d-flex flex-row">
                        <span className="me-1"> Min: </span> <input type="text" style={{width: 80}} className="form-control me-3" />
                        <span className="me-1"> Max: </span> <input type="text" style={{width: 80}} className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    )
}