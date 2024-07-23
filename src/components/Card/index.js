import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader";
function Card({ onFavorite, imageUrl, title, price, id, parentID, onPlus, favorite = false, added = false, loading = false }) {

  React.useEffect(() => {
    setIsAdded(added);
  }, [added]);
  
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorite);
  const obj = { title, imageUrl, price, id, parentID: id }
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }
 

  const onClickPlus = () => {
    onPlus(obj);
    setIsAdded(!isAdded);
  }

  return (
    <div className={styles.card}>
      {loading ? <ContentLoader
        speed={2}
        width={400}
        height={300}
        viewBox="0 0 400 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
        <rect x="0" y="160" rx="5" ry="5" width="150" height="15" />
        <rect x="0" y="182" rx="5" ry="5" width="100" height="15" />
        <rect x="0" y="220" rx="5" ry="5" width="100" height="25" />
        <rect x="117" y="220" rx="5" ry="5" width="30" height="25" />
      </ContentLoader>
        : <>
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
        </>}

    </div>
  )
}

export default Card;