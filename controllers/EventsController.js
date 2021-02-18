const { EventsSchema } = require("../model/schemes");

exports.eventsController = {
  add: async (req, res) => {
    try {
      const { klass, header, body, img, subject, date } = req.body;
      if (!klass || !body || !header || !subject)
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
      const { klass, subject, page = 1, limit = 4, parallel } = req.query;
      if (klass !== "0") {
        // const totalCount = await EventsSchema.find({
        //   klass: kalss || parallel,
        //   subject,
        // }).count();
        const totalCount = 1;
        const events = await EventsSchema.find({
          klass: klass | parallel,
          subject,
        })
          .limit(limit * 1)
          .skip((page - 1) * limit);
        console.log(events);
        res.status(200).json({ events, totalCount });
      }
      if (klass === "0") {
        const totalCount = await EventsSchema.find({ subject }).count();
        const events = await EventsSchema.find({ subject })
          .limit(limit * 1)
          .skip((page - 1) * limit);
        res.status(200).json({ events, totalCount });
      }
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
      let events;
      if (klass === "0") events = await EventsSchema.find({ subject });
      if (klass !== "0")
        events = await EventsSchema.find({ klass: klass | parallel, subject });
      if (!filter) res.status(200).json(events);

      const result = events.filter(
        (e) =>
          e.header.slice(0, filter.length).toLowerCase() == filter.toLowerCase()
      );
      res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ message: "re-authorization" });
    }
  },
};
