const { client, jobApplications, job, student } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolver = {
  Query: {
    jobapps: async () => {
      try {
        const data = await jobApplications.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    jobapp: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await jobApplications.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await jobApplications.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const studentId = new mongoDB.ObjectId(args.input.student);
          const studentData = await student.updateOne(
            { _id: studentId },
            { $push: { jobApp: result.insertedId.toString() } }
          );

          const jobId = new mongoDB.ObjectId(args.input.jobId);
          const jobData = await job.updateOne(
            { _id: jobId },
            { $push: { jobApp: result.insertedId.toString() } }
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
    updateJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await jobApplications.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "jobApplications updated",
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
    deleteJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.jobAppID);
          const data = await jobApplications.deleteOne({ _id: id });

          return {
            msg: "jobApplications deleted",
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

  JobAppUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "JobApp";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  JobApp: {
    job: async (parent) => {
      console.log(123);
      const ids = parent.jobId;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await job.findOne({ _id: id });
            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },
    student: async (parent) => {
      const ids = parent.student;

      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await student.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
  },
};

module.exports = resolver;
