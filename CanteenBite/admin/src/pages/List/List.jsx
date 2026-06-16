import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const List = ({url}) => {

    
    const [list,setList] = useState([]);

    const fetchList = async () => {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      }
      else{
        toast.error("error")
      }
    }

    const removeFood = async(FoodId) => {
      const response = await axios.post(`${url}/api/food/remove`, {id:FoodId});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else{
        toast.error("Error");
      }
    }

    const toggleAvailability = async (id, currentStatus) => {
      const response = await axios.post(`${url}/api/food/availability`, {id, available: !currentStatus});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error");
      }
    }

    useEffect(()=>{
      fetchList();
    },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title"> 
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Available</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return (
              <motion.div 
                key={index} 
                className='list-table-format'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p>
                <input type="checkbox" checked={item.available !== false} onChange={() => toggleAvailability(item._id, item.available !== false)} />
              </p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </motion.div>
            )
        })}
      </div>
      
    </div>
  )
}

export default List
