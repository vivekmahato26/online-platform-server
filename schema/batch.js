module.exports = {
  root: ` 
          type Batch {
              _id: String
              name:String
              course : Course
              student : [Student]
              createdAt : String
              updatedAt : String
  
          }
          
          input BatchInput {
              name:String
              course: String
              student: [String]

          }
  
          input BatchUpdate {
              id:String
              name:String
              course: String
              student: [String]


          }
          union BatchUnion = Batch | err
  
      `,
  query: `
          type Query {
              batchs: [Batch]
              batch(_id:String): BatchUnion
              
          }`,
  mutation: `
          type Mutation {
              registerStudent(updateId:String): GraphqlUnion
              addBatch(input:BatchInput): GraphqlUnion
              updateBatch(updateID:String,update:BatchUpdate): GraphqlUnion
              deleteBatch(batchID:String): GraphqlUnion
          }`,
};
