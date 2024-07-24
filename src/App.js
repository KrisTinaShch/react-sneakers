import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorite from './pages/Favorites'
import Orders from './pages/Orders'
import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import AppContext from './context'

function App() {
  const [items, setItems] = React.useState([]);
  const [cardOpened, setCardOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isFavorite, setFavorite] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://669559e34bd61d8314cb039a.mockapi.io/Cart');
      const itemResponse = await axios.get('https://669559e34bd61d8314cb039a.mockapi.io/items');
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setItems(itemResponse.data);
    }
    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentID) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentID) !== Number(obj.id)));
        await axios.delete(`https://669559e34bd61d8314cb039a.mockapi.io/Cart/${findItem.id}`);
      } else {
        const { data } = await axios.post('https://669559e34bd61d8314cb039a.mockapi.io/Cart', obj);
        setCartItems(prev => [...prev, data]);
      }
    } catch {
      alert('Ошибка при добавлении продукта');
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
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
      })
      .catch((error) => {
        console.error('Error removing from cart:', error);
      });
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => (obj.parentID) === (id))
  }

  return (
    <AppContext.Provider value={{ cartItems, isFavorite, items, isItemAdded, setCardOpened, setCartItems }}>
      <div className="wrapper clear">
        {cardOpened && <Drawer items={cartItems} onClose={() => setCardOpened(false)} onRemoveFromCart={removeFromCart} opened={cardOpened} />}

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
              cartItems={cartItems}
              isLoading={isLoading}
            >
            </Home>
          } exact></Route>
        </Routes>

        <Routes>
          <Route path="/favorites" element={

            <Favorite
              searchValue={searchValue}
              onAddFavorite={onAddFavorite}
              favorite={true}
            >
            </Favorite>

          } exact></Route>
        </Routes>

        <Routes>
          <Route path="/orders" element={
            <Orders searchValue={searchValue}></Orders>
          } exact></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
