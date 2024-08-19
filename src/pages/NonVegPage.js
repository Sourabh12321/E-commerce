import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNonVegFood } from '../redux/slice/food';
import { addItemToCart } from '../redux/slice/cart';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../css/Veg.module.css';
import swal from 'sweetalert';

function NonVegPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [category, setCategory] = useState('');
    const nonvegItem = useSelector((state) => state?.food?.NonVegFood?.data || []);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getNonVegFood({ search: '', page: 1, limit: 20 }));
    }, [dispatch]);

    const handleCategoryChange = (data) => {
        setCategory(data);
        dispatch(getNonVegFood({ category: data, search: '' }));
    };

    const handleAddToCartClick = (itemId) => {
        setQuantity(1);
        if (selectedItem === itemId) {
            setSelectedItem(null); // Collapse if the same item is clicked again
        } else {
            setSelectedItem(itemId);
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleConfirm = (item) => {
        let body = {
            itemId: item._id,
            quantity: quantity
        };
        dispatch(addItemToCart(body));
        setSelectedItem(null); // Optionally, collapse the quantity selector after adding to cart
    };

    const handleCancel = () => {
        setSelectedItem(null);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(getNonVegFood({ search: value, page: 1, limit: 20 })); // Update this line to pass the search query
    };

    return (
        <div className={styles.mainDiv}>
            <NavBar />
            <h1 style={{ textAlign: 'center', marginTop: '90px' }}>NON VEG FOOD-ITEMS</h1>
            <div>
                <div style={{ width: '100%' }}>
                    <div className={styles.categoryButtons} style={{ width: '80%', margin: 'auto' }}>
                        <button onClick={() => handleCategoryChange('')} className={category === '' ? styles.active : ''}>All</button>
                        <button onClick={() => handleCategoryChange('non-veg-starter')} className={category === 'non-veg-starter' ? styles.active : ''}>Starters</button>
                        <button onClick={() => handleCategoryChange('non-veg-soups')} className={category === 'non-veg-soups' ? styles.active : ''}>Soups</button>
                        <button onClick={() => handleCategoryChange('non-veg-salads')} className={category === 'non-veg-salads' ? styles.active : ''}>Salads</button>
                        <button onClick={() => handleCategoryChange('non-veg-maincourse')} className={category === 'non-veg-maincourse' ? styles.active : ''}>Main Course</button>
                        <button onClick={() => handleCategoryChange('non-veg-snacks')} className={category === 'non-veg-snacks' ? styles.active : ''}>Snacks</button>
                    </div>
                </div>
                <div className={styles.functionality}>
                    <input type="text" className={styles.search} placeholder="Search by name" onChange={handleSearch} />
                </div>
                <div className={styles.foodColumn}>
                    {nonvegItem.length > 0 ? nonvegItem.map((el, i) => (
                        <div key={i} className={styles.foodCard}>
                            <img src={el?.image} alt="" />
                            <h1>{el?.title}</h1>
                            <p className={styles.description}>{el?.description ? el.description : "No description available."}</p>
                            <p className={styles.price}>Rs. {el?.price}/-</p>
                            {selectedItem === el._id ? (
                                <div className={styles.quantitySelector}>
                                    <input
                                        className={styles.quantityInput}
                                        type="number"
                                        id={`quantity-${el._id}`}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        max="99"
                                    />
                                    <button onClick={() => handleConfirm(el)} className={styles.quantityButton}>Confirm</button>
                                    <button onClick={handleCancel} className={styles.quantityButton}>Cancel</button>
                                </div>
                            ) : (
                                <button className={styles.addButton} onClick={() => handleAddToCartClick(el._id)}>Add to cart</button>
                            )}
                        </div>
                    )) : (
                        <p>No items available.</p>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NonVegPage;
