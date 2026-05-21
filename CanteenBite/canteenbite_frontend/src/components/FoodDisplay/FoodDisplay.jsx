import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Fooditem from '../Fooditem/Fooditem'
import { motion } from 'framer-motion'

const FoodDisplay = ({category}) => {
    
    const {food_list, searchQuery} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >Top dishes for you</motion.h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                if (category==="All" || category===item.category) {
                  if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return null;
                  }
                  return (
                      <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          viewport={{ once: true, amount: 0.1 }}
                      >
                          <Fooditem id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                      </motion.div>
                  )
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
