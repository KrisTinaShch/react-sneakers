
import Card from '../components/Card/'
function Favorites({ items, onAddFavorite, searchValue, favorite}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-30">
                <h1> Избранные</h1>
            </div>

            <div className="d-flex flex-wrap">
                <div className="d-flex flex-wrap">
                    {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                        <Card key={`card-${index}`} favorite={true} title={item.title} price={item.price} imageUrl={item.imageUrl} onFavorite={() => { onAddFavorite(item) } } />
                    ))}
                </div>
            </div>
        </div>
    )

}
export default Favorites;