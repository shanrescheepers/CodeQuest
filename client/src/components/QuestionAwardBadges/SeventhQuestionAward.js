import '../../css/AwardCard.css';
import image from '../../assets/awards/questions/seventh.png'

const SeventhQuestionAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='seventh question award' className='badge-img'/>
                    <h4>75th Post</h4>
                    <small><p>You’re CodeQuest royalty! You received an award for asking your seventy-fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default SeventhQuestionAward;