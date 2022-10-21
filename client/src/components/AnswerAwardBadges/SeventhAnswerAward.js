import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/seventh.png'

const SeventhAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='seventh answer award' className='badge-img'/>
                    <h4>75 Points</h4>
                    <small><p>You’re meowgical! You received an award for earning seventy-five points for your question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SeventhAnswerAward;