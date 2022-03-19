import { Schema, model } from "mongoose";
import { hashSync } from "bcrypt";

interface User {
  name: string,
  password: string
};

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    default: "",
    unique: true,
    set: (v: string) => v.toLowerCase()
  },
  password: {
    type: String,
    required: true,
    set: (v: string) => hashSync(v, 10)
  }
});

export default model("user", userSchema);
