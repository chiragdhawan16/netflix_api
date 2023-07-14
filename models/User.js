import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePic: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/users%2Fno_image.png?alt=media&token=f8044609-d880-4171-b9fc-dc32e184a59c" },
      isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
 export default mongoose.model("User", UserSchema);
  // module.exports = mongoose.model("User", UserSchema);
