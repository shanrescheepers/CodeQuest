import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/diamond.png'

const DiamondAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='bronze award' className='badge-img'/>
                    <h4>Diamond Ball of Yarn</h4>
                    <small><p>Congratulations! You earned a diamond ball of yarn. You are an official CodeQuest Admin.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default DiamondAward;