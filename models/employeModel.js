const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      minLength: [4, "first nane should be atleast 4 char long"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
      minLength: [4, "last nane should be atleast 4 char long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      select: false,
      maxlength: [15, "password should not exceed more than 15 char"],
      minlength: [6, "password should have atleast 6 char"],
      //   match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },

    resetPasswordToken: {
      type: String,
      default: "0",
    },

    contact: {
      type: String,
      required: [true, "contact is required"],
      maxLength: [10, "contact must not exceed 10 char "],
      minLength: [10, "contact should be atleast 10 char long"],
    },

    organizationname: {
      type: String,
      // required: [true, "organization name is required"],
      minLength: [4, "organization nane should be atleast 4 char long"],
    },

    organizationlogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=2048",
      },
    },

    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],

    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
  },

  { timestamps: true }
);

employeModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
employeModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;
