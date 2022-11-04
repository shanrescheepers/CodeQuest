import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/first.png'

const FirstAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='second answer award' className='badge-img'/>
                    <h4>1st Answer</h4>
                    <small><p>Sweet! You received an award for answering your first question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FirstAnswerAward;