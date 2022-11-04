import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/fourth.png'

const FourthAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='fourth answer award' className='badge-img'/>
                    <h4>20th Answer</h4>
                    <small><p>You’re magical! You received an award for answering your twentieth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FourthAnswerAward;