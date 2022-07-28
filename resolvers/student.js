const {
  client,
  student,
  subscription,
  tickets,
  jobApplications,
  batch,
  payment,
  challange,
  course,
  address,
  invoice,
  order,
  user,
} = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    students: async () => {
      try {
        const data = await student.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    student: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await student.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addStudent: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await student.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const userId = new mongoDB.ObjectId(req.userId);
          const data = await user.updateOne(
            { _id: userId },
            { $set: { student: result.insertedId.toString() } }
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
    updateStudent: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await student.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "student updated",
          };
        } catch (e) {
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
  },
  StudentUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Student";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Student: {
    address: async (parent) => {
      const ids = parent.address;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(ids);
            const data = await address.findOne({ _id: id });
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
      // for (const c of ids) {
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);

          const data = await course.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
          // }
        }
      }
      return res;
    },
    subscription: async (parent) => {
      const ids = parent.subscription;
      let res = [];
      if (ids) {
        // for (const c of ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await subscription.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
          // }
        }
      }
      return res;
    },
    tickets: async (parent) => {
      const ids = parent.tickets;
      let res = [];
      if (ids) {
        // for (const c of ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await tickets.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
          // }
        }
      }
      return res;
    },
    payments: async (parent) => {
      const ids = parent.payments;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await payment.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },

    orders: async (parent) => {
      const ids = parent.orders;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await order.findOne({ _id: id });

          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
    jobApp: async (parent) => {
      const jobAppIds = parent.jobApp;
      let res = [];
      if (jobAppIds) {
        // for (const c of jobAppIds) {
        try {
          const id = new mongoDB.ObjectId(jobAppIds);
          const data = await jobApplications.findOne({ _id: id });
          res = data;
        } catch (error) {
          return {
            err: JSON.stringify(error),
            // };
          };
        }
      }
      return res;
    },

    challanges: async (parent) => {
      console.log(1234);
      const ids = parent.challanges;
      let res = [];
      if (ids) {
        // for (const c of ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await challange.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
        // }
      }
      return res;
    },

    batch: async (parent) => {
      console.log(parent);
      const ids = parent.batch;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await batch.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },

    invoice: async (parent) => {
      const ids = parent.invoice;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await invoice.findOne({ _id: id });
            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },
  },
};

module.exports = resolvers;
