import React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductPage() {
    const styles = {
        quantityBox: {
            width: "80px",
        },
        addToCartBtn: {
            backgroundColor: "var(--call-to-action)",
            border: "1px black solid",
        },
    };

    return (
        <>
            {/* Main Content */}
            <main className="container mt-5 mb-5">
                <div className="container-lg">
                    <div className="row">
                        {/* Product Images Section */}
                        <div className="col">
                            {/* Main product image */}
                            <div className="d-flex justify-content-between">
                                {/* Thumbnails fetched with API */}
                                <div>
                                    {/* Placeholder for small images */}
                                </div>
                            </div>
                        </div>
                        {/* Product Information Section */}
                        <div className="col">
                            <h2 className="mb-3">Product</h2>
                            <h3 className="mb-3">Price product</h3>
                            <p className="mb-4">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Asperiores qui ipsa amet optio necessitatibus aliquid sequi.
                                Rerum, ullam ipsa quo aliquid nulla earum doloremque cum in aperiam
                                eveniet tenetur ducimus.
                            </p>
                            <p className="mb-4">Article number: xxxxxxxx</p>
                            {/* Quantity Input */}
                            <div className="mb-4" style={styles.quantityBox}>
                                <label htmlFor="quantity" className="form-label">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    defaultValue="1"
                                    min="1"
                                />
                            </div>
                            {/* Add to Cart Button */}
                            <button
                                className="btn btn-lg mb-3"
                                type="button"
                                id="add-to-cart-btn"
                                style={styles.addToCartBtn}
                            >
                                Add to cart
                            </button>
                            {/* More Info Section */}
                            <h5>More info</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eveniet
                                earum perferendis, iste, commodi dolor dolorum, neque laudantium
                                voluptas reiciendis ratione maiores facere et in sit laborum impedit
                                autem amet?
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
