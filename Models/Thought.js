const { Schema, model} = require('mongoose');
const reactionSchema= require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormat(timeStamp),
    },
    username: {
        type: String,
        required: true,
    },
    reaction:[
        reactionSchema
    ],
},
    {
        toJSON: {
            virtuals:true,
            getters: true,
        },
        id:false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model("Thought", ThoughtSchema);
model.exports = Thought;