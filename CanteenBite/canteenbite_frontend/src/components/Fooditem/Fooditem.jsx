import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Fooditem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url,food_list} = useContext(StoreContext);
    const item = food_list.find(f => f._id === id);
    const isAvailable = item ? item.available !== false : true;

    const renderImageUrl = (imageName) => {
        if (!imageName) return "/default.jpg";
        if (imageName.startsWith("http")) return imageName;
        return `${url}/images/${imageName}`;
    };

  return (
    <div className={`food-item ${!isAvailable ? 'sold-out' : ''}`}>
        <div className="food-item-img-container">
            <img className='food-item-image' src={renderImageUrl(image)} alt="" />
            {!isAvailable ? (
                <div className="sold-out-badge">Sold Out</div>
            ) : (
                !cartItems[id]
                    ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                    :<div className="food-item-counter">
                      <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                      <p>{cartItems[id]}</p>
                      <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
            )}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default Fooditem
