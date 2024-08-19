import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import styles from '../css/AboutPage.module.css'
import Chef from '../media/About/chef.jpeg'

function AboutPage() {
  return (
    <div className={styles.mainDiv}>
      <NavBar />
      <div>
        <NavBar />
        <div className={styles.container}>
          <h1 style={{marginTop:'90px'}}>About Us</h1>
          <div className={styles.content}>
            <div className={styles.description}>
              <h2>Our Story</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed magna quis mauris ultricies maximus.
                Proin vel lectus vitae felis luctus fermentum. Aliquam erat volutpat. Nullam viverra mi id tellus volutpat,
                eget molestie arcu posuere. Sed vitae viverra odio, at vestibulum diam. Vestibulum sit amet vestibulum libero.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam lacinia
                lacinia sem at luctus. Nullam sodales sit amet purus eu ullamcorper.
              </p>
            </div>
            <div className={styles.image}>
              <img src={Chef} alt="Chef" />
            </div>
          </div>
          <div className={styles.mission}>
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed magna quis mauris ultricies maximus.
              Proin vel lectus vitae felis luctus fermentum. Aliquam erat volutpat. Nullam viverra mi id tellus volutpat,
              eget molestie arcu posuere. Sed vitae viverra odio, at vestibulum diam. Vestibulum sit amet vestibulum libero.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam lacinia
              lacinia sem at luctus. Nullam sodales sit amet purus eu ullamcorper.
            </p>
          </div>
          <div className={styles.vision}>
            <h2>Our Vision</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed magna quis mauris ultricies maximus.
              Proin vel lectus vitae felis luctus fermentum. Aliquam erat volutpat. Nullam viverra mi id tellus volutpat,
              eget molestie arcu posuere. Sed vitae viverra odio, at vestibulum diam. Vestibulum sit amet vestibulum libero.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam lacinia
              lacinia sem at luctus. Nullam sodales sit amet purus eu ullamcorper.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AboutPage