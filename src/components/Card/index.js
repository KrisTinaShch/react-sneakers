import styles from './Card.module.scss'
import React from 'react';
function Card({ onFavorite, imageUrl, title, price, onPlus, favorite = false }) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorite);
    const onClickFavorite = () => {
        onFavorite({ title, imageUrl, price });
        setIsFavorite(!isFavorite);
    }

    const onClickPlus = () => {
        onPlus({ title, imageUrl, price });
        setIsAdded(!isAdded);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked"></img>
            </div>
            <img src={imageUrl} alt="sneaker-image" width={133} height={112}></img>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price} руб.</b>
                </div>
                <button className="button" onClick={onClickPlus}>
                    <img src={isAdded ? "./img/button-checked.svg" : "./img/button-unchecked.svg"} alt="" />

                </button>
            </div>
        </div>
    )
}

export default Card;