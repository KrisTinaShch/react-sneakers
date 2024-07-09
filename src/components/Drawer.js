function Drawer() {
    return (
        <div className="drawer d-flex flex-column">
            <h2 className="mb-30 d-flex justify-between">
                Корзина
                <img src="/img/btn-remove.svg" alt="remove-button" className="removeBtn  cu-p" />
            </h2>
            <div className="items flex">

                <div className="cartItem d-flex align-center mb-20">

                    <div className="cartItemImg" style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}>
                    </div>

                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img src="/img/btn-remove.svg" alt="remove-button" className="removeBtn" />
                </div>

                <div className="cartItem d-flex align-center mb-20">
                    <div className="cartItemImg" style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}>
                    </div>
                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img src="/img/btn-remove.svg" alt="remove-button" className="removeBtn" />
                </div>


            </div>
            <div class="cartTotalBlock">
                <ul>
                    <li className="d-flex">
                        <span>Итого: </span>
                        <div></div>
                        <b>21 498 руб. </b>
                    </li>
                    <li className="d-flex">
                        <span>Налог 5%: </span>
                        <div></div>
                        <b>1074 руб. </b>
                    </li>
                </ul>
                <button className="greenButton">
                    Оформить заказ
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Drawer;