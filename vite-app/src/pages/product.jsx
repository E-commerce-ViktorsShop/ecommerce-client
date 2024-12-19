
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/product.css";
import { useCart } from "../providers/CartProvider.jsx";
import { EmblaCarousel } from "../components/productPageComp.jsx";
import { ProductTable } from "../components/productPageComp.jsx";
import { BreadCrumb } from "../components/productPageComp.jsx";
import {useNavigate} from "react-router-dom";

export default function ProductPage() {
    const {id} = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || {});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useCart();
    const navigate = useNavigate()

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
                console.log(response);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                if (!data || data.length === 0 || data.message) {
                    navigate("/product/404")
                }
                setProduct(data);
            } catch (error) {
                console.error(error);
                navigate("/product/error")

            } finally {
                setLoading(false);
            }
        }

        fetchProduct(id);
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) setQuantity(value);
    };


    const handleAddToCart = () => {
        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.thumbNail,
            quantity,
        };
        addToCart(cartItem);
    };

    return (
        <main className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <EmblaCarousel images={product?.images || []}/>
                </div>
                <div className="col-md-6">
                    <BreadCrumb
                        category={product?.categories || "Okänd kategori"}
                        productName={product?.name || "Okänd produkt"}
                    />
                    <h2>{product?.name}</h2>
                    <h3>{product?.price?.$numberDecimal || laddar pris...} kr</h3>
                    <p>{product?.subTitle}</p>
                    <p>Artikel nummer: {product?._id}</p>
                    <div className="mb-4">
                        <label htmlFor="quantity">Antal:</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button id="add-to-cart-btn" className="btn btn-callToAction" onClick={handleAddToCart}>
                        Lägg till i varukorg
                    </button>
                </div>
            </div>
            <div className="mt-5 px-4">
                <h4>Produkt information</h4>
                <ProductTable productData={product?.data}/>
            </div>
        </main>
    );

