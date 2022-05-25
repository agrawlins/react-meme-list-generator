import React from "react";

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "kill me off in a movie",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemeImages, setAllMemeImages] = React.useState([])
    const [listState, setListState] = React.useState([])

    const editMeme = () => {
        console.log("Edit Button pressed")
    }

    const deleteMeme = (event) => {

        setListState(param1 =>{
           let deletedArray = [...param1]
            let splicedArray = deletedArray.splice(event.target.parentElement.id, 1)
            
            return[
                ...deletedArray

            ]
        })
    }

    let mappedList = listState.map((param1, index)=>{

        return(
            <div className="meme--list">
                <li key={index} id ={index}>
                    
                        <img src={param1.randomImage} className="meme--image"/>
                        <h2 className="meme--text top">{param1.topText}</h2>
                        <h2 className="meme--text bottom">{param1.bottomText}</h2>
                        <button className = "deleteButton" onClick={deleteMeme}>X</button>
                    
                </li>
                <div >
                    <button onClick={editMeme}>Edit</button>
                         
                </div>
            </div>
                
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
                randomImage: meme.randomImage
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
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
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