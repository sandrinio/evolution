let mongoose = require("mongoose");
let User = require("./user");

let commentSchema = new mongoose.Schema({
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
    date: {type: Date, default: Date.now}
});



module.exports = mongoose.model("Comment", commentSchema);