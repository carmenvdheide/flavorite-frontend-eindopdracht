import image1 from '../../assets/burger.png'
import image2 from '../../assets/cake.png'
import image6 from '../../assets/candy_4.png'
import image7 from '../../assets/choco_shake.png'
import image8 from '../../assets/coffee.png'
import image9 from '../../assets/coke.png'
import image10 from '../../assets/cupcake_1.png'
import image11 from '../../assets/cupcake_2.png'
import image12 from '../../assets/donuts.png'
import image13 from '../../assets/french_fries.png'
import image14 from '../../assets/ice_cream.png'
import image15 from '../../assets/noodles.png'
import image16 from '../../assets/pasta.png'
import image17 from '../../assets/pizza.png'
import image18 from '../../assets/strawberry_shake.png'
import image19 from '../../assets/sushi.png'
import {useEffect, useState} from "react";
import "../../pages/login/login.css"

function ImgLogin() {
    const images = [image1, image2, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19]

    const [ randomImgPath, setRandomImgPath ] = useState('')

    function selectRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length)
        setRandomImgPath(images[randomIndex])
    }

    useEffect(() => {
        selectRandomImage()
    }, []);

    return <img className="img-login" src={randomImgPath} alt='food image'/>


}

export default ImgLogin