import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorite from './pages/Favorites'
import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'

function App() {
  const [items, setItems] = React.useState([]);
  const [cardOpened, setCardOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isFavorite, setFavorite] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://669559e34bd61d8314cb039a.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    axios.get('https://669559e34bd61d8314cb039a.mockapi.io/Cart')
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const onAddToCart = (obj) => {
    if (!cartItems.some(item => item.imageUrl === obj.imageUrl)) {
      axios.post('https://669559e34bd61d8314cb039a.mockapi.io/Cart', obj)
        .then((response) => {
          setCartItems(prev => [...prev, response.data]);
        })
        .catch((error) => {
        });
    } else {
      setCartItems((prev) => prev.filter((item) => item.imageUrl !== obj.imageUrl))
    }
  };

  const onAddFavorite = (item) => {
    setFavorite(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev.filter(fav => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id) => {
    axios.delete(`https://669559e34bd61d8314cb039a.mockapi.io/Cart/${id}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error('Error removing from cart:', error);
      });
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };


  return (
    <div className="wrapper clear">
      {cardOpened && <Drawer items={cartItems} onClose={() => setCardOpened(false)} onRemoveFromCart={removeFromCart} />}
      <Header onClickCard={() => setCardOpened(true)} />
      <Routes>
        <Route path="/" element={
          <Home
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
            items={items}
            onAddToCart={onAddToCart}
            onAddFavorite={onAddFavorite}
          >
          </Home>
        } exact></Route>
      </Routes>

      <Routes>
        <Route path="/favorites" element={

          <Favorite
            searchValue={searchValue}
            items={isFavorite}
            onAddFavorite={onAddFavorite}
            favorite={true}
          >
          </Favorite>

        } exact></Route>
      </Routes>
    </div>
  );
}

export default App;
