import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/second.png'

const SecondQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='second question award' className='badge-img'/>
                    <h4>5th Post</h4>
                    <small><p>Sweet! You received an award for posting your fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SecondQuestionAward;