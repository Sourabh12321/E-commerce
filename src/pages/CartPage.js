import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, fetchCartItems } from '../redux/slice/cart';
import { Link,useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../css/CartPage.module.css';
import swal from 'sweetalert';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state?.cart?.cartItems);


  useEffect(() => {
    dispatch(fetchCartItems());
  }, [])

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckOut = () => {
    if(cartItems?.cartItems?.length==0){
      swal("Your cart is empty")
      return;
    }

    navigate('/order')
  }

  return (
    <div>
      <NavBar />
      <div className={styles.mainDiv}>
        <h1 style={{ textAlign: 'center', marginTop: '90px' }}>Cart</h1>
        <div className={styles.cartContainer}>
          {cartItems?.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            <div>
              <ul className={styles.cartList}>
                {cartItems?.cartItems?.map(item => (
                  <li key={item._id} className={styles.cartItem}>
                    <img src={item.itemId.image} alt={item.title} className={styles.cartImage} />
                    <div className={styles.itemDetails}>
                      <h2>{item.itemId.title}</h2>
                      <p>Price: Rs. {item.itemId.price}/-</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: Rs. {item.itemId.price}/-</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className={styles.removeButton}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cartSummary}>
                <h2>Total Amount: Rs. {cartItems?.total}/-</h2>
                <button className={styles.checkoutButton} onClick={handleCheckOut}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
