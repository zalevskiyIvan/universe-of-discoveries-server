const ChairSchema = require("../model/chairSchema");

exports.chairController = {
  get: async (req, res) => {
    try {
      const { page } = req.query;
      const chairs = await ChairSchema.findOne({})
        .limit(1)
        .skip(page - 1);
      res.status(200).json(chairs);
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
  create: async (req, res) => {
    try {
      const { title, subjects, teachers } = req.body;
      const chair = new ChairSchema({
        title,
        subjects,
        teachers,
      });
      const result = await chair.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
};
