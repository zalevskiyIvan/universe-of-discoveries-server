const { UsefulLinkSchema } = require("../model/schemes");

exports.uLink = {
  add: async (req, res) => {
    try {
      const { link, description } = req.body;
      console.log(link);
      if (!link && !description)
        return res.status(400).json({ message: "no data" });
      const usefulLink = new UsefulLinkSchema({
        link,
        description,
      });
      const linkID = await usefulLink.save();
      res.status(201).json({ id: linkID._id });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get: async (req, res) => {
    try {
      const usefulLink = await UsefulLinkSchema.find({}).sort({
        _id: -1,
      });
      res.status(200).json(usefulLink);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
