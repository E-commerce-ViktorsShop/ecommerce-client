import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/product.css";
import useEmblaCarousel from "embla-carousel-react";
import Accordion from "react-bootstrap/Accordion";

export function EmblaCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [loading, setLoading] = useState(false);

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
          {images?.map((image) => (
            <div className="embla__slide">
              <img
                src={`https://cdn.webhallen.com${image.large}&w=500
              `}
                alt="product image"
                className="img-fluid pt-5"
                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
				style={{
					display: loading ? 'none' : 'block',
					width: '500px',
					height: 'auto',
					objectFit: 'contain',
				}}
              />
            </div>
          ))}
        </div>
      </div>
	  <button className="embla__button embla__button--prev" onClick={scrollPrev}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button className="embla__button embla__button--next" onClick={scrollNext}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  );
}

const ProductTable = ({ productData }) => {
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
                      <td className="attribute-value text-end">{attribute.value}</td>
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
        <div className="container-lg mb-5">
          <div className="row align-items-center">
            {/* Product Images Section */}
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <EmblaCarousel images={product?.images} />
              </div>
            </div>

            {/* Product Information Section */}
            <div className="col-6 pt-5">
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
            <div className="my-5 px-5">
              <h4>Produktinformation</h4>
              <ProductTable productData={product?.data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
