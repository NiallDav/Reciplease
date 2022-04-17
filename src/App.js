import './App.css';
import { useEffect, useState } from 'react';
import  Recipe  from "./Recipe"
import { IoSearchCircleSharp, IoTimeOutline } from "react-icons/io5";

const App = () => {

  const APP_ID = "90c4e240"
  const APP_KEY = "fee40760a52b9178e59e5b5021115947"

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=99`
      // `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${APP_ID}&app_key=${APP_KEY}&type=public`
    )
    const data = await response.json();
    setRecipes(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch("")
  }

  console.log(recipes)

  //need to make if time is 0 then dont render that recipe
  //if title name doesnt contain query then dont render that recipe

  return (
    <div className="App">
      <nav className='navi'>
        <img src={require('./images/reciplease.svg').default} alt="RECIPLEASE" className='imgLogo'/>
        <form onSubmit={getSearch} className='search-form'>
          <input className='search-bar' type="text" value={search} onChange={updateSearch} placeholder="Search for a recipe or ingredient"/>
          <button className='search-button' type='submit'><IoSearchCircleSharp size={35}/></button>
        </form>
      </nav>
      
      <div className='resultsRow'>
        <p className='results'>You searched for "<span className='purple'>{query}</span>"</p>
        <p className="results"><span className='purple'>{recipes.length}</span> recipes found</p>
      </div>
      
      <div className='recipes'>
        {recipes.map(recipe => (
            <Recipe key={Math.random(2000)} title={recipe.recipe.label} calories={`Calories: ${Math.floor(recipe.recipe.calories)}`}
             image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} time={recipe.recipe.totalTime !== 0 ? <p className='time'><IoTimeOutline size={18} className='clock'/> {recipe.recipe.totalTime} minutes</p> : "N/A"}/> 
        ))}
      </div>
    </div>
  );
}

export default App;
