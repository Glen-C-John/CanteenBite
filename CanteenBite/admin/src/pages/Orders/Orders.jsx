import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
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
                <p>{order.address?.street ? order.address.street + "," : ""}</p>
                <p>
                  {order.address?.city ? `${order.address.city}, ` : ""}
                  {order.address?.state ? `${order.address.state}, ` : ""}
                  {order.address?.country ? `${order.address.country}, ` : ""}
                  {order.address?.zipcode ? order.address.zipcode : ""}
                </p>
              </div>
              <p className='order-item-phone'>{order.address?.phone || "No Phone"}</p>
            </div>

            <p>Items: {order.items?.length || 0}</p>
            <p>${order.amount || 0}</p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders