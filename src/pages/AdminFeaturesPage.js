import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userList } from '../redux/slice/auth';
import { getVegFood, getNonVegFood, createItem, updateFoodItem } from "../redux/slice/food"
import order, { fetchOrders, fetchAllOrders,updateOrderStatus } from '../redux/slice/order';
import styles from '../css/AdminFeature.module.css'; // Assuming you have a CSS module for styling
import Modal from '../components/Modal';
import swal from 'sweetalert';

const AdminFeatures = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state?.auth?.userList);
    const vegItem = useSelector((state) => state?.food?.VegFood || []);
    const nonvegItem = useSelector((state) => state?.food?.NonVegFood || []);
    // const msg = useSelector((state) => state?.food?.msg || []);
    const orders = useSelector(state => state.order.orders);


    const [newFoodItem, setNewFoodItem] = useState({
        title: '',
        image: '',
        description: '',
        type: '',
        price: ''
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [EditItemID,setEditItemID] = useState({title:'',image:'',description:'',price:'',type:''});
    const [userSearch, setUserSearch] = useState('');
    const [foodSearch, setFoodSearch] = useState('');
    const [NonVegfoodSearch, setNonVegfoodSearch] = useState('');
    const [userPage, setUserPage] = useState(1);
    const [foodPage, setFoodPage] = useState(1);
    const [NonVegfoodPage, setNonVegfoodPage] = useState(1);
    const [orderPage, setOrderPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [foodItemsPerPage] = useState(10);
    const [ordersPerPage] = useState(10);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    

    useEffect(() => {
        dispatch(userList({ search: userSearch, page: userPage, limit: usersPerPage }));
        dispatch(getVegFood({ search: foodSearch, page: foodPage, limit: foodItemsPerPage }));
        dispatch(getNonVegFood({ search: foodSearch, page: foodPage, limit: foodItemsPerPage }));
        dispatch(fetchAllOrders());
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFoodItem({ ...newFoodItem, [name]: value });
    };

    const handleAddFoodItem = () => {
        if (newFoodItem.title.length !== '' && newFoodItem.image.length !== '' && newFoodItem.description.length !== '' && newFoodItem.type.length !== '' && newFoodItem.price !== '') {
            dispatch(createItem([newFoodItem]));
            setNewFoodItem({ title: '', image: '', description: '', type: '', price: '' });
        } else {
            swal("Please fill all the feilds")
            // alert("Please fill all the feilds")
        }

    };

    const handleOrderStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    const handleUserSearch = (e) => {
        setUserSearch(e.target.value);
        let data = {
            search: e.target.value,
            page: 1,
            limit: 10,
        }
        dispatch(userList(data));
        setUserPage(1); // Reset to the first page on search
    };

    const handleFoodSearch = (e) => {
        setFoodSearch(e.target.value);
        dispatch(getVegFood({ search: e.target.value, page: 1, limit: 10 }));

        setFoodPage(1); // Reset to the first page on search
    };

    const handleNonVegFoodSearch = (e) => {
        setNonVegfoodSearch(e.target.value);
        dispatch(getNonVegFood({ search: e.target.value, page: 1, limit: 10 }));

        setFoodPage(1); // Reset to the first page on search
    };

    const handleUserPageChange = (title, e) => {
        const newPage = title === "prev"
            ? userPage - 1
            : title === "next"
                ? userPage + 1
                : e.target.value !== ''
                    ? parseInt(e.target.value, 10)
                    : 1;

        if (newPage > 0) {
            const data = {
                search: userSearch,
                page: newPage,
                limit: 10,
            };

            dispatch(userList(data));
            setUserPage(newPage);
        }
    };

    const handlevegFoodPage = (title, e) => {
        const newPage = title === "prev"
            ? foodPage - 1
            : title === "next"
                ? foodPage + 1
                : e.target.value !== ''
                    ? parseInt(e.target.value, 10)
                    : 1;

        if (newPage > 0) {
            const data = {
                search: foodSearch,
                page: newPage,
                limit: 10,
            };

            dispatch(getVegFood(data));
            setFoodPage(newPage);
        }
    };

    const handlenonvegFoodPage = (title, e) => {
        const newPage = title === "prev"
            ? NonVegfoodPage - 1
            : title === "next"
                ? NonVegfoodPage + 1
                : e.target.value !== ''
                    ? parseInt(e.target.value, 10)
                    : 1;

        if (newPage > 0) {
            const data = {
                search: NonVegfoodSearch,
                page: newPage,
                limit: 10,
            };

            dispatch(getNonVegFood(data));
            setNonVegfoodPage(newPage);
        }
    };

    const handleEditFood = (item)=>{
        setModalOpen(true)
        setEditItemID({
            _id:item._id,
            title:item.title,
            image:item.image,
            description:item.description,
            type:item.type,
            price:item.price
        });
    }

    const EditDataHandler = (field, e) => {
        setEditItemID(prevState => ({
          ...prevState,
          [field]: e.target.value
        }));
    };

    const update =() =>{
        dispatch(updateFoodItem(EditItemID))
    }

    return (
        <div className={styles.adminContainer}>
            <Modal show={isModalOpen} onClose={closeModal} title="Update Food Item">
                <p></p>
                <input 
                value={EditItemID?.title}
                placeholder='title'
                onChange={(e)=> EditDataHandler("title",e)}
                />
                <input 
                value={EditItemID?.image}
                placeholder='image'
                onChange={(e)=> EditDataHandler("image",e)}

                />
                <input 
                value={EditItemID?.type}
                placeholder='type'
                onChange={(e)=> EditDataHandler("type",e)}

                />
                <input 
                value={EditItemID?.description}
                placeholder='description'
                onChange={(e)=> EditDataHandler("description",e)}

                />
                <input 
                value={EditItemID?.price}
                placeholder='price'
                onChange={(e)=> EditDataHandler("price",e)}

                />
                <button onClick={update}>Update</button>
            </Modal>
            <h1>Admin Dashboard</h1>

            {/* User Management Section */}
            <div className={styles.section}>
                <h2>Manage Users</h2>
                <input
                    type="text"
                    value={userSearch}
                    onChange={handleUserSearch}
                    placeholder="Search users"
                    className={styles.searchInput}
                />

                {users?.data?.map(user => (
                    <ul key={user.id}>
                        <li>
                            Name :- {user.name}
                        </li>
                        <li>
                            Email :-  ({user.email})
                        </li>
                    </ul>
                ))}
                <div className={styles.pagination}>
                    <button
                        onClick={(e) => handleUserPageChange("prev", e)}
                    >
                        Prev
                    </button>
                    <input placeholder='Num' onChange={(e) => handleUserPageChange("num", e)} />
                    <button
                        onClick={(e) => handleUserPageChange("next", e)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Add New Food Item Section */}
            <div className={styles.section}>
                <h2>Add New Food Item</h2>
                <input
                    type="text"
                    name="title"
                    value={newFoodItem.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="image"
                    value={newFoodItem.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className={styles.input}
                />
                <textarea
                    name="description"
                    value={newFoodItem.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className={styles.textarea}
                />
                <input
                    type="text"
                    name="type"
                    value={newFoodItem.type}
                    onChange={handleInputChange}
                    placeholder="Type (e.g., veg-maincourse)"
                    className={styles.input}
                />
                <input
                    type="number"
                    name="price"
                    value={newFoodItem.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className={styles.input}
                />
                <button onClick={handleAddFoodItem} className={styles.addButton}>Add Food Item</button>
            </div>

            {/* Manage Food Items Section */}
            <div className={styles.section}>
                <h2>Manage Food Items</h2>
                <h2>Veg Items</h2>
                <input
                    type="text"
                    value={foodSearch}
                    onChange={handleFoodSearch}
                    placeholder="Search food items"
                    className={styles.searchInput}
                />
                {vegItem?.data?.map(item => (
                    <ul key={item.id}>
                        <li>
                            {item.title}
                        </li>
                        <li>
                            {item.type}
                        </li>
                        <li>
                            ${item.price}
                        </li>
                        <li>
                            <button onClick={()=>{handleEditFood(item)}} className={styles.deleteButton}>Edit</button>
                        </li>
                    </ul>
                ))}
                <div className={styles.pagination}>
                    <button
                        onClick={(e) => handlevegFoodPage("prev", e)}
                    >
                        Prev
                    </button>
                    <input placeholder='Num' onChange={(e) => handlevegFoodPage("num", e)} />
                    <button
                        onClick={(e) => handlevegFoodPage("next", e)}
                    >
                        Next
                    </button>
                </div>
                <h2>Non-Veg Items</h2>
                <input
                    type="text"
                    value={NonVegfoodSearch}
                    onChange={handleNonVegFoodSearch}
                    placeholder="Search food items"
                    className={styles.searchInput}
                />
                {nonvegItem?.data?.map(item => (
                    <ul key={item.id}>
                        <li>
                            {item.title}
                        </li>
                        <li>
                            {item.type}
                        </li>
                        <li>
                            ${item.price}
                        </li>
                        <li>
                            <button onClick={()=>{handleEditFood(item)}} className={styles.deleteButton}>Edit</button>
                        </li>
                    </ul>
                ))}
                <div className={styles.pagination}>
                    <button
                        onClick={(e) => handlenonvegFoodPage("prev", e)}
                    >
                        Prev
                    </button>
                    <input placeholder='Num' onChange={(e) => handlenonvegFoodPage("num", e)} />
                    <button
                        onClick={(e) => handlenonvegFoodPage("next", e)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Manage Orders Section */}
            <div className={styles.section}>
                <h2>Manage Orders</h2>
                {orders?.map(order => (
                    <ul>
                        <li key={order._id}>
                            Order ID :- {order._id}
                        </li>
                        <li>
                            Total Order Value :- Rs.{order?.totalAmount}
                        </li>
                        <li>
                            Name :- {order?.address?.name}
                        </li>
                        <li>
                            City :- {order?.address?.city}
                        </li>
                        <li>
                            Contact :- {order?.address?.contact}
                        </li>
                        <li>
                            State :- {order?.address?.state}
                        </li>
                        <li>
                            StreetAdress :- {order?.address?.streetAddress}
                        </li>
                        <li>
                            Zipcode :- {order?.address?.zipCode}
                        </li>
                        <li>
                            Status :- {order?.status}
                        </li>
                        {order?.items?.map((el, i) => (
                            <ul key={i}>
                                <li>
                                    Dish Name :- {el?.itemId?.title}
                                </li>
                                <li>
                                    Dish Price :- Rs. {el?.price}
                                </li>
                                <li>
                                    Quantity :- {el?.quantity}
                                </li>
                            </ul>
                        ))}
                        <li>
                            <select
                                value={order.status}
                                onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                                className={styles.statusSelect}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </li>
                    </ul>
                ))}
            </div>
        </div >
    );
};

export default AdminFeatures;
