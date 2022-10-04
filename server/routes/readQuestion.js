

// read all questions
// the get method requires a asynchronous connection to the database
router.get('/api/readquestions', async(req, res) => {
    const findProducts = await productSchema.find();
    res.json(findProducts);
});