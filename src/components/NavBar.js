import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Css/NavBar.module.css';
import logoImage from '../media/Navbar/Logo.jpg';
import CartLogo from '../media/Navbar/cartLogo.jpg'
import hamburger from '../media/Navbar/hamburger.png'
import { logout } from '../redux/slice/auth';
import { useDispatch } from 'react-redux';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState('')

  const [isActive, setIsActive] = useState(false);
  let name = localStorage.getItem("name");


  useEffect(() => {
    if (name !== undefined) {
      setUser(name)
    }

  }, [name])

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();

  }

  const toggleMenu = () => {
    setIsActive(!isActive);
  };


  const handleCartClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault(); // Prevent navigation
      alert("Please log in first.");
    }
  };

  const handleSignup = (data)=>{
    // navigate("/signupLogin")
    navigate(`/signupLogin?page=${data}`)
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.hamNav} style={{ display: `${isActive ? 'block' : 'none'}` }}>
        <h1 >
          <Link to="/">Home</Link>
        </h1>
        <h1>
          <Link to="/dishes">Dishes</Link>
        </h1>
        <h1>
          <Link to="/veg">Veg</Link>
        </h1>
        <h1>
          <Link to="/nonveg">Non-Veg</Link>
        </h1>
        <h1>
          <Link to="/cart" onClick={handleCartClick}>Cart</Link>
        </h1>
        <h1>
          <Link to="/orderDetails" onClick={handleCartClick}>OrderDetails</Link>
        </h1>
        <h1>
          <Link to="/about">About</Link>
        </h1>
      </div>
      <div className={styles.navbar1}>
        <div>
          {/* <button class={styles.hamburger} className={`${styles.hamburger} ${isActive ? styles.isActive : ''}`} onClick={toggleMenu}> */}
          <img src={hamburger} class={styles.hamburger} className={`${styles.hamburger} ${isActive ? styles.isActive : ''}`} onClick={toggleMenu} />
          {/* </button> */}
        </div>
        <div className={styles.navbar12}>
          <Link >
            <img
              src={logoImage}
              alt=""
            />
          </Link>
        </div>
        <div className={styles.navbar13}>
          <h1 >
            <Link to="/">Home</Link>
          </h1>
          <h1>
            <Link to="/dishes">Dishes</Link>
          </h1>
          <h1>
            <Link to="/veg">Veg</Link>
          </h1>
          <h1>
            <Link to="/nonveg">Non-Veg</Link>
          </h1>
          <h1>
            <Link to="/orderDetails" onClick={handleCartClick}>OrderDetails</Link>
          </h1>
          <h1>
            <Link to="/about">About</Link>
          </h1>
        </div>
      </div>
      {user && user?.length > 0 ? < div className={styles.login} >
        <h1 className={styles.si}>
          {user}
        </h1>
        <h1>||</h1>
        <h1 style={{ cursor: 'pointer' }} onClick={handleLogout} >
          Logout
        </h1>
      </div> : <div className={styles.login} >
        <h1 className={styles.si} onClick={()=>{handleSignup("signup")}}>
          Signup
        </h1>
        <h1>||</h1>
        <h1 onClick={()=>{handleSignup("Login")}}>
          Login
        </h1>
      </div>
      }
      <div className={styles.navbar2}>
        <div className={styles.navbar21}>
          <img
            src={CartLogo}
            alt=""
          />
        </div>
        <div className={styles.navbar22}>
          <h1>
            <Link to="/cart" onClick={handleCartClick}>Cart</Link>
          </h1>
        </div>
      </div>
    </div >
  );
}

export default NavBar;
