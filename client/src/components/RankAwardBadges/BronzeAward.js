import '../../css/AwardCard.css';
import image from '../../assets/awards/ranks/bronze.png'

const BronzeAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='bronze award' className='badge-img'/>
                    <h4>Bronze Ball of Yarn</h4>
                    <small><p>Congratulations! You’ve just earned a bronze ball of yarn for starting your Quest for Code. </p></small>
                </div>
            </div>
        </div>
    );
}
 
export default BronzeAward;