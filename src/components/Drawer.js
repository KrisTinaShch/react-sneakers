import Info from './Info'
import React from 'react'
import { useCart } from '../hooks/useCart'

function Drawer({ onClose, items = [], onRemoveFromCart ,opened}) {
  const { setCartItems, totalPrice } = useCart();

  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const onClickOrder = () => {
    setIsOrderCompleted(true);
    setCartItems([]);
  }
  return (
    <div>
      <div className="overlay cu-p" onClick={onClose}></div>
      <div className="drawer d-flex flex-column ">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img src="img/btn-remove.svg" alt="remove-button" className="removeBtn cu-p" onClick={onClose} />
        </h2>

        <div className="items d-flex flex-column  justify-between">
          {items.length === 0 ? (
            <Info
              title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
              description={isOrderCompleted ? "Ваш заказ #18 скоро будет передан курьерской доставке" : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
              image={isOrderCompleted ? 'img/completed-cart.svg' : 'img/empty-cart.svg'}>
            </Info>

          ) : (
            <>
              <div>
                {items.map((item) => (
                  <div key={item.id} className="cartItem d-flex align-center mb-20 ">
                    <div className="cartItemImg" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img src="img/btn-remove.svg" alt="remove-button" className="removeBtn" onClick={() => onRemoveFromCart(item.id)} />
                  </div>

                ))}
              </div>
              <div>
                <div>
                  <div className="cartTotalBlock">
                    <ul>
                      <li className="d-flex">
                        <span>Итого: </span>
                        <div></div>
                        <b>{totalPrice} руб. </b>
                      </li>
                      <li className="d-flex">
                        <span>Налог 5%: </span>
                        <div></div>
                        <b>{Math.round(totalPrice * 0.05)} руб.  </b>
                      </li>
                    </ul>
                    <button className="greenButton " onClick={onClickOrder}>
                      Оформить заказ
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>


  );
}

export default Drawer;
