const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    removeReaction

} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtsId
router
    .route('/:id')
    .get(getSingleThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);


router
.route('/:thoughtId/reactions')
.post(createReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;