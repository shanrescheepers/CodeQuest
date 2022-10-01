import '../css/NewQuestion.css';
import { ArrowBackRounded } from '@mui/icons-material';
import kitty from '../assets/newQuestionAssets/kitty.png';
import { useNavigate } from 'react-router';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Axios from 'axios';
import { useState } from 'react';
import upload from '../assets/newQuestionAssets/upload.png'

const NewQuestionPage = () => {
    
    // const CssTextField = styled(TextField)({
    //     marginTop: '16px',
    //     width: '100%',
    //     background: 'white',
    //     borderRadius: '40px',
    //     '& label.Mui-focused': {
    //       color: '#2b2b2b',
    //       borderRadius: '40px',
    //       borderBottomColor: '#2b2b2b'
    //     },
    //     '& .MuiOutlinedInput-root': {
    //       '& fieldset': {
    //         borderColor: 'white',
    //         borderRadius: '40px',
    //       },
    //       '&.Mui-focused fieldset': {
    //         borderColor: '#2b2b2b',
    //         borderRadius: '40px',
    //       },
    //     },
    // });

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

    //set initial form values
    let initialFormValues = ['title', 'description', 'code', 'tags'];

    //set form values from input fields
    const [formValues, setFormValues] = useState(initialFormValues);

    //get values input files
    const getFormValues = (e) =>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    //screenshot names
    const [screenshots, setScreenshots] = useState([]);

    //get screenshots
    const getScreenshots = (e) => {
        let imageFile = e.target.files;
        setScreenshots(imageFile);

        //hide screenshots upload thingie
        document.getElementById('upload-image-con').style.opacity = '0';

        // for(let i = 0; i < imageFile.length; i++){
        //     console.log(imageFile[i]);
        // }
      
        let reader = new FileReader();
        reader.onload = () => {
          let output = document.getElementById('screenshot-preview');
          output.src = reader.result;
        }; 
      
        reader.readAsDataURL(e.target.files[0]); 
    }

    //add new question to database
    const addNewQuestion = (e) => {
        e.preventDefault();

        //turn every character to a lowercase charater
        const lowercaseTags = formValues.tags.toLowerCase();
        //split tags string by comma or space
        let seperateLowercaseTags = lowercaseTags.split(/[ ,]+/);

        //make a tags array
        let tagsArray = [];

        //capatalise the first letter of every word then put it into an array
        for(let i = 0; i < seperateLowercaseTags.length; i++){
            const firstLetter = seperateLowercaseTags[i].charAt(0);
            const firstLetterCap = firstLetter.toUpperCase();
            const remainingLetters = seperateLowercaseTags[i].slice(1);  
            const capitalisedWord = firstLetterCap + remainingLetters;

            const tags = capitalisedWord;
            tagsArray.push(tags);
        }

        const payloadData = new FormData();

        var UserID = sessionStorage.getItem('id');
        var Upvotes = 0;
        var Downvotes = 0;

        let payload = {
            userId: UserID,
            title: formValues['title'],
            description: formValues['description'],
            code: formValues['code'],
            tags: tagsArray,
            upvotes: +Upvotes,
            downvotes: +Downvotes,
        }

        payloadData.append('information', JSON.stringify(payload));
        for(let i = 0; i < screenshots.length; i++){
            // console.log(screenshots[i]);
            const element = screenshots[i];
            payloadData.append('screenshots', element);
        }

        // send payload to database
        Axios.post('http://localhost:5000/api/newquestion', payloadData)
        .then((res)=> {
          if(res){
            console.log("New Question Added. Slayyy!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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

                    <TextField name='title' placeholder='Title' color='grey' fullWidth sx={{backgroundColor: 'white', borderRadius: '50px', marginTop: '16px'}} onChange={getFormValues}/>
                    <TextField name='description' placeholder='Description' multiline color='grey' fullWidth sx={{backgroundColor: 'white', borderRadius: '50px', marginTop: '16px'}} onChange={getFormValues}/>

                    <div className='screenshot-preview'>

                        <div className='upload-image-con' id='upload-image-con'>
                            <img className='img-picture' src={upload} alt='image placeholder'/>

                            <p>Click here to add new images.</p>
                            <input name='screenshots' className='image-input' type="file" multiple onChange={getScreenshots}/>
                        </div>

                        <img className='screenshot' id="screenshot-preview"/>
                        {/* replace image with carousel */}
                    </div>

                    {/* <Button variant="contained" component="label"> Upload File 
                        <input name='screenshots' type="file" hidden multiple onChange={getScreenshots}/>
                    </Button> */}

                    <TextField name='code' placeholder='Code' color='grey' multiline fullWidth sx={{backgroundColor: 'white', borderRadius: '50px', marginTop: '16px'}} onChange={getFormValues}/>
                    <TextField name='tags' placeholder='Tags' color='grey' fullWidth sx={{backgroundColor: 'white', borderRadius: '50px', marginTop: '16px'}} onChange={getFormValues}/>
                                        
                    <Button type='submit' onClick={addNewQuestion} variant='contained' disableElevation style={buttonStyle}>Post Question</Button>
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