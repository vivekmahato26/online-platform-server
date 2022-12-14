const { client, sectionTitle, Module, section } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    sectionTitles: async () => {
      try {
        const data = await sectionTitle.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    sectionTitle: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await sectionTitle.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addSectionTitle: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await sectionTitle.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const moduleId = new mongoDB.ObjectId(args.input.module);
          const moduleData = await Module.updateOne(
            { _id: moduleId },
            { $push: { sectionTitle: result.insertedId.toString() } }
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
    updateSectionTitle: async (_, args) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await sectionTitle.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "sectionTitle updated",
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
    deleteSectionTitle: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.sectiontitleID);
          const data = await sectionTitle.deleteOne({ _id: id });

          return {
            msg: "sectionTitle deleted",
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
  SectionTitleUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "SectionTitle";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  SectionTitle: {
    Section: async (parent) => {
      let ids = parent.Section;
      let res;
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);

            const data = await section.findOne({ _id: id });
            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },
    module: async (parent) => {
      const ids = parent.module;
      let res;
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await Module.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
  },
};

module.exports = resolvers;
