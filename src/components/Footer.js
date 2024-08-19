import React from 'react'
import styles from './Css/Footer.module.css'
import Android from '../media/Footer/AndroidDownloadButton.webp'
import AppStore from '../media/Footer/AppStoreDownloadButton.webp'
import Facebook from '../media/Footer/facebook.jpg'
import Instagram from '../media/Footer/Instagram_icon.png'
import Twitter from '../media/Footer/twitter.jpg'

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer1}>
                <div className={styles.footer11}>
                    <h4>Menu</h4>
                    <h4>Catering</h4>
                    <h4>Gift Cards</h4>
                    <h4>Fundraisers & Charities</h4>
                    <h4>Careers</h4>
                </div>
                <div className={styles.footer12}>
                    <h4>Franchising</h4>
                    <h4>Investors</h4>
                    <h4>Press Releases</h4>
                    <h4>Contact Us</h4>
                    <h4>Feedback</h4>
                </div>
                <div className={styles.footer13}>
                    <h2>Join Loco Rewards</h2>
                    <p>Earn points with every order, receive a birthday reward and other valuable offers throughout the year. Plus, special app features to order ahead, pay, and save your favorites.</p>
                    <div>
                        <img src={AppStore} alt="" />
                        <img src={Android} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.footerlast}>
                <div className={styles.icons}>
                    <img src={Facebook} alt="" />
                    <img src={Twitter} alt="" />
                    <img src={Instagram} alt="" />
                </div>
                <div className={styles.nutrition}>
                    <div>
                        <p>Nutrition Guide</p>
                        <h5>|</h5>
                        <p>Terms of Use</p>
                        <h5>|</h5>
                        <p>Privacy Policy</p>
                        <h5>|</h5>
                        <p>Coupon Policy</p>
                        <h5>|</h5>
                        <p>Site Map</p>
                        <h5>|</h5>
                        <p>Do Not Sell or Share My Personal Information</p>
                    </div>
                    <div>
                        <p>Cookie Settings</p>
                        <h5>|</h5>
                        <p>© Tasty food. All Rights</p>
                        <h5>|</h5>
                        <p>Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer