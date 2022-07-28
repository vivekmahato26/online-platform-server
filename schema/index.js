const { gql } = require("apollo-server-express");

const student = require("./student");
const mentor = require("./mentor");
const course = require("./course");
const subscription = require("./subscription");
const payment = require("./payment");
const order = require("./order");
const section = require("./section");
const batch = require("./batch");
const challange = require("./challange");
const coupon = require("./coupon");
const messages = require("./messages");
const invoice = require("./invoice");
const addressSchema = require("./address");
const ticketSchema = require("./tickets");
const chatLogsResolver = require("./chatLogs");
const JobSchema = require("./jobApplications");
const companySchema = require("./company");
const jobSchema = require("./job");
const userSchema = require("./userSchema");
const resumeSchema = require("./resume");
const progressSchema = require("./progress");
const moduleSchema = require("./modules");
const sectionTitleSchema = require("./sectionTitle");
const registerStudentSchema = require("./registerStudent");

module.exports = gql`
  ${student.root}
  ${course.root}
  ${subscription.root}
  ${payment.root}
  ${order.root}
  ${section.root}
  ${batch.root}
  ${challange.root}
  ${coupon.root}
  ${addressSchema.root}
  ${ticketSchema.root}
  ${chatLogsResolver.root}
  ${JobSchema.root}
  ${companySchema.root}
  ${jobSchema.root}
  ${userSchema.root}
  ${resumeSchema.root}
  ${progressSchema.root}
  ${messages.root}
  ${sectionTitleSchema.root}
  ${moduleSchema.root}
  ${mentor.root}
  ${invoice.root}
  ${registerStudentSchema.root}

  ${student.query}
  ${messages.query}
  ${course.query}
  ${subscription.query}
  ${payment.query}
  ${order.query}
  ${section.query}
  ${batch.query}
  ${challange.query}
  ${coupon.query}
  ${addressSchema.query}
  ${ticketSchema.query}
  ${chatLogsResolver.query}
  ${JobSchema.query}
  ${companySchema.query}
  ${jobSchema.query}
  ${userSchema.query}
  ${resumeSchema.query}
  ${progressSchema.query}
  ${sectionTitleSchema.query}
  ${moduleSchema.query}
  ${mentor.query}
  ${invoice.query}
  ${registerStudentSchema.query}

  ${student.mutation}
  ${messages.mutation}
  ${course.mutation}
  ${subscription.mutation}
  ${payment.mutation}
  ${order.mutation}
  ${section.mutation}
  ${batch.mutation}
  ${challange.mutation}
  ${coupon.mutation}
  ${addressSchema.mutation}
  ${ticketSchema.mutation}
  ${chatLogsResolver.mutation}
  ${JobSchema.mutation}
  ${companySchema.mutation}
  ${jobSchema.mutation}
  ${userSchema.mutation}
  ${resumeSchema.mutation}
  ${progressSchema.mutation}
  ${sectionTitleSchema.mutation}
  ${moduleSchema.mutation}
  ${mentor.mutation}
  ${invoice.mutation}
  ${registerStudentSchema.mutation}

  union GraphqlUnion = res | err

  type res {
    msg: String
  }
  type err {
    err: String
  }
`;
