import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/product.css";
import useEmblaCarousel from "embla-carousel-react";

export function EmblaCarousel({images}) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {images?.map(image => (
            <div className="embla__slide">
                <img src={`https://cdn.webhallen.com${image.large}&w=500
                    `} alt="product image" />
            </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchProduct(id) {
      try {
        const response = await fetch(
          `https://ecommerce-api-sandy.vercel.app/products/${id}`
        );
        if (!response.ok) {
          throw new Error("HTTP error code: " + response.status);
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct(id);
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      // Uppdatera kvantitet om produkten redan finns
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Lägg till produkten om den inte finns
      cart.push(cartItem);
    }

    // Uppdatera local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <>
      {/* Main Content */}
      <main className="container mb-5">
        <div className="container-lg">
          <div className="row">
            {/* Product Images Section */}
            <div className="col-6">
              <div className="d-flex justify-content-between">
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
              <h5>More info</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                eveniet earum perferendis, iste, commodi dolor dolorum, neque
                laudantium voluptas reiciendis ratione maiores facere et in sit
                laborum impedit autem amet?
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
