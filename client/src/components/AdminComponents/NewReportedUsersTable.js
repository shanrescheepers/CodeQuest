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


const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 170 },
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'email', label: 'User Email', minWidth: 100 },
    { id: 'dateFlagged', label: 'Date Flagged', minWidth: 100 },
    { id: 'flaggedQuestionId', label: 'Flagged Reason', minWidth: 100 },
    { id: 'deleteUser', label: '', minWidth: 100 },
    { id: 'removeFromFragList', label: '', minWidth: 100 },

];

function createData(avatar, username, email, dateFlagged, flaggedQuestionId, deleteUser, removeFromFragList) {

    return { avatar, username, email, dateFlagged, flaggedQuestionId, deleteUser, removeFromFragList };
}



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

    const [rows, setRows] = useState([
        {}
    ]);

    // Reporteds
    // Reported Users
    const [reportedUsers, setReportedUsers] = useState();
    const [reportedUsersStateNumberofUsers, setReportedUsersStateNumberofUsers] = useState();
    const [totalReportedUsers, setTotalReportedUsers] = useState();
    const [totalRenderedUsers, setTotalRenderedUsers] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:5000/api/allReportedUsers')
            .then(res => {
                // getting all the isers in. then count them, with it, capture some data , the ids, the names, emails.
                setTotalReportedUsers(res.data.length)

                let reportedUserIds = [];
                // Check om te sien of daar nie dubbels is van dieselfde user nie. daar kan net een user wees.
                for (let index = 0; index < res.data.length; index++) {
                    // console.log(res.data[index])
                    if (!reportedUserIds.includes(res.data[index].reportedUserId)) {
                        reportedUserIds.push(res.data[index].reportedUserId);
                    };
                };

                // al die users wat reported is
                let allReportedUsers = new Array()
                for (let i = 0; i < reportedUserIds.length; i++) {
                    Axios.get('http://localhost:5000/api/userInfo/' + reportedUserIds[i]).then(res => {
                        let reportedUser = res.data;

                        const imgURL = (<img src={'Avatars/' + reportedUser.profileimage + '.png'} style={{ width: "20px", height: "20px" }}></img>);
                        reportedUser["avatar"] = imgURL;
                        allReportedUsers.push(res.data);
                        console.log(allReportedUsers);
                        // Check IF - dubbels in die nuwe array of nie? 





                        setRows(allReportedUsers);
                        console.log(rows)
                        console.log(allReportedUsers);
                    });

                }


            });


    }, [reportedUsers]);
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 350 }}>
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
        </Paper>
    );
}
