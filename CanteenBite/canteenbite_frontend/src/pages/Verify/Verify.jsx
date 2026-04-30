import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    // Hooks to grab URL parameters (e.g., ?success=true&orderId=123)
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    }

    // Run the verification function as soon as the component mounts
    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            {/* The spinning loader UI */}
            <div className="spinner"></div>
        </div>
    )
}

export default Verify;