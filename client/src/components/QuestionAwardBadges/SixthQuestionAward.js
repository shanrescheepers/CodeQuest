import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/sixth.png'

const SixthQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='sixth question award' className='badge-img'/>
                    <h4>50th Post</h4>
                    <small><p>You’re a treat! You received an award for asking your fiftieth question. </p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SixthQuestionAward;