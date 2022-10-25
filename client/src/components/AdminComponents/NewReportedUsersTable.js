import * as React from 'react';
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
import '../../scss/reportedUserCards.scss';
import { Icon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DeleteUserModalAdmin from '../../modals/DeleteUserModalAdmin';
import IgnoreUserModal from '../../modals/IgnoreUserModalAdmin';
import moment from 'moment';

const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: 'email', label: 'Reported User', minWidth: 50 },
    { id: 'reportingUser', label: 'Reporting User', minWidth: 100 },
    { id: 'dateFlagged', label: 'Date Flagged', minWidth: 90 },
    { id: 'flaggedReason', label: 'Flagged Reason', minWidth: 90 },
    { id: 'deleteUser', label: '', minWidth: 100 },
    { id: 'removeFromFragList', label: '', minWidth: 100 },

];

export default function NewReportedUserTable() {
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

    // Delete user
    const [deleteUserModal, setDeleteUserModal] = useState();
    const [ignoreUserModal, setIgnoreUserModal] = useState();

    const removeUserFromFlagTable = (id) => {
        setIgnoreUserModal(<IgnoreUserModal close={setIgnoreUserModal} id={id} />)
        // console.log(id);
    }

    const deleteUser = (id) => {
        // console.log(id);
        setDeleteUserModal(<DeleteUserModalAdmin
            close={setDeleteUserModal} id={id}
        />)
    }
    // Reporteds
    // Reported Users
    // const [reportedUsers, setReportedUsers] = useState(false);
    // const [reportedUsersStateNumberofUsers, setReportedUsersStateNumberofUsers] = useState();
    // const [totalReportedUsers, setTotalReportedUsers] = useState();

    const [reportedUsers, setReportedUsers] = useState();

    useEffect(() => {
        Axios.get('http://localhost:5000/api/allReportedUsers')
            .then(res1 => {
                // getting all the isers in. then count them, with it, capture some data , the ids, the names, emails.
                // setTotalReportedUsers(res1.data.reportedUsers.length)
                // console.log(res1)

                let reportedUserIds = [];
                let reportingUserId = [];

                // Check om te sien of daar nie dubbels is van dieselfde user nie. daar kan net een user wees.
                for (let index = 0; index < res1.data.reportedUsers.length; index++) {
                    // console.log(res.data[index])
                    if (!reportedUserIds.includes(res1.data.reportedUsers[index].reportedUserId)) {
                        reportedUserIds.push(res1.data.reportedUsers[index].reportedUserId);

                        // Axios.get('http://localhost:5000/api/userInfo/' + res1.data.reportedUsers[index].reportingUserId).then(res3 => {
                        //     // console.log(res3.data.username);
                        //     reportingUserId.push(res3.data.username);
                        // })
                    };
                };

                if (reportedUsers !== reportedUserIds.length) {
                    setRows([]);
                }


                for (let i = 0; i < reportedUserIds.length; i++) {
                    Axios.get('http://localhost:5000/api/userInfo/' + reportedUserIds[i]).then(res => {

                        // console.log(res.data);
                        let reportedUser = res.data;
                        let year = reportedUser.yearlevel;
                        let bgColor = '';
                        if (year === 1) {
                            bgColor = '#6EEB83'
                        } else if (year === 2) {
                            bgColor = '#6CD4FF'
                        } else {
                            bgColor = '#FF7900'
                        };
                        let usersdateflagged = [];
                        let userflagReason = [];

                        res1.data.reportedUsers.forEach(e => {
                            if (e.reportedUserId === reportedUserIds[i]) {
                  
                                let formatDateFlagged = moment(e.dateFlagged).format('DD MMMM YYYY');
                                usersdateflagged.push(formatDateFlagged)
                                userflagReason.push(e.flagReason)
                            }
                        });
                        const imgURL = (<div className='profileBackground' style={{ backgroundColor: bgColor }}>
                            <img src={'Avatars/' + reportedUser.profileimage + '.png'} className="profile-imgage"></img>
                        </div>);

                        const deleteButton = (
                            <Button sx={{
                                backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '130px', fontFamily: 'Open Sans', fontSize: "10px",
                                '&:hover': {
                                    backgroundColor: '#FF7900',
                                }

                            }} variant="contained" onClick={() =>
                                deleteUser(reportedUser._id)}>

                                <DeleteIcon style={{ height: "15px" }} />Delete User
                            </Button >
                        )
                        reportedUser["deleteUser"] = deleteButton;

                        const removeFromListButton = (
                            <Button sx={{
                                backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '100px', fontFamily: 'Open Sans', fontSize: "10px", marginLeft: "-4px",
                                '&:hover': {
                                    backgroundColor: '#FF7900',
                                }
                            }} variant="contained" onClick={() => removeUserFromFlagTable(reportedUser._id)}>
                                IGNORE
                            </Button>
                        )

                        // console.log(reportingUserId[i]);
                        // console.log(res1.data.newReported[i].reportingUsername);
                        reportedUser["reportingUser"] = res1.data.newReported[i].reportingUsername;

                        reportedUser["avatar"] = imgURL;
                        reportedUser["dateFlagged"] = usersdateflagged;
                        reportedUser["flaggedReason"] = userflagReason;
                        reportedUser["removeFromFragList"] = removeFromListButton;
                        // Check IF - dubbels in die nuwe array of nie? 
                        if (reportedUsers !== reportedUserIds.length) {
                            setRows(rows => [...rows, reportedUser], [...rows, reportingUserId]);
                        }
                    });
                }
                setReportedUsers(reportedUserIds.length)
            })


    }, [deleteUserModal, ignoreUserModal]);
    // WORKING

    return (
        < >{deleteUserModal}
            <>{ignoreUserModal}</>
            <Paper style={{ width: "100%" }}>
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
}

