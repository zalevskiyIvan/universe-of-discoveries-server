const { EventsSchema } = require("../model/schemes");

exports.eventsController = {
  add: async (req, res) => {
    try {
      const { klass, header, body, img, subject, date } = req.body;
      if (!klass && !body && !header && subject)
        return res.status(400).json({ message: "no data" });

      const post = new EventsSchema({
        klass,
        header,
        body,
        img,
        subject,
        date,
      });
      const event = await post.save();

      res.status(201).json({ id: event._id });
    } catch (e) {
      res.status(500).json({ message: "server error", e });
    }
  },
  get: async (req, res) => {
    try {
      const { klass, subject, page = 1, limit = 4 } = req.query;
      // const events = await EventsSchema.find({ klass, subject })
      //   .limit(limit * 1)
      //   .skip((page - 1) * limit);
      const events = await EventsSchema.find({});
      res.status(200).json(events);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await EventsSchema.findByIdAndRemove(id);
      res.status(200).json(result._id);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
  get_with_filter: async (req, res) => {
    try {
      const { klass, subject, filter } = req.query;
      const events = await EventsSchema.find({ klass, subject });

      if (!filter) res.status(200).json(events);

      const result = events.filter(
        (e) =>
          e.header.slice(0, filter.length).toLowerCase() == filter.toLowerCase()
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  },
};
