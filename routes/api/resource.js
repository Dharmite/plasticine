const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const Resource = require("../../models/Resource");

const auth_middleware = require("../../middlewares/auth");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("files");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|mp3|aac|ogg|m4a|wma|flac|wav|m4v|mov|flv|avi|mpg|wmv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid file type!");
  }
}

// @route POST api/resource/new
// @desc Create resource
// @access Private

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.json(err);
      } else {
        const newResoure = {
          user: req.user.id,
          title: req.body.title,
          category: req.body.category,
          subCategory: req.body.subCategory,
          observation: req.body.observation,
          files: []
        };
        req.files.forEach(file => {
          let fileObj = {
            filename: file.filename,
            destination: file.destination,
            src: file.destination + file.filename
          };
          newResoure.files.push(fileObj);
        });

        new Resource(newResoure)
          .save()
          .then(resource => {
            resource
              .save()
              .then(val => res.json(val))
              .catch(err => res.json(err));
          })
          .catch(err => res.json(err));
      }
    });
  }
);

// @route POST api/resource/:resource_id
// @desc Edit resource with given id
// @access Private

router.post(
  "/:resource_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrAdmin,
  (req, res) => {
    const newResource = {
      title: req.body.title,
      category: req.body.category,
      subCategory: req.body.subCategory,
      observation: req.body.observation
    };

    Resource.findByIdAndUpdate(req.params.resource_id, newResource).then(
      resource => {
        if (!resource) {
          res.status(400).json({ error: "Não há nenhum recurso com esse id" });
        } else {
          res.json(resource);
        }
      }
    );
  }
);

// @route DELETE api/resource/:resource_id
// @desc DELETE resource with given id
// @access Private

router.delete(
  "/:resource_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrAdmin,
  (req, res) => {
    Resource.findByIdAndRemove(req.params.resource_id).then(resource => {
      if (!resource) {
        res.status(400).json({ error: "Não há nenhum recurso com esse id" });
      } else {
        res.json(resource);
      }
    });
  }
);

// @route GET api/resource/:resource_id
// @desc GET resource with given id
// @access Private

router.get(
  "/:resource_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrAdmin,
  (req, res) => {
    Resource.findById(req.params.resource_id).then(resource => {
      if (!resource) {
        res.status(400).json({ error: "Não há nenhum recurso com esse id" });
      } else {
        res.json(resource);
      }
    });
  }
);

// @route GET api/resource/all
// @desc GET all resources
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Resource.find()
      .then(resources => {
        if (resources.length === 0) {
          errors.noresource = "Não há nenhum recurso para mostrar";
          return res.status(404).json(errors);
        }

        res.json(resources);
      })
      .catch(err =>
        res.status(404).json({ resource: "Não há nenhum recurso para mostrar" })
      );
  }
);

// @route GET api/resource/category/:category_name
// @desc GET all resources by category name
// @access Private

router.get(
  "/category/:category_name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Resource.find({ category: req.params.category_name })
      .then(resources => {
        if (resources.length === 0) {
          errors.noresource = "Não há nenhum recurso para mostrar";
          return res.status(404).json(errors);
        }

        res.json(resources);
      })
      .catch(err =>
        res.status(404).json({ resource: "Não há nenhum recurso para mostrar" })
      );
  }
);

module.exports = router;
