import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card";

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "kill me off in a movie",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemeImages, setAllMemeImages] = React.useState([])
    const [listState, setListState] = React.useState([])

    const editMemeMenu = (event) => {
        console.log("Edit Button pressed")

        return (
            <div>
                <div className="form">
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
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <div className="meme">
                    <img src={event.target.parentElement.id.img} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        )
    }

    const editMeme = (event) => {
        console.log("Meme Edited!")
        setListState(param1 =>{
            let editedArray = [...param1]
            let splicedArray = editedArray(event.target.parentElement.id, 1)

             return[
                 ...editedArray
 
             ]
         })
    }

    const deleteMeme = (event) => {
        setListState(param1 => param1.filter(each => each.id !== event.target.parentElement.id))
    }

    let mappedList = listState.map((param1, index)=>{

        return(
            <Card {...param1} 
                key = {param1.id}
                editMeme = {editMeme}
                allMemeImages = {allMemeImages}
                deleteMeme = {deleteMeme}
            />
        )
    })

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, [])
    
    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    const createMemeImage = () => {
        setListState(param1 => [
            ...param1,
            {
                topText: meme.topText,
                bottomText: meme.bottomText,
                randomImage: meme.randomImage,
                id: uuidv4()
            }
        ])
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
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
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <button 
                className="form--button"
                onClick={createMemeImage}
            >
                Add to Your Collection
            </button>
            <ul>
                {mappedList}
            </ul>
        </main>
    )
}

export default Meme;