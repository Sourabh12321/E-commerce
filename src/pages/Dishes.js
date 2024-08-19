import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import styles from '../css/DishesPage.module.css'
import HeaderImg from '../media/Dishes/headerImage.png'
import Bowl1 from '../media/Dishes/ChickenLegBowl1.webp'
import Bowl2 from '../media/Dishes/ChickenLegBowl2.webp'
import Bowl3 from '../media/Dishes/ChickenLegBowl3.webp'
import Bowl4 from '../media/Dishes/ChickenLegBowl4.webp'
import Bowl5 from '../media/Dishes/ChickenLegBowl5.webp'
import OrderNow from '../media/HomePageImages/order-now_1280.webp'

function Dishes() {
    return (
        <div className={styles.mainDiv}>
            <NavBar />
            <div className={styles.top}>
                <img src={HeaderImg} alt="" />
            </div>
            <div className={styles.bowls}>
                <h1>CHICKEN BOWLS</h1>
            </div>
            <div className={styles.bowls_top}>
                <div>
                    <img src={Bowl1} alt="" />
                    <h1>Original Pollo Bowls</h1>
                    <a href="file:///C:/Users/dell/Desktop/Original%20Meals.pdf">Nutrition Info</a>
                </div>
                <div>
                    <img src={Bowl2} alt="" />
                    <h1>Chicken Bowl</h1>
                    <a href="file:///C:/Users/dell/Desktop/Original%20Meals.pdf">Nutrition Info</a>
                </div>
                <div>
                    <img src={Bowl3} alt="" />
                    <h1>Grande Avocado</h1>
                    <a href="file:///C:/Users/dell/Desktop/Original%20Meals.pdf">Nutrition Info</a>
                </div>
                <div>
                    <img src={Bowl4} alt="" />
                    <h1>Grande Avocado Chicken Bowl</h1>
                    <a href="file:///C:/Users/dell/Desktop/Original%20Meals.pdf">Nutrition Info</a>
                </div>
                <div>
                    <img src={Bowl5} alt="" />
                    <h1>Double Chicken Bowl</h1>
                    <a href="file:///C:/Users/dell/Desktop/Original%20Meals.pdf">Nutrition Info</a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dishes