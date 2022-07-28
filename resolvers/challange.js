const { client, challange } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    challanges: async () => {
      try {
        const data = await challange.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    challange: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await challange.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addChallange: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await challange.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          return {
            msg: "data Added",
          };
        } catch (e) {
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "Please Login!!!",
        };
      }
    },

    updateChallange: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await challange.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "challange updated",
          };
        } catch (e) {
          console.log(e);
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
    deleteChallange: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.challangeID);
          const data = await challange.deleteOne({ _id: id });

          return {
            msg: "challange deleted",
          };
        } catch (e) {
          console.log(e);
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
  },

  ChallangeUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Challange";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
