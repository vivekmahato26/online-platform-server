const typeDefs = {
  root: `
        type Completed {
            code : String
            submission : String
            createdAt : String
            updatedAt : String
        }
        type ProgressData{
            score : Int
            assignmentsCompleted : [Completed]
            projectsCompleted : [Completed]
            challengesCompleted : [Completed]
            completed : Boolean
            percentage : Int
            currentState : String
            currentModule : String
        }
        type Progress{
            _id:String
            batchId  : String
            progressData : [ProgressData]
            createdAt : String
            updatedAt : String
            mileStones : String
        }

        input CompletedInput {
            code : String
            submission : String
        }
        input ProgressDataInput{
            score : Int
            assignmentsCompleted : [CompletedInput]
            projectsCompleted : [CompletedInput]
            challengesCompleted : [CompletedInput]
            completed : Boolean
            percentage : Int
            currentState : String
            currentModule : String
    
        }
        input ProgressInput{
            progressData : [ProgressDataInput]
        }
        input ProgressUpdate{
            progressData : [ProgressDataInput]

        }
        union ProgressUnion = Progress | err
    `,

  query: `
        type Query {
            progress : [Progress]
            progresses (_id:String,createdAt:String):ProgressUnion
        }
    `,

  mutation: `
        type Mutation {
            addProgress(input : ProgressInput) : GraphqlUnion
            updateProgress(updateId : String! , update : ProgressUpdate) : GraphqlUnion
            deleteProgress(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
