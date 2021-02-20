const { ProjectSchema } = require("../model/schemes");

exports.projectController = {
  add: async (req, res) => {
    //make one object
    try {
      const data = ({
        header,
        purpose,
        tasks,
        relevance,
        conclusions,
        results,
        subject,
        date,
        presentationHtml,
        shortDescription,
        members,
        allowed,
      } = req.body);
      if (!header) return res.status(400).json({ message: "no data" });
      const post = new ProjectSchema({
        ...data,
      });
      const project = await post.save();
      res.status(201).json(project);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get: async (req, res) => {
    try {
      const { subject, id } = req.query;
      const project = await ProjectSchema.find({ subject, _id: id });
      res.status(200).json(project);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  edit: async (req, res) => {
    try {
      const {
        header,
        purpose,
        tasks,
        relevance,
        conclusions,
        results,
        members,
        id,
      } = req.body;

      if (header) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { header },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (purpose) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { purpose },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (relevance) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { relevance },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (tasks) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { tasks },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (conclusions) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { conclusions },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (results) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { daresultste },
          { new: true }
        );
        res.status(200).json(newPost);
      } else if (members) {
        const newPost = await ProjectSchema.findByIdAndUpdate(
          id,
          { members },
          { new: true }
        );
        res.status(200).json(newPost);
      } else res.status(204).json({ message: "not data" });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
