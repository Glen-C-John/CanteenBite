import React from 'react'
import './Header.css'
import { motion } from 'framer-motion'

const Header = () => {

  return (
    <div className='header'>
        <motion.div 
            className="header-contents"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div>
              <a href="/#explore-menu"><button>View Menu</button></a>
            </div>
        </motion.div>
    </div>
  )
}

export default Header
