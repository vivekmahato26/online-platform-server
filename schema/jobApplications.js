const typeDefs = {
  root: `
        type JobApp {
            _id:String
            studentId : String
            job : [Job]
            resume : String
            status : String
            createdAt : String
            updatedAt : String
            student : Student
        }
        input JobAppInput {
            student : String
            resume : String
            status : String
            job : [String]
        }
        input JobAppUpdate{
            student : String
            resume : String
            job : [String]
            status : String

        }
        union JobAppUnion = JobApp | err
    `,
  query: `
        type Query {
            jobapps :[JobApp]
            jobapp (_id : String,createdAt:String): JobAppUnion
        }
    `,
  mutation: `
        type Mutation {
            addJobApps(input : JobAppInput):GraphqlUnion
            updateJobApps (updateId : String! , update : JobAppUpdate) : GraphqlUnion
            deleteJobApps(jobAppID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
