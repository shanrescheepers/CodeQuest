import '../css/NewQuestion.css';
import { ArrowBackRounded } from '@mui/icons-material';
import kitty from '../assets/newQuestionAssets/kitty.png';
import { useNavigate } from 'react-router';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Axios from 'axios';
import Helmet from "react-helmet";
import { useEffect, useState } from 'react';
import upload from '../assets/newQuestionAssets/upload.png';
import QuestionAdded from '../modals/QuestionAdded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NewQuestionPage = () => {

    const theme = createTheme({
        palette: {
          primary: {
            main: '#2b2b2b',
          },
          secondary: {
            main: '#11cb5f',
          },
        },
      });

    const buttonStyle = {
        backgroundColor: '#FF7900', 
        borderRadius: '50px',
        marginTop: '24px', 
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
    const [screenshotFiles, setImageFiles] = useState([]);
    const [uploadedScreenshots, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

    //get screenshots + display them in the image slider
    const getScreenshots = (e) => {

        // // hide screenshots upload thingie
        document.getElementById('upload-image-con').style.display = 'none';
        document.getElementById('screenshot-preview').style.backgroundColor = '#F1F1FC';

        let screenshotFiles = e.target.files;
        setScreenshots(screenshotFiles);

        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
          }
        }
        if (validImageFiles.length) {
          setImageFiles(validImageFiles);
          return;
        }
        alert("Selected uploadedScreenshots are not of valid type!");
    }

    const [postConfirmation, setPostConfirmation] = useState();

    useEffect(() => {
        const uploadedScreenshots = [], fileReaders = [];
        let isCancel = false;
        if (screenshotFiles.length) {
          screenshotFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
              const { result } = e.target;
              if (result) {
                uploadedScreenshots.push(result)
              }
              if (uploadedScreenshots.length === screenshotFiles.length && !isCancel) {
                setImages(uploadedScreenshots);
              }
            }
            fileReader.readAsDataURL(file);
          })
        };
    return () => {
        isCancel = true;
        fileReaders.forEach(fileReader => {
          if (fileReader.readyState === 1) {
            fileReader.abort()
          }
        })
      }
    }, [screenshotFiles]);
 
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

        //appends text 
        payloadData.append('information', JSON.stringify(payload));

        //appends uploadedScreenshots
        for(let i = 0; i < screenshots.length; i++){
            const element = screenshots[i];
            payloadData.append('screenshots', element);
        }

        // send payload to database
        Axios.post('http://localhost:5000/api/newquestion', payloadData)
        .then((res)=> {
          if(res){
            //show post confirmation modal 
            setPostConfirmation(<QuestionAdded close={setPostConfirmation}/>)
            // console.log("New Question Added. Slayyy!");
          }
        })
        .catch(function (error) {
        //   console.log(error);
        });
    }

    return (  
        <div>
            {postConfirmation}

            <div className='new-question-con'>
                <ThemeProvider theme={theme}>
                    <Helmet>
                        <title>Ask</title>
                    </Helmet>

                    <div className='main-form-con'>
                        <div className='back-arrow' onClick={goBack}>
                            <ArrowBackRounded sx={{fontSize:'40px'}}/>
                        </div>
                    
                        <img className='kitty-img' src={kitty}></img>

                        <form className='form-con'>
                            <h1>Ask us Anything</h1>
                            <p>Strictly related to dev though, questions deemed inappropriate will be removed</p>

                            <TextField sx={{backgroundColor: '#ffffff', border: '0', outline: '0', borderRadius: '30px', width: '100%', height: '50px', marginTop: '16px', borderBlock: 'none', borderBlockColor: '#f1f1f1'}}
                            id="outlined-basic" onChange={getFormValues} name="title" color='primary' label="Title" variant="outlined" />

                            <TextField sx={{backgroundColor: '#ffffff', border: '0', outline: '0', borderRadius: '30px', width: '100%', height: 'auto', marginTop: '16px', borderBlock: 'none', borderBlockColor: '#f1f1f1'}}
                            id="outlined-basic" onChange={getFormValues} name="description" color='primary' multiline label="Description" variant="outlined" />

                            <div className='screenshot-preview' id='screenshot-preview'>
                                <div className='upload-image-con' id='upload-image-con'>
                                    <div className='things'>
                                        <img className='img-picture' src={upload} alt='image placeholder'/>
                                        <p>Click here to add your screenshots.</p>
                                    </div>

                                    <input name='screenshots' className='image-input' id='image-input' type="file"  accept='image/*' multiple onChange={getScreenshots}/>
                                </div>

                                <div className="slideshow">
                                    <div className="slideshow-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                                        {uploadedScreenshots.map((screenshot, index) => (
                                            <div className="slide" key={index}>
                                                <img src={screenshot} className="slide-img"/>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="slideshow-dots">
                                        {uploadedScreenshots.map((_, idx) => (
                                            <div key={idx} className={`slideshow-dot${index === idx ? " active" : ""}`}
                                                onClick={() => {
                                                    setIndex(idx);
                                                }}>    
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <TextField sx={{backgroundColor: '#ffffff', border: '0', outline: '0', borderRadius: '30px', width: '100%', height: 'auto', marginTop: '16px', borderBlock: 'none', borderBlockColor: '#f1f1f1'}}
                            id="outlined-basic" onChange={getFormValues} name="code" color='primary' multiline label="Code" variant="outlined"/>
                            
                            <TextField sx={{backgroundColor: '#ffffff', border: '0', outline: '0', borderRadius: '30px', width: '100%', height: '50px', marginTop: '16px', borderBlock: 'none', borderBlockColor: '#f1f1f1'}}
                            id="outlined-basic" onChange={getFormValues} name="tags" color='primary' label="Tags" placeholder='Please add a space or comma to separate your tags' variant="outlined"/>
                                                
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
                </ThemeProvider>
            </div>
        </div>
    );
}
 
export default NewQuestionPage;