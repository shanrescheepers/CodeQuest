import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/second.png'

const SecondAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='second answer award' className='badge-img'/>
                    <h4>5th Answer</h4>
                    <small><p>Surprise! You received an award for answering your fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SecondAnswerAward;