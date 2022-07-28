const typeDefs = {
  root: `
        type Job {
            _id:String
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
            createdAt : String
            updatedAt : String

        }
        input JobInput {
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
        }
        input JobUpdate {
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
        }
        union JobUnion = Job | err
    `,
  query: `
        type Query {
            jobs  : [Job]
            job(_id :String,createdAt : String) : JobUnion
        }
    `,
  mutation: `
        type Mutation{
            addJob (input : JobInput):GraphqlUnion
            updateJob (updateId:String!,update:JobUpdate):GraphqlUnion
            deleteJob(jobID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
