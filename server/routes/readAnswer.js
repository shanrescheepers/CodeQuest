router.get("/api/readanswer", async (req, res) => {
    const findQuestions = await productSchema.find();
    res.json(findQuestions);
  });
  