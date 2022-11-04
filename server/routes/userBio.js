const express = require('express');
const router = express();

//link bio schema 
const userBioSchema = require('../models/userBio');

router.post('/api/addbio', (req, res) => {
    constNewBio = new userBioSchema({
        userBioId: req.body.userBioId,
        description: req.body.description,
    });

    constNewBio.save()
    .then(async item => {
        res.json(item)
    })
    .catch(err => {
        res.status(400).json({ msg: 'There was an error adding your bio.', err});
    });
})

router.get('/api/readbio', async (req, res) => {
    const findBio = await userBioSchema.find();
    res.json(findBio);
});

router.patch('/api/updatebio/:id', async (req, res) => {
    console.log(req.body);
    
    const findBio = await userBioSchema.updateOne(
        {_id: req.params.id},
        {$set: {
            description: req.body.description,
        }}
    )
    res.json(findBio);
})

module.exports = router;