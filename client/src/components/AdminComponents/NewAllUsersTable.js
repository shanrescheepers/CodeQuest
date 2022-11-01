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
import '../../scss/allUsersTableview.scss';
import { Icon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DeleteUserModalAdmin from '../../modals/DeleteUserModalAdmin';


const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 50 },
    { id: 'email', label: 'User Email', minWidth: 90 },
    { id: 'questionsAsked', label: 'Questions Asked', minWidth: 30 },
    { id: 'questionsAnswered', label: 'Questions Answered', minWidth: 20 },
    { id: 'yearlevel', label: 'Year Level', minWidth: 30 },
    { id: 'rank', label: 'Rank', minWidth: 30 },
    { id: 'deleteUser', label: 'Delete User', minWidth: 100 },
];

export default function NewAllUsersTable() {
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
    // Users
    const [deleteUserModal, setDeleteUserModal] = useState();
    // Delete user
    const deleteUser = (id) => {
        // console.log(id);
        setDeleteUserModal(<DeleteUserModalAdmin
            close={setDeleteUserModal} id={id}
        />)
    }
    useEffect(() => {
        Axios.get('http://localhost:5000/api/getUser')
            .then(res => {
                let allUsers = res.data;
                for (let i = 0; i < allUsers.length; i++) {
                    let year = allUsers[i].yearlevel;
                    let bgColor = '';
                    if (year === 1) {
                        bgColor = '#6EEB83'
                    } else if (year === 2) {
                        bgColor = '#6CD4FF'
                    } else {
                        bgColor = '#FF7900'
                    };
                    const imgURL = (<div className='profileBackground' style={{ backgroundColor: bgColor }}>
                        <img src={'Avatars/' + allUsers[i].profileimage + '.png'} className="profile-imgage"></img>
                    </div>);
                    allUsers[i]["avatar"] = imgURL;
                    const deleteButton = (
                        <Button sx={{
                            backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '130px', fontFamily: 'Open Sans', fontSize: "10px",
                            '&:hover': {
                                backgroundColor: '#FF7900',
                            }
                            // onClick= {() => {decreaseProduct(row.id)}}
                        }} variant="contained" onClick={() =>
                            deleteUser(allUsers[i]._id)
                        }>
                            <DeleteIcon style={{ height: "15px" }} />Delete User
                        </Button>
                    )
                    allUsers[i]["deleteUser"] = deleteButton;
                }
                setRows(allUsers);
            });
    }, [deleteUserModal]);
    return (
        < >{deleteUserModal}
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
}
