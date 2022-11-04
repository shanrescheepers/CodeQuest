import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/seventh.png'

const SeventhAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='seventh answer award' className='badge-img'/>
                    <h4>75th Answer</h4>
                    <small><p>You’re meowgical! You received an award for answering your seventy-fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SeventhAnswerAward;