import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/platinum.png'

const PlatinumAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='platinum award' className='badge-img'/>
                    <h4>Platinum Ball of Yarn</h4>
                    <small><p>Congratulations! You earned a platinum ball of yarn.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default PlatinumAward;