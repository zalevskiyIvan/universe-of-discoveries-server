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
const { chairController } = require("../controllers/ChairController");
const router = express.Router();

// http://localhost:3001/api/chairs
router.get("/chairs", chairController.get);
// router.post("/chairs", chairController.create);

// http://localhost:3001/api/events
router.post("/events", AuthMiddleware, eventsController.add);
router.get("/events", eventsController.get);
router.put("/events", AuthMiddleware, eventsController.edit);
router.delete("/events", AuthMiddleware, eventsController.delete);
router.get("/filter-events", eventsController.get_with_filter);

//http://localhost:3001/api/tasks
router.post("/tasks", AuthMiddleware, tasksController.add);
router.get("/tasks", tasksController.get);
router.delete("/tasks", AuthMiddleware, tasksController.delete);
router.put("/tasks", AuthMiddleware, tasksController.edit);
router.get("/filter-tasks", tasksController.get_with_filter);

// //http://localhost:3001/api/short-projects
router.get("/short-projects", shortProjectController.get);
router.delete("/short-projects", AuthMiddleware, shortProjectController.delete);
router.put("/short-projects", AuthMiddleware, shortProjectController.edit);
router.get("/filter-short-projects", shortProjectController.get_with_filter);
// router.get(
//   "/pending-short-projects",
//   AuthMiddleware,
//   shortProjectController.pending
// );
router.get(
  "/allow-short-projects",
  AuthMiddleware,
  shortProjectController.allow
);
// router.get(
//   "/pending-filter-short-projects",
//   AuthMiddleware,
//   shortProjectController.get_with_filter_pending
// );

// //http://localhost:3001/api/projects
router.post("/projects", projectController.add);
router.get("/projects", projectController.get);
router.put("/projects", AuthMiddleware, projectController.edit);

//http://localhost:3001/api/links
router.post("/links", AuthMiddleware, uLink.add);
router.get("/links", uLink.get);

// //http://localhost:3001/api/auth
router.post("/auth", authController);

module.exports = router;
