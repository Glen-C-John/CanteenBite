import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [otpErrors, setOtpErrors] = useState({});

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network Error");
      console.error(error);
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  }

  const verifyHandler = async (orderId) => {
    try {
      const otp = otpInputs[orderId];
      if (!otp) {
        toast.error("Please enter the 4-digit code");
        return;
      }
      const response = await axios.post(url + "/api/order/verify-otp", { orderId, otp });
      if (response.data.success) {
        toast.success("Order verified and marked as delivered");
        setOtpInputs(prev => ({...prev, [orderId]: ""}));
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Invalid OTP");
        setOtpErrors(prev => ({...prev, [orderId]: true}));
        setTimeout(() => {
          setOtpErrors(prev => ({...prev, [orderId]: false}));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying OTP");
    }
  }

  useEffect(() => {
    fetchAllOrders();

    const eventSource = new EventSource(url + "/api/order/stream");
    
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'update') {
            fetchAllOrders();
        }
    };
    
    return () => {
        eventSource.close();
    };
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.filter(order => order.status !== "Delivered").map((order, index) => (
          <motion.div 
            key={index} 
            className='order-item'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className='order-item-food'>
                {/* Added optional chaining (?.) to prevent crashes on missing items */}
                {order.items?.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>

              {/* Added safe checks for address to prevent crashes on malformed test data */}
              <p className="order-item-name">
                {order.address ? `${order.address.firstName} ${order.address.lastName}` : "No Name Provided"}
              </p>

              <div className="order-item-address">
                <p style={{fontWeight: "bold", color: "#e84c4f"}}>Pickup Time: {order.address?.pickupTime || "ASAP"}</p>
              </div>
              <p className='order-item-phone'>{order.address?.phone || "No Phone"}</p>
            </div>

            <p>Items: {order.items?.length || 0}</p>
            <p>${order.amount || 0}</p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Picked Up">Picked Up</option>
            </select>
            
            <div className="otp-verification" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <input 
                type="text" 
                placeholder="4-digit code" 
                value={otpInputs[order._id] || ""}
                onChange={(e) => setOtpInputs(prev => ({...prev, [order._id]: e.target.value}))}
                maxLength={4}
                style={{ 
                  padding: '8px', 
                  borderRadius: '4px', 
                  border: otpErrors[order._id] ? '2px solid red' : '1px solid #ccc',
                  outline: 'none',
                  backgroundColor: otpErrors[order._id] ? '#ffe6e6' : 'white',
                  transition: '0.3s',
                  width: '100%'
                }}
              />
              <button 
                onClick={() => verifyHandler(order._id)}
                style={{
                  padding: '8px',
                  backgroundColor: 'var(--color-primary, #6366F1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Verify & Complete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Orders