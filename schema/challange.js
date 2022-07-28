module.exports = {
  root: ` 
        type Challange {
            _id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            createdAt : String
            updatedAt : String
        }
        
        input ChallangeInput {
            id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            student: [String]
        }

        input ChallangeUpdate {
            id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            student: [String]
        }
        union ChallangeUnion = Challange | err
    `,
  query: `
            type Query {
                challanges: [Challange]
                challange(_id:String,createdAt:String): ChallangeUnion          
        }`,
  mutation: `
            type Mutation {
                addChallange(input:ChallangeInput): GraphqlUnion
                updateChallange(updateID:String,update:ChallangeUpdate): GraphqlUnion
                deleteChallange(challangeID: String!):GraphqlUnion

            }`,
};
