const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const { route } = require('../app');
const router = express.Router();


router.route('/').get(authController.protect,taskController.getAllTask).post(authController.protect,taskController.CreateTask)

route.route('/:id').get(authController.protect, taskController.getTaskById)

