// ReportedUser
const express = require('express');
const router = express();
const ReportedUser = require('../models/reportedUser');

// CRUD GET
router.get('/api/reportedUser/:id', async (req, res) => {
    const findUser = await ReportedUser.findById(req.params.id);
    res.json(findUser);
});

// GET ALL
router.get('/api/allReportedUsers', async (req, res) => {
    const reportedUsers = await ReportedUser.find();
    // console.log("All Reported Users:", reportedUsers);
    res.send(reportedUsers);
});

// DELETE ONE : this needs some thinking because a user can get flagged by many other users
// Remove From List Function on Admin Page
router.delete('/api/deleteReportedUser/:id', async (req, res) => {
    console.log("Deleted the user on flagged");
    // console.log(req.params);
    await ReportedUser.deleteMany({ reportedUserId: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

// To Report A User, One must First , ADD a User (to report, obviouslay ay ay).
router.post('/api/addReportedUser', (req, res) => {
    console.log(req.body);
    const newReportedUser = new ReportedUser({
        reportingUserId: req.body.reportingUserId,
        reportedUserId: req.body.reportedUserId,
        flagReason: req.body.flagReason,
        questionId: req.body.questionId,
        // dateflagged doesn't get passed through
    });
    console.log("New Reported User (in violation of CodeQuest ethichs and principles)", newReportedUser);

    newReportedUser.save()
        .then(item => {
            console.log("Succesfully Added a New Reported User from CodeQuest. Username: ", item);
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: "Cannot add the new Reported User because: ", err });
        });
});

module.exports = router;

