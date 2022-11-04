import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/sixth.png'

const SixthAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='sixth answer award' className='badge-img'/>
                    <h4>50th Answer</h4>
                    <small><p>Yer a code wizard! You received an award for answering your fiftieth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SixthAnswerAward;