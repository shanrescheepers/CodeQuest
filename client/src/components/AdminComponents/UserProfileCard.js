import React from 'react';
import '../../scss/userProfileCards.scss';
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

const UserprofileCard = () => {
    return (
        // this will be a prop injected onto the admin page whenever link is clicked on, similar workings to permissions ui etc...maybe, kinda
        <div className='auprofilecard'>

            <Card className='auprofilecard__card'>
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="userprofilepicture" className='profilecard__card__useravatar' style={{ marginTop: "12px" }}>
                    <img src={pp} className="auprofilecard__card__useravatar__logo" width="150px"></img>
                </Avatar>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" style={{ textAlign: "center" }}>
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
                        User Email
                    </Typography>
                </CardContent>
                <Button sx={{
                    backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '140px', fontFamily: 'Open Sans', fontSize: "12px", marginLeft: "15px", padding: "8px",
                    '&:hover': {
                        backgroundColor: '#FF7900',
                    }
                }} variant="contained" ><DeleteIcon style={{ height: "20px" }} />Delete User</Button>
                <Button>
                    <Typography variant="subtitle2" gutterBottom style={{ color: "#2b2b2b", fontSize: "10px", fontVariant: "small-caps", marginTop: "8px" }}>
                        Remove from list
                    </Typography>
                </Button>
            </Card>

            <Card className='auprofilecard__card'>
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="userprofilepicture" className='profilecard__card__useravatar' style={{ marginTop: "12px" }}>
                    <img src={pp} className="auprofilecard__card__useravatar__logo" width="150px"></img>
                </Avatar>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" style={{ textAlign: "center" }}>
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
                        User Email
                    </Typography>
                </CardContent>
                <Button sx={{
                    backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '140px', fontFamily: 'Open Sans', fontSize: "12px", marginLeft: "15px", padding: "8px",
                    '&:hover': {
                        backgroundColor: '#FF7900',
                    }
                }} variant="contained" ><DeleteIcon style={{ height: "20px" }} />Delete User</Button>
                <Button>
                    <Typography variant="subtitle2" gutterBottom style={{ color: "#2b2b2b", fontSize: "10px", fontVariant: "small-caps", marginTop: "8px" }}>
                        Remove from list
                    </Typography>
                </Button>
            </Card>

            <Card className='auprofilecard__card'>
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="userprofilepicture" className='profilecard__card__useravatar' style={{ marginTop: "12px" }}>
                    <img src={pp} className="auprofilecard__card__useravatar__logo" width="150px"></img>
                </Avatar>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" style={{ textAlign: "center" }}>
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
                        User Email
                    </Typography>
                </CardContent>
                <Button sx={{
                    backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '140px', fontFamily: 'Open Sans', fontSize: "12px", marginLeft: "15px", padding: "8px",
                    '&:hover': {
                        backgroundColor: '#FF7900',
                    }
                }} variant="contained" ><DeleteIcon style={{ height: "20px" }} />Delete User</Button>
                <Button>
                    <Typography variant="subtitle2" gutterBottom style={{ color: "#2b2b2b", fontSize: "10px", fontVariant: "small-caps", marginTop: "8px" }}>
                        Remove from list
                    </Typography>
                </Button>
            </Card>



        </div >
    );
};

export default UserprofileCard;