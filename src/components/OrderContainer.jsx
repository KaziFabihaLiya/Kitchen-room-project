import React, { use, useState } from 'react';
import States from './States';
import OrderCard from './cards/OrderCard';
import CookingCard from './CookingCard';
import ServeCard from './cards/ServeCard';
import { toast, Slide, ToastContainer } from 'react-toastify';

const OrderContainer = ({ promise }) => {
    const data = use(promise)

    const [Orders, setOrders] = useState(data);
    // cooking and ready items er state
    const [Cooking, setCooking] = useState([]);
    const [ReadyItems, setReadyItems] = useState([]);


    const handleOrder = (orderData) => {

        const isExist = Cooking.find(item => item.id === orderData.id);
        if(isExist){
            toast.warning('This order is already in cooking list');
            return;
        }

        const newCooking = [...Cooking, orderData];
        setCooking(newCooking);

    }

    const handleCooking = (order) => {
        // Cooked? a click korle

        order.cooked_At = new Date().toLocaleTimeString();
        // readyItems a order ta add korbo
        const newReadyItems = [...ReadyItems, order];
        setReadyItems(newReadyItems);
        // cooking theke order ta remove korbo
        const remainingCooking = Cooking.filter((item) => item.order_no !== order.order_no);

        setCooking(remainingCooking);

        //order theke o remove korbo
        const remainingOrders = Orders.filter((item) => item.id !== order.id);
        setOrders(remainingOrders);
    }
    return (
        <div>
            <States 
            readyTotal={ReadyItems.length}
            cookingTotal={Cooking.length}
            order={Orders.length}>
            </States>
            <section className='w-11/12 mx-auto py-10 grid grid-cols-12 gap-5'>
            <div className="lg:col-span-7">
                <h2 className='font-bold text-4xl'>Current Orders</h2>
                <div className="space-y-5">
                    {
                        Orders.map((order) =>
                            <OrderCard handleOrder={handleOrder} key={order.id} order={order}></OrderCard>)
                    }
                </div>
            </div>
            <div className="lg:col-span-5 space-y-5">
                <h2 className='font-black text-4xl'>Cooking Now</h2>
                <div className="shadow p-10 space-y-5">
                    {
                        Cooking.map((orderItems) => 
                        <CookingCard 
                        key={orderItems.id} 
                        order={orderItems} 
                        handleCooking={handleCooking}>
                        </CookingCard>)
                    }
                </div>


                <h2>Order Ready</h2>
                <div className="shadow p-10 space-y-5">
                    {
                        ReadyItems.map((order) =>(
                        <ServeCard 
                        key={order.id} 
                        order={order}
                        handleCooking={handleCooking}>
                        </ServeCard>))
                    }
                </div>
            </div>
            </section>
        </div>
    );
};

export default OrderContainer;