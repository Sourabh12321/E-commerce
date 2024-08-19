import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVegFood } from '../redux/slice/food';
import { addItemToCart } from '../redux/slice/cart';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../css/Veg.module.css';
import swal from 'sweetalert';

function VegPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [category, setCategory] = useState('');
    const vegItem = useSelector((state) => state?.food?.VegFood?.data || []);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        dispatch(getVegFood({ search: '', page: 1, limit: 20 }));
    }, [dispatch]);

    const handleCategoryChange = (data) => {
        setCategory(data);
        dispatch(getVegFood({ category: data, search: '' }));
    }

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
        }
        dispatch(addItemToCart(body));
        setSelectedItem(null); // Optionally, collapse the quantity selector after adding to cart
    };

    const handleCancel = () => {
        setSelectedItem(null);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(getVegFood({ search: value, page: 1, limit: 20 })); // Update this line to pass the search query
    };

    return (
        <div>
            <NavBar />
            <div className={styles.mainDiv}>
                <h1 className={styles.header}>VEG FOOD-ITEMS</h1>
                <div className={styles.categoryContainer}>
                    <div className={styles.categoryButtons}>
                        <button onClick={() => handleCategoryChange('')} className={category === '' ? styles.active : ''}>All</button>
                        <button onClick={() => handleCategoryChange('veg-starter')} className={category === 'veg-starter' ? styles.active : ''}>Starters</button>
                        <button onClick={() => handleCategoryChange('veg-soup')} className={category === 'veg-soups' ? styles.active : ''}>Soups</button>
                        <button onClick={() => handleCategoryChange('veg-salad')} className={category === 'veg-salads' ? styles.active : ''}>Salads</button>
                        <button onClick={() => handleCategoryChange('veg-maincourse')} className={category === 'veg-maincourse' ? styles.active : ''}>Main Course</button>
                        <button onClick={() => handleCategoryChange('veg-desserts')} className={category === 'veg-desserts' ? styles.active : ''}>Desserts</button>
                        <button onClick={() => handleCategoryChange('veg-beverage')} className={category === 'veg-beverages' ? styles.active : ''}>Beverages</button>
                        <button onClick={() => handleCategoryChange('veg-snacks')} className={category === 'veg-snacks' ? styles.active : ''}>Snacks</button>
                    </div>
                </div>
                <div className={styles.functionality}>
                    {/* <select name="sort" className={styles.sort}>
                        <option value="">Sort by Price</option>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select><br /> */}
                    <input type="text" className={styles.search} placeholder="Search by name" onChange={handleSearch} />
                </div>
                <div className={styles.foodColumn}>
                    {vegItem.length > 0 ? vegItem?.map((el, i) => (
                        <div key={i} className={styles.foodCard}>
                            <img src={el?.image} alt="" />
                            <h1>{el?.title}</h1>
                            <p className={styles.description}>
                                {el?.description ? el.description : "No description available."}
                            </p>
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
                                <button onClick={() => handleAddToCartClick(el._id)} className={styles.addButton}>Add to cart</button>
                            )}
                        </div>
                    )) : (
                        <p>No items available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default VegPage;
