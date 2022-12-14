const studentResolver = require("./student");
const mentorResolver = require("./mentor");
const invoiceResolver = require("./invoice");
const courseResolver = require("./course");
const subscriptionResolver = require("./subscription");
const paymentResolver = require("./payment");
const orderResolver = require("./order");
const sectionResolver = require("./section");
const batchResolver = require("./batch");
const challangeResolver = require("./challange");
const couponResolver = require("./coupon");
const messageResolver = require("./messages");
const addressResolver = require("./addrress");
const TicketResolver = require("./tickets");
const ChatLogsResolver = require("./chatLogs");
const JobAppResolver = require("./jobApplications");
const companyResolver = require("./company");
const jobResolver = require("./job");
const resumeResolver = require("./resume");
const progressResolver = require("./progress");
const userResolver = require("./user");
const moduleResolver = require("./module");
const sectionTitleResolver = require("./sectionTitle");
const registerStudent = require("./resgisterStudent");

const rootResolver = {
  Query: {
    ...studentResolver.Query,
    ...messageResolver.Query,
    ...courseResolver.Query,
    ...subscriptionResolver.Query,
    ...paymentResolver.Query,
    ...orderResolver.Query,
    ...sectionResolver.Query,
    ...batchResolver.Query,
    ...challangeResolver.Query,
    ...couponResolver.Query,
    ...addressResolver.Query,
    ...TicketResolver.Query,
    ...ChatLogsResolver.Query,
    ...JobAppResolver.Query,
    ...companyResolver.Query,
    ...jobResolver.Query,
    ...resumeResolver.Query,
    ...progressResolver.Query,
    ...userResolver.Query,
    ...mentorResolver.Query,
    ...moduleResolver.Query,
    ...sectionTitleResolver.Query,
    ...invoiceResolver.Query,
    ...registerStudent.Query,
  },

  Mutation: {
    ...studentResolver.Mutation,
    ...messageResolver.Mutation,
    ...courseResolver.Mutation,
    ...subscriptionResolver.Mutation,
    ...paymentResolver.Mutation,
    ...orderResolver.Mutation,
    ...sectionResolver.Mutation,
    ...batchResolver.Mutation,
    ...challangeResolver.Mutation,
    ...couponResolver.Mutation,
    ...addressResolver.Mutation,
    ...TicketResolver.Mutation,
    ...ChatLogsResolver.Mutation,
    ...JobAppResolver.Mutation,
    ...companyResolver.Mutation,
    ...jobResolver.Mutation,
    ...resumeResolver.Mutation,
    ...progressResolver.Mutation,
    ...userResolver.Mutation,
    ...mentorResolver.Mutation,
    ...moduleResolver.Mutation,
    ...sectionTitleResolver.Mutation,
    ...invoiceResolver.Mutation,
    ...registerStudent.Mutation,
  },

  Student: studentResolver.Student,
  Subscription: subscriptionResolver.Subscription,
  SectionTitle: sectionTitleResolver.SectionTitle,
  Payment: paymentResolver.Payment,
  Order: orderResolver.Order,
  Batch: batchResolver.Batch,
  ChatLogs: ChatLogsResolver.ChatLogs,
  Tickets: TicketResolver.Tickets,
  JobApp: JobAppResolver.JobApp,
  Progress: progressResolver.Progress,
  User: userResolver.User,
  Mentor: mentorResolver.Mentor,
  Modules: moduleResolver.Modules,
  Invoice: invoiceResolver.Invoice,

  GraphqlUnion: {
    __resolveType(obj, context, info) {
      if (obj.msg) {
        return "res";
      }
      if (obj.err) {
        return "err";
      }
      return null;
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
  AddressUnion: addressResolver.AddressUnion,
  BatchUnion: batchResolver.BatchUnion,
  ChallangeUnion: challangeResolver.ChallangeUnion,
  ChatLogsUnion: ChatLogsResolver.ChatLogsUnion,
  CompanyUnion: companyResolver.CompanyUnion,
  CouponUnion: couponResolver.CouponUnion,
  CourseUnion: courseResolver.CourseUnion,
  JobUnion: jobResolver.JobUnion,
  JobAppUnion: JobAppResolver.JobAppUnion,
  MentorUnion: mentorResolver.MentorUnion,
  MessageUnion: messageResolver.MessageUnion,
  ModuleUnion: moduleResolver.ModuleUnion,
  OrderUnion: orderResolver.OrderUnion,
  PaymentUnion: paymentResolver.PaymentUnion,
  ProgressUnion: progressResolver.ProgressUnion,
  ResumeUnion: resumeResolver.ResumeUnion,
  SectionUnion: sectionResolver.SectionUnion,
  SectionTitleUnion: sectionTitleResolver.SectionTitleUnion,
  StudentUnion: studentResolver.StudentUnion,
  SubscriptionUnion: subscriptionResolver.SubscriptionUnion,
  TicketUnion: TicketResolver.TicketUnion,
  InvoiceUnion: invoiceResolver.InvoiceUnion,
};

module.exports = rootResolver;
