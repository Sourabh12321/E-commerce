import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import order, { fetchOrders, cancelOrder } from '../redux/slice/order';
import NavBar from '../components/NavBar';
import styles from '../css/OrderDetails.module.css';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    const handleCancel = (orderId) => {
        dispatch(cancelOrder(orderId));
    };

    return (
        <div>
            <NavBar />
            <div className={styles.container}>

                <h1>Your Orders</h1>
                {orders?.map(order => (
                    <div key={order._id} className={styles.order}>
                        <h2>Order #{order._id}</h2>
                        <p>Total Amount: Rs. {order.totalAmount}/-</p>
                        <p>Status: {order.status}</p>
                        <div>
                            <h3>Items:</h3>
                            <ul>
                                {order?.items?.map(item => (
                                    <li key={item.itemId._id} className={styles.item}>
                                        <img src={item.itemId.image} alt={item.itemId.title} className={styles.itemImage} />
                                        <div>
                                            <h4>{item.itemId.title}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: Rs. {item.price}/-</p>
                                            <p>Description: {item.itemId.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {order.status !== 'cancelled'? <button
                            className={styles.cancelButton}
                            onClick={() => handleCancel(order._id)}
                            disabled={order.status === 'cancelled'}
                        >
                            {order.status === 'cancelled' ? 'Cancelled' : 'Cancel Order'}
                        </button>:''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
