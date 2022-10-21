import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/gold.png'

const GoldAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='bronze award' className='badge-img'/>
                    <h4>Golden Ball of Yarn</h4>
                    <small><p>Congratulations! You earned a golden ball of yarn. You’re a star. </p></small>
                </div>
            </div>
        </div>
    );
}
 
export default GoldAward;