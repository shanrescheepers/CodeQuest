import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/silver.png'

const SilverAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='bronze award' className='badge-img'/>
                    <h4>Silver Ball of Yarn</h4>
                    <small><p>Congratulations! You’ve earned a silver ball of yarn, you’re amazing!</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SilverAward;