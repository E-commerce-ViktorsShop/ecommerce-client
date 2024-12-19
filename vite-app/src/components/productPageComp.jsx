import React, { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Accordion from "react-bootstrap/Accordion";
import LoadingSpinner from "../components/loaders/spinner.jsx";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function EmblaCarousel({ images }) {
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
                {loading && <LoadingSpinner />}
                <img
                  src={`https://cdn.webhallen.com${image.large}&w=500`}
                  alt="product"
                  className="img-fluid p-5"
                  onLoad={() => setLoading(false)}
                  onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                  style={
                    loading
                      ? { display: "none" }
                      : {
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="embla__button embla__button--prev"
          onClick={scrollPrev}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          className="embla__button embla__button--next"
          onClick={scrollNext}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    );
}

export const ProductTable = ({ productData }) => {
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
                    <td className="fw-bold">{attribute.name}</td>
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

export function BreadCrumb({ category, productName }) {
return (
    <div className="d-block">
    <Breadcrumb>
        <Breadcrumb.Item href="/">Hem</Breadcrumb.Item>
        <Breadcrumb.Item href={`/categories/${category}`}>
        {category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{productName}</Breadcrumb.Item>
    </Breadcrumb>
    </div>
);
}

