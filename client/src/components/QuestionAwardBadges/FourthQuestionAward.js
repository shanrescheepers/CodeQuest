import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/fourth.png'

const FourthQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='fourth question award' className='badge-img'/>
                    <h4>20th Post</h4>
                    <small><p>Keep shining like the star you are! You received  an award for asking your twentieth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FourthQuestionAward;