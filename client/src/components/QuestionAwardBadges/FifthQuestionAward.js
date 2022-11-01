import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/fifth.png'

const FifthQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='fifth question award' className='badge-img'/>
                    <h4>25th Post</h4>
                    <small><p>You’re a star! You received an award for asking your twenty-fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FifthQuestionAward;