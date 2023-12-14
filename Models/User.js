const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    },],
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model("user", UserSchema);
model.exports = User;