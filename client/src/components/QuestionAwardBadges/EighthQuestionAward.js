import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/eighth.png'

const EighthQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='eighth question award' className='badge-img'/>
                    <h4>100th Post</h4>
                    <small><p>You’re a very curious cat, aren’t you? You received an award for asking your one-hundredth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default EighthQuestionAward;