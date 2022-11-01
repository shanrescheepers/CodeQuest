import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/eighth.png'

const EighthAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='eighth answer award' className='badge-img'/>
                    <h4>100 Points</h4>
                    <small><p>Right on the meowny! You received an award for earning one-hundred points for your question.</p></small>  
                </div>
            </div>
        </div>
    );
}
 
export default EighthAnswerAward;