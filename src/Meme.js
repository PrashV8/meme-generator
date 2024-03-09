import React from "react";
// import memesData from "./memesData";
export default function Meme(){
const [meme, setMeme]= React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/24y43o.jpg"
})

// const [allMemeImages,setAllMemeImages]=React.useState(memesData);

const [allMemes,setAllMemes]=React.useState([]);

React.useEffect(()=>{
async function getMemes(){
    const res=await fetch ("https://api.imgflip.com/get_memes")
    const data =await res.json()
    setAllMemes(data.data.memes)
}
getMemes()

},[])






    //  const[memeImage,setMemeImage] = React.useState("")
   
    function getMemeImage(){
        
        const randomNumber=Math.floor(Math.random()* allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage: url
        }) ) 

    }


    function handleChange(event){
        const{name,value}=event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
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
                    Get a new meme image <span> &#128514; </span> 
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="#" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

