const express = require("express");
const { uLink } = require("../controllers/UserfullLinksController");
const { tasksController } = require("../controllers/TasksController");
const { eventsController } = require("../controllers/EventsController");
const {
  shortProjectController,
} = require("../controllers/Short-ProjectController");
const { authController } = require("../controllers/AuthController");
const { projectController } = require("../controllers/projectsController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const router = express.Router();

// http://localhost:3001/api/events
router.post("/events", eventsController.add);
router.get("/events", eventsController.get);
router.delete("/events", AuthMiddleware, eventsController.delete);
router.get("/filter-events", eventsController.get_with_filter);

//http://localhost:3001/api/tasks
router.post("/tasks", tasksController.add);
router.get("/tasks", tasksController.get);
router.delete("/tasks", AuthMiddleware, tasksController.delete);
router.get("/filter-tasks", tasksController.get_with_filter);

// //http://localhost:3001/api/short-projects
router.get("/short-projects", shortProjectController.get);
router.delete("/short-projects", AuthMiddleware, shortProjectController.delete);
router.get("/filter-short-projects", shortProjectController.get_with_filter);

// //http://localhost:3001/api/projects
router.post("/projects", projectController.add);
router.get("/projects", projectController.get);

//http://localhost:3001/api/links
router.post("/links", AuthMiddleware, uLink.add);
router.get("/links", uLink.get);

// //http://localhost:3001/api/auth
router.get("/auth", authController);

// router.get("/test", async (req, res) => {
//   const result = await EventsSchema.find({});
//   res.json(result);
// });

module.exports = router;
