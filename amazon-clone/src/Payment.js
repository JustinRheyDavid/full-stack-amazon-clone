import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

function Payment() {
    const [{basket, user}] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (getBasketTotal(basket) <= 0) return;

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`,
            });
            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();
    }, [basket]);

    console.log('the secret is >>>', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();

        setProcessing(true);

        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ error }) => {
            setProcessing(false);

            if (error) {
                setError(error.message);
                return;
            }

            setSucceeded(true);
            setError(null);
            navigate('/orders', { replace: true });
        });
    };

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


  return (
    <div className = 'payment'>
      <div className= 'payment_container'>
        <h1>
            Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
      </div>

{/* payment section - review items*/}
        <div className ='payment_section'>
 <div className ='payment_title'>
    <h3>Delivery Adress</h3>
</div>
<div className ='payment_address'>
    <p>{user?.email}</p>
    <p>123 React lane</p>
    <p>LA, CA</p>

        </div>
</div>
{/* payment section - review items*/}
            <div className ='payment_section'>
                 <div className ='payment_title'>
                     <h3>Review items and delivery</h3>
    </div>
                    <div className = 'payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}

                    </div>
</div>
{/* payment section - review items*/}
                <div className ='payment_section'>  
<div className ='payment_title'>  
                        <h3>Payment Method</h3>

</div>
<div className ='payment_detail'>  
    {/*stripe*/}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) =>
                                        (<h3>Order Total: {value}</h3>)
                                    }
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />

                                <button className='payment_button' disabled={!stripe || processing || disabled || succeeded}>
                                    <span>{processing ? "Processing" : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div className='payment_error'>{error}</div>}
                        </form>

</div>


</div>

    </div>
  )
}

export default Payment
