import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/copper.png'

const CopperAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='bronze award' className='badge-img'/>
                    <h4>Copper Ball of Yarn</h4>
                    <small><p>Congratulations! You’ve earned a copper ball of yarn for all your hard work, keep it up!</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default CopperAward;