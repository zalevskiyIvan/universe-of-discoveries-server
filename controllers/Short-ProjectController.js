const { ProjectSchema } = require("../model/schemes");
exports.shortProjectController = {
  get: async (req, res) => {
    try {
      const { subject, page, limit = 4 } = req.query;
      const projects = await ProjectSchema.find(
        { subject },
        { shortDescription: 1, header: 1, date: 1 }
      )
        .limit(limit * 1)
        .skip((page - 1) * limit);

      res.status(200).json(projects);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get_with_filter: async (req, res) => {
    try {
      const { subject, filter } = req.query;
      const projects = await ProjectSchema.find(
        { subject },
        { shortDescription: 1, header: 1, date: 1 }
      );

      if (!filter) res.status(200).json(projects);
      console.log(projects);
      const result = projects.filter(
        (e) =>
          e.header.slice(0, filter.length).toLowerCase() == filter.toLowerCase()
      );

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id);
      const result = await ProjectSchema.findByIdAndRemove(id);
      res.status(200).json(result._id);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
