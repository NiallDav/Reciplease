import {useState} from "react"

function Recipe ({title, calories, image, ingredients, time}){

    const [showIngrd, setShowIngrd] = useState(false);

    const onClick = () => {
        setShowIngrd(!showIngrd)
    }

    const Ingrd = () => (
        <div className="recipeIngrd-column">
                <ul>
                    {ingredients.map(ingredient =>
                        <li>{ingredient.text}</li>
                    )}
                </ul>
            </div>
      )

    return(
        <div className="recipeContainer column">
            <div className="recipe">
                <h1 className="recipeTitle">{title}</h1>
                <div className="row">
                    <p className="calories">{calories}</p>
                    <p className="totalTime">{time}</p>
                    <button className="ingrdBtn" onClick={onClick}>Ingredients</button>
                </div>
                <img className="recipeImg" src={image} alt="" />
            </div>
            { showIngrd && <div className="show-box">  <Ingrd /> </div>}
        </div>
    )
}

export default Recipe;