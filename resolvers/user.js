const AWS = require("aws-sdk");

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const {
  client,
  user,
  address,
  tickets,
  student,
  mentor,
} = require("../mongoDB");

const mongoDB = require("mongodb");
const date = new Date();

module.exports = {
  Query: {
    login: async (_, args) => {
      try {
        const { email } = args;
        const checkUser = await user.findOne({ email });
       

        if (!checkUser) {
          return new Error("User not registered");
        } else {
          const exp = "5days";
          const storedPassword = checkUser.password;

          const { password } = args;

          const compare = await bcrypt.compare(password, storedPassword);
          if (!compare) {
            return new Error("wrong password");
          } else {
            // const studentId = await student.find({});
            // console.log(studentId._id);
            const token = jwt.sign(
              {
                id: checkUser._id,
                userID: checkUser.student || checkUser.mentor,
                email: checkUser.email,
                userType: checkUser.userType,
              },
              process.env.JWT_KEY,

              {
                expiresIn: exp,
              }
            );

            return {
              token,
              id: checkUser._id,
              userID: checkUser.student || checkUser.mentor,
              userType: checkUser.userType,
              email: checkUser.email,
              tokenExpiration: exp,
            };
          }
        }
      } catch (error) {
        return new Error(error);
      }
    },
    getUser: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const _id = new mongoDB.ObjectId(req.id);
          const data = await user.findOne({ _id: _id });
          console.log(data);
          return { ...data, userID: _id };
        } catch (error) {
          return { err: JSON.stringify(error.message) };
        }
      } else {
        return new Error("Please Login!!!");
      }
    },
    Users:async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const data = await user.find({}).toArray();
          console.log(data);
          return data;
        } catch (error) {
          return { err: JSON.stringify(error.message) };
        }
      } else {
        return new Error("Please Login!!!");
      }
    }
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        const { email,phone } = args.input;
        const checkUser = await user.findOne({ email });
        if(phone) {
          const checkPhone = await user.findOne({ phone });
          if (checkPhone) {
            return new Error("Phone already registered");
          }
        }
        if (checkUser) {
          return new Error("Email already registered");
        } else {
          const { password } = args.input;
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(password, salt);
          const data = await user.insertOne({
            ...args.input,
            password: hash,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
          });
          return {
            msg: "data added",
          };
        }
      } catch (err) {
        console.log(err)
        return { err: JSON.stringify(err.message) };
      }
    },
  },
  UserUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "User";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  User: {
    student: async (parent) => {
      const ids = parent.student;
      let res;
      if (ids) {
        // for (const c of ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await student.findOne({ _id: id });
          res = data;
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
        // }
      }
      return res;
    },
    address: async (parent) => {
      const ids = parent.address;
      let res;
      if (ids) {
        for (let c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await address.findOne({ _id: id });
            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },
    ticket: async (parent) => {
      const ids = parent.ticket;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await tickets.findOne({ _id: id });
            res = data;
            console.log(data);
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },
  },
};
