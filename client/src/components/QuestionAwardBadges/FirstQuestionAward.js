import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/first.png'

const FirstQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='second question award' className='badge-img'/>
                    <h4>1st Post</h4>
                    <small><p>Your curiosity has been sparked! You earned an award for posting your first question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FirstQuestionAward;