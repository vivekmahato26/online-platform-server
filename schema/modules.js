const typeDefs = {
  root: `
          type Modules {
            _id:String
            title:String
            Section: [Section]
            course : Course
            createdAt : String
            updatedAt : String
  
          }
          input ModulesInput{
            title:String
            Section: [String]
            course : String
          }
          input ModulesUpdate{
            title:String
            Section: [String]
            course : String

          }
          union ModuleUnion  = Modules | err
      `,

  query: `
          type Query {
              modules : [Modules]
              module(_id :String,createdAt:String):ModuleUnion
          }
      `,
  mutation: `
          type Mutation {
              addModules (input : ModulesInput):GraphqlUnion
              updateModules(updateID:String!,update:ModulesUpdate):GraphqlUnion
              deleteModules(updateID: String!):GraphqlUnion

          }
      `,
};

module.exports = typeDefs;
