// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController'); // پەقەت بىرىنىلا ئىشلىتىمىز
const { authMiddleware } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// بارلىق course قايتۇرۇش
router.get('/', courseController.getCourses);

// بىر course نى كۆرۈش
router.get('/:id', courseController.getCourseById);

// يېڭى course قوشۇش
router.post('/', authMiddleware, courseController.createCourse);

// course يېڭىلاش
router.put('/:id', authMiddleware, courseController.updateCourse);

// course ئۆچۈرۈش
router.delete('/:id', authMiddleware, courseController.deleteCourse);

// ماتىريال يوللاش (PDF, DOCX, PPTX قاتارلىقلار)
router.post(
  '/:id/materials',
  authMiddleware,
  upload.single('file'),
  courseController.uploadMaterial   // بۇ يەردە نامى controller بىلەن ماس
);

module.exports = router;
