const express = require('express');
const trackController = require('../controllers/track');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(trackController.getAllTracks).post(trackController.createTrack);
router.route('/:trackId').get(trackController.getTrack);

module.exports = router;
