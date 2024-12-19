import "bootstrap/dist/css/bootstrap.min.css";
import {useCart} from "../providers/CartProvider.jsx";
import LoadingSpinner from "./loaders/spinner.jsx";
import React, {useState} from "react";

export default function () {
    const {clearCart, changeCartItem, cart} = useCart();
    const [loading, setLoading] = useState(false);

    function handleQuantityChange(e, item) {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            changeCartItem({...item, quantity: newQuantity});
        }
    }

    return (
        <ul className={"list-unstyled rounded p-2"} style={{width: "300px", backgroundColor: "#fff"}}>
            {cart.length > 0 ?
                cart.map((item, index) => (
                    <li key={index} className="d-flex">
                        <div className={"image-container w-50 overflow-hidden"} style={{height: "100px"}}>
                            {
                                loading && <LoadingSpinner/>
                            }
                            <img className='image pb-2 w-100 h-100 object-fit-contain'
                                 style={{display: loading ? 'none' : 'block'}}
                                 onLoad={() => setLoading(false)} src={item.image}
                                 alt={`image for ${item.name}`}/>
                        </div>
                        <div className={"d-flex flex-column h-75 justify-content-center align-items-center"}>
                            <p className={"m-0"}>{item.name}</p>
                            <div className={"d-flex flex-row justify-content-between align-items-center w-100"}>
                                <p className={"fw-medium m-0"}>{item.price.$numberDecimal}kr</p>
                                <input className={"m-0 w-25"} type={"number"} value={item.quantity}
                                       onChange={(e) => handleQuantityChange(e, item)}></input>
                            </div>
                        </div>
                    </li>
                )) : <li><p>Din kundvagn är tom</p></li>}
            <button onClick={clearCart} style={{display: cart.length > 0 ? "block" : "none"}} className={"btn btn-danger"}>Rensa kundvagn</button>
        </ul>
    )
}