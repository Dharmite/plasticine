const express = require("express");
const router = express.Router();
const passport = require("passport");

const Resource = require("../../models/Resource");

const auth_middleware = require("../../middlewares/auth");

// @route POST api/resource/new
// @desc Create resource
// @access Private

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    const newResoure = {
      user: req.user.id,
      title: req.body.title,
      category: req.body.category,
      subCategory: req.body.subCategory,
      observation: req.body.observation
    };

    new Resource(newResoure)
      .save()
      .then(resource => res.status(200).json(resource))
      .catch(err => res.json(err));
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

    Resource.find({category: req.params.category_name})
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
