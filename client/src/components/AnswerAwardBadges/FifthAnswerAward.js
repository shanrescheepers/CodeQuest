import '../../css/AwardCard.css';
import image from '../../assets/awards/answers/fifth.png'

const FifthAnswerAward = () => {
    return (
        <div>
            <div className='award-card-con'>
                <div className='award-content'>
                    <img src={image} alt='fifth answer award' className='badge-img'/>
                    <h4>25th Answer</h4>
                    <small><p>A hat for the code wiz! You received an award for answering your twenty-fifth question.</p></small>
                </div>
            </div>
        </div>
    );
}
 
export default FifthAnswerAward;