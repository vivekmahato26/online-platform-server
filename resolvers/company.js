const { client, company, job } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    challanges: async () => {
      try {
        const data = await company.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    company: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await company.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addCompany: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await company.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const jobId = new mongoDB.ObjectId(args.input.jobId);

          const jobData = await job.updateOne(
            { _id: jobId },
            { $push: { company: result.insertedId.toString() } }
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
    updateCompany: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await company.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "company updated",
          };
        } catch (e) {
          console.log(e);
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user nor logged !!",
        };
      }
    },
    deleteCompany: async (_, args, { req }) => {
      if (req.isAuth) {
        if (req.userType == "admin" || !"student" || !"employee") {
          try {
            const id = new mongoDB.ObjectId(args.companyID);
            const data = await company.deleteOne({ _id: id });

            return {
              msg: "company deleted",
            };
          } catch (e) {
            console.log(e);
            return { err: JSON.stringify(e) };
          }
        } else {
          return {
            msg: "unauthorised access",
          };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
  },
  CompanyUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "company";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
