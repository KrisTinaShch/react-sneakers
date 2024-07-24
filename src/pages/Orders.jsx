
import React from 'react';
import Card from '../components/Card'
function Orders({ searchValue }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-30">
                <h1> Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                <div className="d-flex flex-wrap">
                    {[].filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                        <Card key={`card-${index}`} title={item.title} price={item.price} imageUrl={item.imageUrl} />
                    ))}
                </div>
            </div>
        </div>
    )

}
export default Orders;