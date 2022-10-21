import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/fifth.png'

const FifthAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='fifth answer award' className='badge-img'/>
                    <h4>25 Points</h4>
                    <small><p>A hat for the code wiz! You received an award for earning twenty-five points for your question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FifthAnswerAward;