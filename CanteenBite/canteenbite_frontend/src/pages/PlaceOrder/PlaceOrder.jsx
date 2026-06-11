import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    
    const [data, setData] = useState({
        pickupTime: "12:00 PM"
    });

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount(), 
        }
        
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url); 
        } else {
            alert("Error placing order");
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <motion.form 
            onSubmit={placeOrder} 
            className='place-order'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="place-order-left">
                <p className="title">Pickup Information</p>
                <div className="multi-fields">
                    <select required name='pickupTime' onChange={onChangeHandler} value={data.pickupTime} style={{width: '100%', padding: '10px', marginTop: '10px', border: '1px solid #c5c5c5', borderRadius: '4px'}}>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="12:15 PM">12:15 PM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="12:45 PM">12:45 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:15 PM">1:15 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="1:45 PM">1:45 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="2:15 PM">2:15 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                    </select>
                </div>
            </div>
            
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount()}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </motion.form>
    )
}

export default PlaceOrder;
