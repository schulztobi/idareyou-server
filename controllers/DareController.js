import Dare from '../models/Dare';

// Show the list of Dares

const showAllDares = (req, res, next) => {
  Dare.find()
    .then((dares) => {
      res.json(dares);
    })
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

// Show single Dare with POST requets and the known ID

const showSingleDare = (req, res, next) => {
  let dareID = req.body.dareID;
  Dare.findById(dareID)
    .then((dare) => {
      res.json({
        dare,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

// Show single Dare by ID with GET request

const showSingleDareById = (req, res) => {
  const { id } = req.params;
  Dare.find({ _id: id })
    .then((dare) => {
      res.json(dare);
    })
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

// Create a Dare

const createDare = (req, res, next) => {
  let dare = new Dare({
    headline: req.body.headline,
    infotext: req.body.infotext,
    fileName: req.body.fileName,
    filePath: req.body.filePath,
    daredUser: req.body.daredUser,
    dareCreator: req.body.dareCreator,
  });

  // File UPLOAD with multer didnt work
  // if (req.file) {
  //   image = req.file.path;
  // }

  dare
    .save()
    .then((response) => {
      res.json({
        message: 'Dare added successfully',
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

// Create a Dare v2

// server.post('/dares', (req, res) => {
//   const newDare = req.body;
//   const dare = new Dare(newDare);
//   dare.save().then((dare) => res.json(dare));
// });

// Update a Dare

const updateDare = (req, res, next) => {
  let dareID = req.body.dareID;

  let updatedData = {
    headline: req.body.headline,
    infotext: req.body.infotext,
    fileName: req.body.fileName,
    filePath: req.body.filePath,
    daredUser: req.body.daredUser,
  };

  Dare.findByIdAndUpdate(dareID, { $set: updatedData })
    .then(() => {
      res.json({
        message: 'Date updated successfully!',
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

//Delete a Dare

const deleteDare = (req, res, next) => {
  let dareID = req.body.dareID;
  Dare.findByIdAndRemove(dareID)
    .then(() =>
      res.json({
        message: 'Dare deleted succussfully!',
      })
    )
    .catch((error) => {
      res.json({
        message: 'An error has occured!',
      });
    });
};

const deleteDareById = (req, res) => {
  const { id } = req.params;
  Dare.findByIdAndRemove({ _id: id }).then(() =>
    res
      .json({
        message: 'Dare deleted successfully',
      })
      .catch((error) => {
        res.json({
          message: 'An error has occured!',
        });
      })
  );
};

module.exports = {
  showAllDares,
  showSingleDare,
  showSingleDareById,
  createDare,
  updateDare,
  deleteDare,
  deleteDareById,
};
