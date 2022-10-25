import '../../scss/flaggedPost.scss';
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
// import '../../scss/reportedUserCards.scss';
import { Icon, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DeleteAnswerModal from '../../modals/DeleteFlaggedAnswerModal';
import IgnoreAnswerModal from '../../modals/IgnoreFlaggedAnswerModal';
import moment from 'moment';


const FlaggedAnswers = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
        { id: 'question', label: 'On Question', minWidth: 100 },
        // { id: 'description', label: 'Answer', minWidth: 50 },
        { id: 'downvotes', label: 'Total Downvotes', minWidth: 50 },
        { id: 'datePosted', label: 'Date Posted', minWidth: 90 },
        { id: 'dateFlagged', label: 'Flag Date', minWidth: 90 },
        { id: 'flagReason', label: 'Flag Reason', minWidth: 90 },
        { id: 'deletePost', label: '', minWidth: 100 },
        { id: 'ignorePost', label: '', minWidth: 100 },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Reporteds
    // Reported Users
    // const [reportedUsers, setReportedUsers] = useState(false);
    // const [reportedUsersStateNumberofUsers, setReportedUsersStateNumberofUsers] = useState();
    // const [totalReportedUsers, setTotalReportedUsers] = useState();
    const [rows, setRows] = useState([]);
    const [deletePostModal, setDeletePostModal] = useState();
    const [ignoreUserModal, setIgnoreUserModal] = useState();
    const [reportedQuestion, setReportedQuestion] = useState([]);

    const removePostFromFlagTable = (id) => {
        setIgnoreUserModal(<IgnoreAnswerModal close={setIgnoreUserModal} id={id} answer={true} />)
        // console.log(id);
    }

    const deleteUser = (id) => {
        // console.log(id);
        setDeletePostModal(<DeleteAnswerModal
            close={setDeletePostModal} id={id} answer={true} />)
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/api/reportedAnswer/')
            .then(res => {
                let data = res.data.answers
                // console.log(res.data);
                let reportedQuestion = []

                setRows([])

                for (let i = 0; i < data.length; i++) {
                    let reportedQuestion = data[i];
                    // console.log(reportedQuestion._id);
                    Axios.get('http://localhost:5000/api/reportedQuestionAnswer/' + reportedQuestion._id).then(res1 => {
                        let loopData = data[i]

                        let data1 = res1.data.finduser[0]
                        // console.log(res1.data);

                            //Format Date date
                            let dateFlagged =data1.dateFlagged;
                            let formatDateFlagged = moment(dateFlagged).format('DD MMMM YYYY');

                            let datePosted =loopData.datePosted;
                            let formatDatePosted = moment(datePosted).format('DD MMMM YYYY');

                        // console.log();
                        reportedQuestion["datePosted"] = formatDatePosted;
                        reportedQuestion["question"] = res.data.questions[i].title;
                        reportedQuestion["dateFlagged"] = formatDateFlagged;
                        reportedQuestion["flagReason"] = data1.flagReason;
                        reportedQuestion["totalAnswers"] = res1.data.totalAnswers[0].answerLength;


                        // console.log(loopData.datePosted);



                        // Remove button
                        const removePostFromListButton = (
                            <Button sx={{
                                backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '100px', fontFamily: 'Open Sans', fontSize: "10px", marginLeft: "-4px",
                                '&:hover': {
                                    backgroundColor: '#FF7900',
                                }
                            }} variant="contained" onClick={() => removePostFromFlagTable(reportedQuestion._id)}>
                                IGNORE
                            </Button>
                        )
                        reportedQuestion["ignorePost"] = removePostFromListButton;

                        // Deletebutton
                        const deleteButton = (
                            <Button sx={{
                                backgroundColor: '#2b2b2b', borderRadius: '20px', height: "33px", width: '130px', fontFamily: 'Open Sans', fontSize: "10px",
                                '&:hover': {
                                    backgroundColor: '#FF7900',
                                }

                            }} variant="contained" onClick={() =>
                                deleteUser(reportedQuestion._id)}>

                                <DeleteIcon style={{ height: "15px" }} />Delete
                            </Button >
                        )
                        reportedQuestion["deletePost"] = deleteButton;

                        setRows(rows => [...rows, reportedQuestion]);
                    });
                }

            })


    }, [deletePostModal, ignoreUserModal]);

    return (
        < >{deletePostModal}
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
                        <TableBody >
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
export default FlaggedAnswers;