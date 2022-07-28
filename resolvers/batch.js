const {
  client,
  batch,
  course,
  student,
  user,
  registerStudent,
} = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    batchs: async () => {
      try {
        const data = await batch.find({}).toArray();

        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    batch: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await batch.findOne({ _id: id });

        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addBatch: async (_, args, { req }) => {
      if (req.isAuth) {
        if (req.userType == "admin" || !"employee" || !"student") {
          try {
            const result = await batch.insertOne({
              ...args.input,
              createdAt: date.toISOString(),
            });

            const courseId = new mongoDB.ObjectId(args.input.course);
            const courseData = await course.updateOne(
              { _id: courseId },
              { $push: { batch: result.insertedId.toString() } }
            );

            return {
              msg: "data Added",
            };
          } catch (err) {
            console.log(err);
            return {
              err: JSON.stringify(err),
            };
          }
        } else {
          return {
            msg: "Unauthorized access",
          };
        }
      }
      return {
        msg: "Please Login!!!",
      };
    },
    updateBatch: async (_, args, { req }, info) => {
      if (req.isAuth) {
        if (req.userType == "admin" || !"student" || !"employee") {
          try {
            const batchid = await batch.findOne({ _id: batchid });

            const data = await batch.updateOne(
              { batchId: batchid },
              { $set: { ...args.update, updatedAt: date.toISOString() } }
            );

            return {
              msg: "batch updated",
            };
          } catch (e) {
            console.log(e);
            return { err: JSON.stringify(e) };
          }
        } else {
          return {
            msg: "Unauthorized",
          };
        }
      }
      return {
        msg: "Please Login!!!",
      };
    },

    deleteBatch: async (_, args, { req }) => {
      if (req.isAuth) {
        if (req.userType == "admin" || !"student" || !"employee") {
          try {
            const id = new mongoDB.ObjectId(args.batchID);
            const data = await batch.deleteOne({ _id: id });

            const courseId = new mongoDB.ObjectId(args.courseID);
            const courseData = await course.updateOne(
              { _id: courseId },
              { $unset: { batch: data } }
            );

            const studentId = new mongoDB.ObjectId(args.studentID);
            const studentData = await student.updateOne(
              { _id: studentId },
              { $unset: { batch: data } }
            );
            console.log(req);
            return {
              msg: "batch deleted",
            };
          } catch (e) {
            return { err: JSON.stringify(e) };
          }
        } else {
          return {
            msg: "Unauthorized access",
          };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
    registerStudent: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateId);
          const result = await batch.updateOne(
            { _id: id },
            {
              $push: {
                students: req.userId,
              },
            }
          );
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
        try {
          const studentId = new mongoDB.ObjectId(req.userId);
          const studentData = await student.updateOne(
            { _id: studentId },
            { $push: { batch: args.updateId } }
          );
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
        return {
          msg: "student registered",
        };
      } else {
        return {
          msg: "please login !!",
        };
      }
    },
  },

  Batch: {
    student: async (parent) => {
      const ids = parent.student;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await student.findOne({ _id: id });

            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },

    course: async (parent) => {
      const ids = parent.course;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await course.findOne({ _id: id });

          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
  },

  BatchUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Batch";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
