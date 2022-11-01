import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../scss/allUsersTableview.scss';
import { Icon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import PromotionAccepted from '../../modals/PromotionAcceptedModal';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 50 },
    { id: 'email', label: 'User Email', minWidth: 90 },
    { id: 'questionsAsked', label: 'Questions Asked', minWidth: 30 },
    { id: 'questionsAnswered', label: 'Questions Answered', minWidth: 20 },
    { id: 'yearlevel', label: 'Year Level', minWidth: 30 },
    { id: 'rank', label: 'Rank', minWidth: 30 },
    // { id: 'status', label: 'Request Accepted', minWidth: 30 },
    { id: 'acceptRequest', label: 'Accept Request', minWidth: 100 },

];

export default function PromotionRequestsTableView() {

    const [promotionAcceptedModal, setPromotionAcceptedModal] = useState();
    // Delete user
    const promotionAccept = (id, userId, reliability, userEmail) => {
        // console.log(id);
        setPromotionAcceptedModal(<PromotionAccepted
            close={setPromotionAcceptedModal} id={id} userId={userId} userEmail={userEmail} reliability={reliability}
        />)
    }
    // userId: req.body.userId,
    // userEmail: req.body.userEmail,
    // reliability: +req.body.reliability,
    // requestStatus: req.body.requestStatus,
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [rows, setRows] = useState([]);
    const [promotionUsers, setPromotionUsers] = useState();

    useEffect(() => {
        setRows([])
        Axios.get('http://localhost:5000/api/getadminreq')
            .then(res => {


                console.log(res.data)
                let data = res.data;


                for (let i = 0; i < data.length; i++) {
                    Axios.get('http://localhost:5000/api/userInfo/' + data[i].userId)
                        .then(res1 => {

                            console.log(res1.data)
                            let data2 = res1.data
                            // status can't handle a boolean
                            console.log(data[i].requestStatus)
                            if (data[i].requestStatus) {
                                data2.status = "Request Accepted";
                            } else {
                                data2.status = "Request not yet accepted";
                            }

                            let year = data2.yearlevel;
                            let bgColor = '';
                            if (year === 1) {
                                bgColor = '#6EEB83'
                            } else if (year === 2) {
                                bgColor = '#6CD4FF'
                            } else {
                                bgColor = '#FF7900'
                            };
                            const imgURL = (<div className='profileBackground' style={{ backgroundColor: bgColor }}>
                                <img src={'Avatars/' + data2.profileimage + '.png'} className="profile-imgage"></img>
                            </div>);
                            data2["avatar"] = imgURL;
                            const acceptButton = (
                                <Button sx={{
                                    backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '130px', fontFamily: 'Open Sans', fontSize: "10px",
                                    '&:hover': {
                                        backgroundColor: '#FF7900',
                                    }
                                    // onClick= {() => {decreaseProduct(row.id)}}
                                    //userEmail={userEmail} reliability={reliability} requestStatus={requestStatus}
                                }} variant="contained" onClick={() =>
                                    promotionAccept(data[i]._id, data[i].userId, data[i].reliability, data[i].userEmail)
                                }>
                                    <CheckCircleOutlineOutlinedIcon style={{ height: "15px", paddingRight: "8px" }} />ACCEPT
                                </Button >
                            )
                            data2["acceptRequest"] = acceptButton;



                            if (!data[i].requestStatus) {
                                setRows(rows => [...rows, data2], [...rows, data]);
                            }
                        });


                }


            });
    }, [promotionAcceptedModal]);


    return (
        // IGNORE MODAL HERE
        // Waiting on Simon For Promotion Content
        <>{promotionAcceptedModal}
            <Paper style={{ width: "100%" }
            }>

                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </>
    );
};

