const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}).populate({ path: 'reactions', select: '-_v' });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a user
    async getSingleThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate({
                    path: "reactions",
                    select: '-__v'
                })
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createThought(req, res) {
        try {
            const user = await User.findOne({ id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "No such user" });
            }
            const thought = await Thought.create({
                ...req.body, username: user.username,
            });
            await User.findOneAndUpdate(
                { _id: user._id },
                { $push: {thoughts: thought._id} },
                { new: true }
            );
            res.json({message: "It worked"});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a course
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No user with that ID' });
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.id},
                {$pull: {thoughts: req.params.id}},
                {new: true}
            );
            if(!user){
                res.status(404).json({message: "No such user"});
            }
            res.json({message:"It worked"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet:{reactoins:{...req.body, username: user.username}}},
                {runValidators: true, new: true}
            );
            if(!thought){
                res.status(404).json({message:'No such id'});
            }
            res.json({message:'it worked'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactoins: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({message: 'it worked'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
