const { client, Module, course } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    modules: async () => {
      try {
        const data = await Module.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    module: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await Module.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addModules: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await Module.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const courseId = new mongoDB.ObjectId(args.input.course);
          const courseData = await course.updateOne(
            { _id: courseId },
            { $push: { module: result.insertedId.toString() } }
          );
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
    updateModules: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await modules.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "modules updated",
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
    deleteModules: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await Module.deleteOne({ _id: id });

          return {
            msg: "modules deleted",
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
  ModuleUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Modules";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Modules: {
    Section: async (parent) => {
      let ids = parent.Section;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await section.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
    course: async (parent) => {
      let ids = parent.course;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await course.findOne({ _id: id });
          res.push(data);
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
      }
      return res;
    },
  },
};

module.exports = resolvers;
