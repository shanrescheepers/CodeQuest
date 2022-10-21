import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/third.png'

const ThirdQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='third question award' className='badge-img'/>
                    <h4>10th Post</h4>
                    <small><p>Well aren’t you a curious cat! You received an award for asking your tenth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default ThirdQuestionAward;