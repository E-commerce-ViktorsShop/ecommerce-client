import React, {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/product.css";
import useEmblaCarousel from "embla-carousel-react";
import Accordion from "react-bootstrap/Accordion";
import {useCart} from "../providers/CartProvider.jsx";
import {useLocation} from "react-router-dom";
import LoadingSpinner from "../components/loaders/spinner.jsx";

export function EmblaCarousel({images}) {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [loading, setLoading] = useState(true); // To track if images are loading

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleImageLoad = () => {
        // When an image is loaded, we set the loading state to false
        setLoading(false);
    };

    return (
        <div className='embla'>
            <div className='embla__viewport' ref={emblaRef}>
                <div className='embla__container'>
                    {images?.map((image, index) => (
                        <div key={index} className='embla__slide'>
                            {loading && (
                                // Show a loading indicator while images are loading
                                <LoadingSpinner/>
                            )}
                            <img
                                src={`https://cdn.webhallen.com${image.large}&w=500`}
                                alt='product image'
                                className='img-fluid'
                                onLoad={handleImageLoad}
                                onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')}
                                style={{display: loading ? 'none' : 'block'}} // Hide the image until it has loaded
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className='embla__prev' onClick={scrollPrev}>
                Prev
            </button>
            <button className='embla__next' onClick={scrollNext}>
                Next
            </button>
        </div>
    );
}

const ProductTable = ({productData}) => {
    if (!productData || productData.length === 0) {
        return <p>Ingen produktinformation tillgänglig.</p>;
    }

    return (
        <table className="product-table">
            <tbody>
            {productData.map((section, index) => (
                <React.Fragment key={index}>
                    {/* Kategori-rubrik */}
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <tr>
                                    <th colSpan="2" className="category-header">
                                        {section.category}
                                    </th>
                                </tr>
                            </Accordion.Header>
                            {/* Attribut */}
                            <Accordion.Body>
                                {section.attributes.map((attribute, attrIndex) => (
                                    <tr key={attrIndex} className="attribute-row">
                                        <td className="attribute-name">{attribute.name}</td>
                                        <td className="attribute-value">{attribute.value}</td>
                                    </tr>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
};

export default function ProductPage() {
    const location = useLocation()
    const [product, setProduct] = useState(location.state?.product || {}); // Use location.state if available
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const id = params.id;
    const {addToCart} = useCart() //custom hook to handle cart

    useEffect(() => {
        // If product is already available, don't fetch again
        if (product && product._id) {
            setLoading(false)
            return;
        }

        async function fetchProduct(id) {
            try {
                const response = await fetch(
                        `https
            ://ecommerce-api-sandy.vercel.app/products/${id}`
                    )
                ;
                if (!response.ok) {
                    throw new Error("HTTP error code: " + response.status);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchProduct(id);
    }, [id, product]); // Trigger fetch only when product is not available

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        const cartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };


        // Use the context function to add the product to the cart
        addToCart(cartItem);
    };
    return (

        <>
            {/* Main Content */}
            <main className="container mb-5">
                <div className="container-lg mb-5">
                    <div className="row align-items-center">
                        {/* Product Images Section */}
                        <div className="col-6">
                            <div className="d-flex">
                                <EmblaCarousel images={product?.images}/>
                            </div>
                        </div>

                        {/* Product Information Section */}
                        <div className="col-6">
                            <h2 className="mb-3">{product.name}</h2>
                            <h3 className="mb-3">{product?.price?.$numberDecimal || 0} kr</h3>
                            <p className="mb-4">{product.subTitle}</p>
                            <p className="mb-4">Article number: {product._id}</p>
                            {/* Quantity Input */}
                            <div className="mb-4" id="quantity-box">
                                <label htmlFor="quantity" className="form-label">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    value={quantity}
                                    min="1"
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            {/* Add to Cart Button */}
                            <button
                                className="btn btn-lg mb-3"
                                type="button"
                                id="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </button>
                            {/* More Info Section */}
                        </div>
                        <div className="mt-5 mb-5">
                            <h4>Produktinformation</h4>
                            <ProductTable productData={product?.data}/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}
;