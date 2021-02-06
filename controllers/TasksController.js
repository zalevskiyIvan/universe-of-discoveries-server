const { TasksSchema } = require("../model/schemes");

exports.tasksController = {
  add: async (req, res) => {
    try {
      const { klass, header, body, img, subject, date } = req.body;

      if (!klass && !body && !header && subject)
        return res.status(400).json({ message: "no data" });
      const post = new TasksSchema({
        klass,
        header,
        body,
        img,
        subject,
        date,
      });
      const task = await post.save();
      res.status(201).json({ id: task._id });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get: async (req, res) => {
    try {
      const { klass, subject, page, limit = 4 } = req.query;
      if (klass !== "0") {
        const task = await TasksSchema.find({ klass, subject })
          .limit(limit * 1)
          .skip((page - 1) * limit);
        res.status(200).json(task);
      }
      if (klass === "0") {
        const task = await TasksSchema.find({ subject })
          .limit(limit * 1)
          .skip((page - 1) * limit);
        res.status(200).json(task);
      }
    } catch (e) {
      res.status(500).json({ message: "server error", e });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await TasksSchema.findByIdAndRemove(id);
      res.status(200).json(result._id);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get_with_filter: async (req, res) => {
    try {
      const { klass, subject, filter } = req.query;
      const task = await TasksSchema.find({ klass, subject });
      if (!filter) res.status(200).json(task);
      const result = task.filter(
        (e) =>
          e.header.slice(0, filter.length).toLowerCase() == filter.toLowerCase()
      );

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
