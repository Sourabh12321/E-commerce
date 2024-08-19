import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../css/UserLoginSignup.module.css';
import { authUserSignup, authUserLogin } from '../redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

function UserLoginSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const state = useSelector((state) => state?.auth);
    const [show, setShow] = useState(false);
    const [signUp, setSignUp] = useState({ name: '', email: '', password: '' });
    const [login, setLogin] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ signUp: {}, login: {} });

    const page = new URLSearchParams(search).get('page');

    useEffect(() => {
        setSignUp({ name: '', email: '', password: '' });
        setLogin({ email: '', password: '' });
        if (page === "signup") {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [search]);

    useEffect(() => {
        if (state?.data?.msg?.length) {
            // swal(state?.data?.msg);
            if (state?.data?.msg === "user is registered successfully") {
                setShow(true);
            } else if (state?.data?.msg === "Logged In") {
                localStorage.setItem("token", state?.data?.token);
                localStorage.setItem("name", state?.data?.name);
                localStorage.setItem("id", state?.data?.result);
                if(state?.data?.admin){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
            }
        }
    }, [state, navigate]);

    const handleShowLoginSignup = () => {
        setShow(!show);
    };

    const handleSignup = (field, e) => {
        setSignUp({ ...signUp, [field]: e.target.value });
        setErrors({ ...errors, signUp: { ...errors.signUp, [field]: '' } });
    };

    const handleLogin = (field, e) => {
        setLogin({ ...login, [field]: e.target.value });
        setErrors({ ...errors, login: { ...errors.login, [field]: '' } });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateSignup = () => {
        const newErrors = {};
        if (!signUp.name) newErrors.name = 'Name is required';
        if (!signUp.email) newErrors.email = 'Email is required';
        else if (!validateEmail(signUp.email)) newErrors.email = 'Email is invalid';
        if (!signUp.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const validateLogin = () => {
        const newErrors = {};
        if (!login.email) newErrors.email = 'Email is required';
        else if (!validateEmail(login.email)) newErrors.email = 'Email is invalid';
        if (!login.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleAuth = (field) => {
        if (field === 'sign') {
            const validationErrors = validateSignup();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...errors, signUp: validationErrors });
            } else {
                dispatch(authUserSignup(signUp));
            }
        } else {
            const validationErrors = validateLogin();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...errors, login: validationErrors });
            } else {
                dispatch(authUserLogin(login));
            }
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.mainDiv}>
                <div className={styles.body}>
                    <div className={`${styles.box} ${!show ? styles.active : ''}`}>
                        <h1>Create a new Account</h1>
                        <p>Create an account to continue Booking Your Order</p>
                        <div className={styles.or}>or</div>
                        <input
                            type="text"
                            className={styles.name}
                            value={signUp.name}
                            onChange={(e) => handleSignup('name', e)}
                            name="name"
                            placeholder="Enter Your Name"
                            required
                        />
                        {errors.signUp.name && <p className={styles.error}>{errors.signUp.name}</p>}
                        <div className={styles.line}></div>
                        <input
                            type="email"
                            className={styles.email}
                            value={signUp.email}
                            onChange={(e) => handleSignup('email', e)}
                            name="email"
                            placeholder="Email"
                            required
                        />
                        {errors.signUp.email && <p className={styles.error}>{errors.signUp.email}</p>}
                        <div className={styles.line}></div>
                        <input
                            type="password"
                            className={styles.password}
                            value={signUp.password}
                            onChange={(e) => handleSignup('password', e)}
                            name="Password"
                            placeholder="Password"
                            required
                        />
                        {errors.signUp.password && <p className={styles.error}>{errors.signUp.password}</p>}
                        <div className={styles.line}></div>
                        <button onClick={() => handleAuth('sign')} className={styles.signupform}>Sign In</button><br></br>
                        <span onClick={handleShowLoginSignup}>Already Registered? Login</span>
                    </div>
                    <div className={`${styles.box} ${show ? styles.active : ''}`}>
                        <h1>Login to tasty food</h1>
                        <p>Login your account to continue Booking Your Order.</p>
                        <input
                            type="email"
                            className={styles.email}
                            value={login.email}
                            onChange={(e) => handleLogin('email', e)}
                            name="email"
                            placeholder="Email"
                            required
                        />
                        {errors.login.email && <p className={styles.error}>{errors.login.email}</p>}
                        <div className={styles.line}></div>
                        <input
                            type="password"
                            className={styles.password}
                            name="Password"
                            value={login.password}
                            onChange={(e) => handleLogin('password', e)}
                            placeholder="Password"
                            required
                        />
                        {errors.login.password && <p className={styles.error}>{errors.login.password}</p>}
                        <div className={styles.line}></div>
                        {/* <p><a href="#">Forgot Password?</a></p> */}
                        <button onClick={() => handleAuth('login')}>Log In</button><br></br>
                        <span>New to tasty food?</span><u onClick={handleShowLoginSignup}>Register</u><br></br>                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserLoginSignup;
