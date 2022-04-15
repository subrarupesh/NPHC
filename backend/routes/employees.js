const express = require('express');
const router = express.Router();
const employeeController = require('./../controllers/employees');
// router.post('/', checkAuth, courseController.createCourse);
// router.put('/:id', checkAuth, courseController.editCourse);
// router.delete('/:id', checkAuth, courseController.removeCourse);
// router.get('/', checkAuth, courseController.getCourses);

router.post('/upload', employeeController.uploadEmployeeCSV);
router.get('/', employeeController.getEmployees);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
module.exports = router;