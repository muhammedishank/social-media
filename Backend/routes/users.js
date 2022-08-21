const router = require("express").Router();
const bycrypt = require("bcrypt");
const User = require("../model/User");
const {protect} = require('../middleware/middleware')

// Update user
router.put("/:id",protect, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bycrypt.genSalt(10);
        req.body.password = await bycrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("u can only update ur account");
  }
});

// Delete
router.delete("/:id",protect, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("u can only delete ur account");
  }
});

// get a user
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Follow user
router.put("/:id/follow", protect, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.body.userId } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("u can't follow yourself like a SP");
  }
});

// unfollow
router.put("/:id/unfollow", protect, async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { following: req.body.userId } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you are not followed this user");
        }
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("u can't unfollow yourself like a SP");
    }
  });

module.exports = router;
