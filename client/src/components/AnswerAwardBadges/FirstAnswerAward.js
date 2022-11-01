import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/first.png'

const FirstAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='second answer award' className='badge-img'/>
                    <h4>1 Point</h4>
                    <small><p>Sweet! You received an award for earning a point for your question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FirstAnswerAward;