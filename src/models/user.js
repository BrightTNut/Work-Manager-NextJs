import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is must!!"],
  },
  password: {
    type: String,
    require: [true, "Password Required!!  "],
  },
  about: String,
  prfileURL: String,
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
