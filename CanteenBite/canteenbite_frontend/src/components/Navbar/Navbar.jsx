import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false);

    const { getTotalCartAmount, token, setToken, searchQuery, setSearchQuery, food_list, url } = useContext(StoreContext);

    const navigate = useNavigate();

    const filteredFoods = food_list ? food_list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const handleSuggestionClick = (item) => {
        setSearchQuery(item.name);
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById("food-display");
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        setShowSearch(false);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");

    }

    return (
        <div className='navbar'>
            <Link to='/'><h1>CanteenBites</h1></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="/#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="/#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
                {token ? <Link to="/myorders" onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>My Orders</Link> : null}
            </ul>
            <div className='navbar-right'>
                <div className="navbar-search" style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    {showSearch && (
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search food..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--color-primary)',
                                    outline: 'none',
                                    width: '200px'
                                }}
                            />
                            {searchQuery && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                                    marginTop: '8px',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    zIndex: 1000
                                }}>
                                    {filteredFoods.length > 0 ? filteredFoods.map(item => (
                                        <div
                                            key={item._id}
                                            onClick={() => handleSuggestionClick(item)}
                                            style={{
                                                padding: '10px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #eee',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <img src={url + "/images/" + item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{item.name}</span>
                                                <span style={{ fontSize: '12px', color: 'var(--color-primary)' }}>₹{item.price}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ padding: '15px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <img
                        src={assets.search_icon}
                        alt="search"
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearchQuery("");
                        }}
                        style={{ cursor: "pointer", transition: "0.3s" }}
                    />
                </div>
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}
<a href=""></a>
export default Navbar



