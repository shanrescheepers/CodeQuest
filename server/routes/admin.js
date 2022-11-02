const express = require('express');
const router = express();
const mongoose = require('mongoose');
const AdminSchema = require('../models/adminRequest');



router.post('/api/adminreq', (req, res) => {

    // console.log(req.body);
    const adminReq = new AdminSchema({
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        reliability: +req.body.reliability,
        requestStatus: req.body.requestStatus,
    });
    // console.log("new user", newUser);

    adminReq.save()
        .then(item => {
            // console.log("Item log:", item);
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: "There is an error", err });
        });
});



// get all users
router.get('/api/getadminreq', async (req, res) => {
    const adminReq = await AdminSchema.find();
    res.send(adminReq);
});





router.get('/api/adminrequser/:id', async (req, res) => {
    const findUser = await AdminSchema.findById(req.params.id);
    res.json(findUser);
});




router.patch('/api/adminreqauth/:id', async (req, res) => {
    console.log(req.params)
    console.log(req.body)

    const adminReq = await AdminSchema.updateOne(
        { _id: req.params.id },
        {
            $set: {
                userId: req.body.userId,
                requestStatus: req.body.requestStatus,
                reliability: req.body.reliability,
                userEmail: req.body.userEmail,
            }
        }
    )

    res.json(adminReq);
});


module.exports = router;