const typeDefs = {
  root: `
  type User {
        _id :String
        userID : String
        firstName: String
        userName : String
        lastName: String
        phone: Float
        email: String!
        password: String
        student:Student
        employee: String
        mentor : Mentor
        gender : String
        address: Address
        dob: String
        createdAt : String
        updatedAt : String
        userType : String
        ticket : Tickets
      }

      type AuthData {
        email :String
        userID :String
        token: String
        tokenExpiration: String
        userType : String

      }
    
      input UserInput {
        address : String
        first_name: String
        last_name: String
        userName : String
        phone: Float
        gender : String
        email: String!
        password: String
        dob: String
        student:String
        mentor : String
        createdAt : String
        updatedAt : String
        userType : String
      }

      input UserUpdate {  
        address : String
        first_name: String  
        last_name: String
        userName : String
        phone: Float
        gender : String
        email: String!
        password: String
        dob: String
        mentor : String
        createdAt : String
        updatedAt : String
        userType : String
      }

      union UserUnion = User | err
    `,

  query: `type Query {
        Users: [User]
        login(email: String!, password: String!): AuthData!
        getUser: UserUnion
    }`,
  mutation: `type Mutation {
      createUser(input: UserInput): GraphqlUnion
      updateUser(updateID: String!,update:UserUpdate):GraphqlUnion
      }`,
};

module.exports = typeDefs;
