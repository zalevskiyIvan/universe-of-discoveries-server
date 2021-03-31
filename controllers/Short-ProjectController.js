const { ProjectSchema } = require("../model/schemes");

exports.shortProjectController = {
  get: async (req, res) => {
    try {
      const { subject, page, limit = 8 } = req.query;
      const totalCount = await ProjectSchema.find({
        subject,
      }).count();
      const projects = await ProjectSchema.find(
        { subject },
        { shortDescription: 1, header: 1, date: 1, allowed: 1 }
      )
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).json({ projects, totalCount });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get_with_filter: async (req, res) => {
    try {
      const { subject, filter } = req.query;
      const projects = await ProjectSchema.find(
        { subject },
        { shortDescription: 1, header: 1, date: 1, allowed: 1 }
      ).sort({ _id: -1 });

      if (!filter) res.status(200).json(projects);
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
      const result = await ProjectSchema.findByIdAndRemove(id);
      res.status(200).json(result._id);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  edit: async (req, res) => {
    try {
      const { header, shortDescription, date, id } = req.body;

      if (header) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { header },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (shortDescription) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { shortDescription },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (date) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { date },
          { new: true }
        );
        const project = {
          shortDescription: newPost.shortDescription,
          header: newPost.header,
          date: newPost.date,
          allowed: newPost.allowed,
        };
        res.status(200).json(project);
      } else res.status(204).json({ message: "not data" });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },

  allow: async (req, res) => {
    try {
      const { id } = req.query;
      await ProjectSchema.findByIdAndUpdate(id, {
        allowed: true,
      });
      res.status(200).json({ id });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
