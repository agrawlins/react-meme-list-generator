import React from "react";

const Card = (props) => {
    const [card, setCard] = React.useState({
        topText: props.topText,
        bottomText: props.bottomText,
        randomImage: props.randomImage
    })
    const [edit, setEdit] = React.useState(false)

    const handleChange = (event) => {
               const {name, value} = event.target
        setCard(prevCard => ({
            ...prevCard,
            [name]: value
        }))       
    }
    
    const getMemeImage = (e) => {
        e.preventDefault()
        const randomNumber = Math.floor(Math.random() * props.allMemeImages.length)
        const url = props.allMemeImages[randomNumber].url
        setCard(prevCard => ({
            ...prevCard,
            randomImage: url
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        const {name, value} = event.target
        setCard(prevCard => ({
            ...prevCard,
            [name]: value
        }))  
        setEdit(!edit)  
    }

    return(
        <div className="meme--list">
                <li key={props.id} id ={props.id}>
                    <img src={card.randomImage} className="meme--image"/>
                    <h2 className="meme--text top">{card.topText}</h2>
                    <h2 className="meme--text bottom">{card.bottomText}</h2>
                    <button className = "deleteButton" onClick={props.deleteMeme}>X</button>
                </li>
                <div>
                    <button style={{display: edit ? "none" : "block"}}  onClick={() => {setEdit(!edit)}}>Edit</button> 


                    <form className="form" style={{display: edit ? "block" : "none"}} onSubmit ={handleSubmit}>
                    <button 
                        className="form--button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image
                    </button>
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={card.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={card.bottomText}
                        onChange={handleChange}
                    />
                    <button>Submit Edits</button>
                </form>   
                </div>
            </div>    
    )
}

export default Card