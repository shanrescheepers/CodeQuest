import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import TourTwoToneIcon from '@mui/icons-material/TourTwoTone';
import { Icon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import pp from "../../assets/placeholderPP.png";


const ReportedUserCard = (props) => {

    const imgURL = ('Avatars/' + props.profileimage + '.png');
    let year = props.yearlevel;

    let bgColor = '';
    if (year === 1) {
        bgColor = '#6EEB83'
    } else if (year === 2) {
        bgColor = '#6CD4FF'
    } else {
        bgColor = '#FF7900'
    };

    return (
        // this will be a prop injected onto the admin page whenever link is clicked on, similar workings to permissions ui etc...maybe, kinda
        <div className='ruprofilecard'>

            <Card className='ruprofilecard__card'>

                <TourTwoToneIcon className='ruprofilecard__card__flagbutton' style={{ color: "#E03F3F", width: "20px", padding: "8px" }} />


                <Avatar sx={{ bgcolor: blue[500] }} aria-label="userprofilepicture" className='profilecard__card__useravatar' >
                    <img src={pp} className="auprofilecard__card__useravatar__logo" width="150px"></img>
                </Avatar>

                <CardContent>
                    <p component="div" style={{ textAlign: "center", fontSize: "10px" }}>
                        {props.username}
                    </p>
                    <p color="text.secondary" style={{ textAlign: "center", fontSize: "10px" }}>
                        {props.email}
                    </p>
                </CardContent>
                <Button sx={{
                    backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '140px', fontFamily: 'Open Sans', fontSize: "12px", marginLeft: "15px",
                    '&:hover': {
                        backgroundColor: '#FF7900',
                    }
                }} variant="contained" ><DeleteIcon style={{ height: "20px" }} />Delete User</Button>
                <Button style={{ color: "#2b2b2b", fontSize: "9px", marginTop: "2px", width: "auto" }}>
                    Remove from list

                </Button>
            </Card>


        </div >
    );
};

export default ReportedUserCard;