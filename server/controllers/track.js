const Track = require('../models/track');

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'Fetched all tracks belonging to the user.',
      count: tracks.length,
      data: tracks,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

exports.getTrack = async (req, res) => {
  try {
    const { trackId } = req.params;

    if (!trackId)
      return res.status(400).json({
        success: false,
        message: 'Missing field(s): [trackId]. Please provide correct information.',
      });

    const track = await Track.findById(trackId);

    if (!track)
      return res.status(404).json({
        success: false,
        message: 'A track with the given id does not exist.',
      });

    res.status(200).json({
      success: true,
      message: 'Fetched the required track belonging to the user.',
      data: track,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

exports.createTrack = async (req, res) => {
  try {
    const { name, locations } = req.body;

    if (!name || locations.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          'Missing fields [name/locations(empty array)]. Please provide correct information.',
      });
    }

    const newTrack = await Track.create({ name, locations, user: req.user._id });

    res.status(201).json({
      success: true,
      message: 'New track has been added successfully.',
      data: newTrack,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};
