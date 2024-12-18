import React, {useEffect, useState, useCallback} from "react";
import {useParams, useLocation} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/product.css";
import useEmblaCarousel from "embla-carousel-react";
import Accordion from "react-bootstrap/Accordion";
import LoadingSpinner from "../components/loaders/spinner.jsx";


export function EmblaCarousel({images}) {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [loading, setLoading] = useState(true);
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">

                    {images?.map((image, index) => (
                        <div className="embla__slide" key={index}>
                            <img
                                src={`https://cdn.webhallen.com${image.large}&w=500`}
                                alt="product"
                                className="img-fluid pt-5"
                                onLoad={() => setLoading(false)}
                                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                                style={loading ? {display: "none"} : {
                                    objectFit: "contain", width: "100%", height: "auto", display: "block"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className="embla__button embla__button--prev" onClick={scrollPrev}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button className="embla__button embla__button--next" onClick={scrollNext}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
            </button>
        </div>
    );
}

const ProductTable = ({productData}) => {
    if (!productData || productData.length === 0) {
        return <p>No product information available.</p>;
    }

    return (
        <table className="product-table">
            <tbody>
            {productData.map((section, index) => (
                <React.Fragment key={index}>
                    <Accordion>
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{section.category}</Accordion.Header>
                            <Accordion.Body>
                                {section.attributes.map((attribute, attrIndex) => (
                                    <tr key={attrIndex}>
                                        <td>{attribute.name}</td>
                                        <td>{attribute.value}</td>
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
    const {id} = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || {});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product && product._id) {
            setLoading(false);
            return;
        }

        async function fetchProduct(productId) {
            try {
                const response = await fetch(
                    `https://ecommerce-api-sandy.vercel.app/products/${productId}`
                );
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct(id);
    }, [id, product]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) setQuantity(value);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity,
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="container mb-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <EmblaCarousel images={product?.images}/>
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <h3>{product?.price?.$numberDecimal || 0} kr</h3>
                    <p>{product.subTitle}</p>
                    <p>Article number: {product._id}</p>
                    <div className="mb-4">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <h4>Product Information</h4>
                <ProductTable productData={product?.data}/>
            </div>
        </main>
    );
}
