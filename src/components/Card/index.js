import styles from './Card.module.scss'
import React from 'react';
function Card(props) {

    const [isAdded, setIsAdded] = React.useState(false);
    const onClickPlus = () => {
        setIsAdded(!isAdded);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={props.onFavorite}>
                <img src="/img/heart-unliked.svg" alt="unliked"></img>
            </div>
            <img src={props.imageUrl} alt="sneaker-image" width={133} height={112}></img>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{props.price}</b>
                </div>
                <button className="button" onClick={onClickPlus}>
                    <img src={isAdded ? "./img/button-checked.svg" : "./img/button-unchecked.svg"} alt="" />

                </button>
            </div>
        </div>
    )
}

export default Card;