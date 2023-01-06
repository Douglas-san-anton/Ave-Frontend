import React, {useState, useEffect} from 'react'
import Styles from './Search.module.css'
import heart from '../../assets/heart.svg'
import menu from '../../assets/menu.svg'

export const Search = () => {
  const [ products, setProducts ] = useState([])
  const [ search, setSearch ] = useState("")
  const [ order, setOrder ] = useState("");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

  const URL = 'https://fakestoreapi.com/products'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setProducts(data)
  }

  const searcher = (e) => {
      setSearch(e.target.value)
  }

  const Organizer = (e) => {
    setOrder(e.target.value)
  }

  const addFavorite = (product) => {
    const favs = [...favorites];
    const check = favs.some(fav => fav.id === product.id);
    let newFavs = [];
    if (check) {
      newFavs = favs.filter(fav => fav.id !== product.id);
    } else {
      newFavs = [...favs, product];
    }
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  }

  const results = products.filter((dato) => dato.title.toLowerCase().includes(search.toLocaleLowerCase()))

  let sortedResults;
  switch(order) {
    case 'az':
      sortedResults = results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'za':
      sortedResults = results.sort((a, b) => b.title.localeCompare(a.title))
      break;
    case 'asc':
      sortedResults = results.sort((a, b) => (a.price > b.price ? 1 : -1));
      break;
    case 'des':
      sortedResults = results.sort((a, b) => (a.price > b.price ? -1 : 1));
      break;
    default:
      sortedResults = results;
  }

   useEffect(()=> {
    showData()
  }, [])

  return (
    <div>
      <nav className={Styles.nav}>

        <div className={Styles.nav__container}>

          <h1 className={Styles.nav__logo}>AVE</h1>

          <input value={search} onChange={searcher} type="text" placeholder='Buscar' className={Styles.search}/>

          <label htmlFor="menu" className={Styles.nav__label}>
            <img src={menu} alt="icon" className={Styles.nav__img}/>
          </label>
          <input type="checkbox" id="menu" className={Styles.nav__input}/>

          <div className={Styles.nav__menu}>

          <a href="#" className={Styles.nav__item}>FAVORITOS {favorites.length}</a>

          </div>

        </div>

      </nav>

      <div className={Styles.sort}>
        <h2 className={Styles.sort__title}>ORDENAR</h2>
        <select className={Styles.sort__select} onChange={Organizer}>
          <option value="">Por Título</option>
          <option value="az">Título de A-Z</option>
          <option value="za">Título de Z-A</option>
        </select>

        <select className={Styles.sort__select_price} onChange={Organizer}>
          <option value="">Por Precio</option>
          <option value="asc">Precio ascendente</option>
          <option value="des">Precio descendente</option>
        </select>
      </div>

      <div className={Styles.card__container}>
        {sortedResults.map(product => (
          <div className={Styles.card} key={product.id}>

            <img className={Styles.image} src={product.image} alt={product.title}/>
            <div className={favorites.find(fav => fav.id === product.id) ? Styles.icon_active : Styles.icon}
               onClick={() => addFavorite(product)}>
              <img className={Styles.heart} src={heart} alt="icon-heart"/>
            </div>
            <p className={Styles.price}>$ {product.price}</p>

            <div className={Styles.text}>
              <h2 className={Styles.title}>{product.title}</h2>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

