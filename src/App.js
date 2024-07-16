import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([])
  const [cardOpened, setCardOpened] = React.useState(false);
  const [cartItems, setcartItems] = React.useState([]);
  React.useEffect(() => {
    axios.get('https://669559e34bd61d8314cb039a.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://669559e34bd61d8314cb039a.mockapi.io/Cart').then((res) => {
      setcartItems(res.data);
    });
  }, []);


  const onAddToCart = (obj) => {
    if (!cartItems.includes(obj)) {
      axios.post('https://669559e34bd61d8314cb039a.mockapi.io/Cart', obj);
      setcartItems(prev => ([...prev, obj]));
    }
  }

  const [searchValue, setSearchValue] = React.useState('');
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }


  return (
    <div className="wrapper clear">
      {cardOpened && <Drawer items={cartItems} onClose={() => setCardOpened(false)} />}
      <Header onClickCard={() => setCardOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-30">
          <h1> {searchValue ? `Поиск по запросу:  ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex align-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <input placeholder="Поиск" onChange={onChangeSearchInput} value={searchValue} />
              {searchValue && <img src="/img/btn-remove.svg" alt="remove-button" className="removeBtn  cu-p" onClick={() => { setSearchValue('') }}></img>}
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="d-flex flex-wrap">
          {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            // Таким образом, передача функции через анонимную функцию onPlus={() => onAddToCart(item)} гарантирует, что onAddToCart будет вызвана только при клике на кнопку, а не сразу при рендеринге компонента.
            <Card key={`card-${index}`} title={item.title} price={item.price} imageUrl={item.imageUrl} onPlus={() => onAddToCart(item)} onFavorite={() => { }} />
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
