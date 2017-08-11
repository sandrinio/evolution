"use strict";

var mongoose = require("mongoose");
var User = require("./user");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String,
        lastname: String,
        pic: String
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
//# sourceMappingURL=comment.js.map