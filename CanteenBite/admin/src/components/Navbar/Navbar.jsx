import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.div 
      className='navbar'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <h1>CanteenBites</h1>
        <img  className='profile' src={assets.profile_image} alt="" />
      
    </motion.div>
  )
}

export default Navbar
