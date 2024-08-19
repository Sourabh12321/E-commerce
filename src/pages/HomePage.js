import React, { useEffect, useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import FruitImg1 from '../media/HomePageImages/FruitsImg1.webp'
import FruitImg2 from '../media/HomePageImages/FruitsImg2.jpg'
import FruitImg3 from '../media/HomePageImages/FruitsImg3.webp'
import FruitImg4 from '../media/HomePageImages/FruitsImg4.webp'
import veg1 from "../media/HomePageImages/veg1.jpg"
import veg2 from "../media/HomePageImages/veg2.jpg"
import veg3 from "../media/HomePageImages/veg3.jpg"
import nonveg1 from "../media/HomePageImages/nonveg1.jpg"
import nonveg2 from "../media/HomePageImages/nonveg2.jpg"
import nonveg3 from "../media/HomePageImages/nonveg3.jpg"
import styles from '../css/HomePage.module.css'


function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();


  const imgList = [FruitImg1, FruitImg2, FruitImg3, FruitImg4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % imgList.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [imgList.length]);

  const handleNonVeg = () =>{
    navigate('/nonveg')
  }

  const handleVeg = () =>{
    navigate('/veg')
  }

  return (
    <div>
      <NavBar/>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Welcome to Foodie!</h1>
            <p>Discover the best food & drinks near you.</p>
            <button className={styles.orderButton}>Order Now</button>
          </div>
        </section>

        <section className={styles.featuredItems}>
          <h2>Top Veg Items</h2>
          <div className={styles.itemCards}>
            {/* Veg Item Card */}
            <div className={styles.card} onClick={handleVeg}>
              <img src={veg1} alt="Kadai Paneer" />
              <h3>Kadai Paneer</h3>
              <p>Delicious and flavorful</p>
            </div>
            <div className={styles.card} onClick={handleVeg}>
              <img src={veg2} alt="Paneer Butter Masala" />
              <h3>Paneer Butter Masala</h3>
              <p>Rich and creamy</p>
            </div>
            <div className={styles.card} onClick={handleVeg}>
              <img src={veg3} alt="Veg Biryani" />
              <h3>Veg Biryani</h3>
              <p>Aromatic and spicy</p>
            </div>
          </div>
          <button className={styles.orderButton} onClick={handleVeg}>Order Now</button>

        </section>

        {/* Top Non-Veg Items Section */}
        <section className={styles.featuredItems}>
          <h2>Top Non-Veg Items</h2>
          <div className={styles.itemCards}>
            {/* Non-Veg Item Card */}
            <div className={styles.card} onClick={handleNonVeg}>
              <img src={nonveg1} alt="Chicken Curry" />
              <h3>Chicken Curry</h3>
              <p>Spicy and flavorful</p>
            </div>
            <div className={styles.card} onClick={handleNonVeg}>
              <img src={nonveg2} alt="Mutton Biryani" />
              <h3>Mutton Biryani</h3>
              <p>Rich and aromatic</p>
            </div>
            <div className={styles.card} onClick={handleNonVeg}>
              <img src={nonveg3} alt="Fish Fry" />
              <h3>Fish Fry</h3>
              <p>Crispy and tangy</p>
            </div>
          </div>
          <button className={styles.orderButton} onClick={handleNonVeg}>Order Now</button>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <h2>What Our Customers Say</h2>
          <div className={styles.testimonialCards}>
            <div className={styles.card}>
              <p>"The food was amazing and the delivery was quick. Highly recommend!"</p>
              <h3>- Sourabh Rajput</h3>
            </div>
            <div className={styles.card}>
              <p>"Great variety and excellent service. Will order again!"</p>
              <h3>- Mahendra Rajput</h3>
            </div>
            <div className={styles.card}>
              <p>"The best food delivery service in town. Loved it!"</p>
              <h3>- Neelam Rajput</h3>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
    
  );
}

export default HomePage