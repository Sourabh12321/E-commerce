import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/OrderPage.module.css';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import {placeOrder}from "../redux/slice/order"
import swal from 'sweetalert';

function OrderPlace() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state?.cart?.cartItems);
    const order = useSelector(state => state);

    const [orderDetails, setOrderDetails] = useState({
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        contact: '',
        paymentMethod: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({
            ...orderDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle order placement logic
    };

    const handleOrderPlace = () => {
        if (cartItems?.cartItems?.length == 0) {
            swal("Cart item is empty")
            return;
        }
        let itemsBody = [];
        let totalOrderPrice = 0;
        cartItems?.cartItems?.forEach(element => {
            let obj = {};
            obj.itemId = element.itemId._id;
            obj.quantity = element.quantity;
            obj.price = element.quantity * element.itemId.price;
            totalOrderPrice = totalOrderPrice + (element.quantity * element.itemId.price)
            itemsBody.push(obj);
        });

        let body = {
            items: itemsBody,
            totalAmount: totalOrderPrice,
            address:{
                name: orderDetails.name,
                streetAddress: orderDetails.streetAddress,
                city: orderDetails.city,
                state: orderDetails.state,
                zipCode: orderDetails.zipCode,
                contact: orderDetails.contact,
                paymentMethod: orderDetails.paymentMethod,
            },
            paymentMethod:orderDetails.paymentMethod,
            cardDetails:{
                cardNumber: orderDetails.cardNumber,
                cardExpiry: orderDetails.cardExpiry,
                cardCVV: orderDetails.cardCVV,
            }
        }

        dispatch(placeOrder(body))
    }

    return (
        <div className={styles.mainDiv}>
            <NavBar />
            <div className={styles.container}>
                <h1>Place Your Order</h1>
                <form className={styles.orderForm} onSubmit={handleSubmit}>
                    <label className={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={orderDetails.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>Street Address:</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={orderDetails.streetAddress}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={orderDetails.city}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={orderDetails.state}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>Zip Code:</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={orderDetails.zipCode}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={orderDetails.contact}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />

                    <label className={styles.label}>Payment Method:</label>
                    <select
                        name="paymentMethod"
                        value={orderDetails.paymentMethod}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select a payment method</option>
                        <option value="cash on delivery">Cash on Delivery</option>
                        <option value="credit card">Credit Card</option>
                        <option value="debit card">Debit Card</option>
                    </select>

                    {(orderDetails.paymentMethod === 'credit card' || orderDetails.paymentMethod === 'debit card') && (
                        <>
                            <label className={styles.label}>Card Number:</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={orderDetails.cardNumber}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />

                            <label className={styles.label}>Card Expiry:</label>
                            <input
                                type="text"
                                name="cardExpiry"
                                value={orderDetails.cardExpiry}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />

                            <label className={styles.label}>CVV:</label>
                            <input
                                type="text"
                                name="cardCVV"
                                value={orderDetails.cardCVV}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </>
                    )}

                    <button type="submit" className={styles.submitButton} onClick={handleOrderPlace}>Place Order</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}


export default OrderPlace;
