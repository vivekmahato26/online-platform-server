const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri = "mongodb://0.0.0.0:27017";

const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);


const database = client.db("online-platform");


const address = database.collection("address");
const user = database.collection("users");
const batch = database.collection("batch");
const challange = database.collection("challange");
const chatLogs = database.collection("chatLogs");
const company = database.collection("company");
const coupon = database.collection("coupon");
const job = database.collection("job");
const jobApplications = database.collection("jobApplications");
const mentor = database.collection("mentor");
const messages = database.collection("messages");
const Module = database.collection("module");
const course = database.collection("course");
const order = database.collection("order");
const payment = database.collection("payment");
const progress = database.collection("progress");
const resume = database.collection("resume");
const section = database.collection("section");
const sectionTitle = database.collection("sectionTitle");
const student = database.collection("student");
const subscription = database.collection("subscription");
const tickets = database.collection("tickets");
const invoice = database.collection("invoice");
const registerStudent = database.collection("registerStudent");

exports.client = client;
exports.address = address;
exports.database = database;
exports.user = user;
exports.batch = batch;
exports.challange = challange;
exports.chatLogs = chatLogs;
exports.company = company;
exports.coupon = coupon;
exports.job = job;
exports.jobApplications = jobApplications;
exports.mentor = mentor;
exports.Module = Module;
exports.course = course;
exports.order = order;
exports.progress = progress;
exports.resume = resume;
exports.section = section;
exports.sectionTitle = sectionTitle;
exports.student = student;
exports.subscription = subscription;
exports.messages = messages;
exports.payment = payment;
exports.tickets = tickets;
exports.invoice = invoice;
exports.registerStudent = registerStudent;

