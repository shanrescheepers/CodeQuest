import '../css/NewQuestion.css';
import { ArrowBackRounded } from '@mui/icons-material';
import kitty from '../assets/newQuestionAssets/kitty.png';
import { useNavigate } from 'react-router';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { withTheme } from '@emotion/react';
import { Button } from '@mui/material';

const NewQuestionPage = () => {
    const CssTextField = styled(TextField)({
        marginTop: '16px',
        width: '100%',
        background: 'white',
        borderRadius: '40px',
        '& label.Mui-focused': {
          color: '#2b2b2b',
          borderRadius: '40px',
          borderBottomColor: '#2b2b2b'
        },
        '& .MuiInput-underline:after': {
          borderColor: '#2b2b2b',
          borderRadius: '40px',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
            borderRadius: '40px',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#2b2b2b',
            borderRadius: '40px',
          },
        },
    });

    const buttonStyle = {
        backgroundColor: '#FF7900', 
        borderRadius: '50px',
        marginTop: '16px', 
        width: '100%',
        padding: '16px 24px',
        fontFamily: 'Open Sans',
        textTransform: 'capitalize',
        '&:hover': {
            background: 'FF7900', 
            color: '#2B2B2B'
        }
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (  
        <div className='new-question-con'>
            <div className='main-form-con'>
                <div className='back-arrow' onClick={goBack}>
                    <ArrowBackRounded sx={{fontSize:'40px'}}/>
                </div>
            
                <img className='kitty-img' src={kitty}></img>

                <form className='form-con'>
                    <h1>Ask us Anything</h1>
                    <p>Strictly related to dev though, questions deemed inappropriate will be removed</p>
                    <CssTextField name='title' placeholder="Title" id="custom-css-outlined-input" />
                    <CssTextField name='description' multiline placeholder="Description" id="custom-css-outlined-input" />
                    <div className='screenshot-preview'>
                        <p>Screenshot(s)</p>
                    </div>
                    <CssTextField name='code' multiline placeholder="Code Snippet" id="custom-css-outlined-input" />
                    <CssTextField name='tags' multiline placeholder="Tags" id="custom-css-outlined-input" />
                    <Button variant='contained' disableElevation style={buttonStyle}>Post Question</Button>
                </form>

                <div className='question-rules'>
                    <div className='question-rules-title'>
                        <h2>Things to consider before posting a new question: </h2>
                    </div>

                    <div className='question-rules-list'>
                        <ul>
                            <li> Make sure that a similar question hasn’t already been asked </li>
                            <li>Explain what you are trying to achieve and the issues you are experiencing</li>
                            <li>Provide a description result you are receiving</li>
                            <li>Include information about any errors if you are getting any</li>
                            <li>Describe or share screenshots of what you have already tried and explain why it doesn’t result in your desired outcome</li>
                            <li>Include the code you’ve tried to use so that others can reproduce your problem to help solve it</li>

                        </ul>
                    </div>
                </div>

                
                
            </div>
        </div>
    );
}
 
export default NewQuestionPage;