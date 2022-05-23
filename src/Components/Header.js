import TrollFace from "../Images/Troll Face.png"

const Header = () => {
    return(
        <header className="header">
            <img src={TrollFace} className="header--image"/>
            <h1 className="header--title">Meme Generator</h1>
            <h3 className="header--project">React Course - Project 3</h3>
        </header>
    )
}

export default Header;