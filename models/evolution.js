var mongoose = require("mongoose");

var EvoSchema = new mongoose.Schema({

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    fullname: String
  },
  date: {
    type: Date,
    default: Date.now
  },

  evaluated: String,
  score: String,
  office: String,

  competency: {
        c1: String,
        c2: String,
        c3: String,
        c4: String,
        cComment: String,
        cStars: String
  },

  service: {
        s1: String,
        s2: String,
        s3: String,
        s4: String,
        sComment: String,
        sStars: String
  },

  discipline: {
        d1: String,
        d2: String,
        d3: String,
        dComment: String,
        dStars: String
  },
  other: {
        o1: String,
        o2: String,
        o3: String,
        o4: String,
        o5: String,
        o6: String,
        oComment: String,
        oStars: String
  }
});

module.exports = mongoose.model("Evo", EvoSchema);