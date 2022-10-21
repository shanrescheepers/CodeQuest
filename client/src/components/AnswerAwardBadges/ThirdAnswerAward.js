import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/third.png'

const ThirdAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='third answer award' className='badge-img'/>
                    <h4>10 Points</h4>
                    <small><p>You are a gift! You received an award for earning ten points for your question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default ThirdAnswerAward;