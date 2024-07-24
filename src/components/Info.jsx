import React from 'react'
import AppContext from '../context';

const Info = ({ title, description, image }) => {
    const { setCardOpened } = React.useContext(AppContext);
    return (
        <div className="empty-cart d-flex flex-column align-center justify-center text-center">
            <img src={image} alt="empty-cart" />
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <button className="greenButton left" onClick={() => setCardOpened(false)}>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 7H1.28571" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.28564 1L1.28564 7L7.28564 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Вернуться назад
            </button>
        </div>
    )
}

export default Info;
