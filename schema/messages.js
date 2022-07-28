const typeDefs = {
  root: `
        type Messages {
            _id:String
            receiverId : String
            senderId : String
            emoji : String
            chatLogs : ChatLogs
            Message : [String]
            createdAt : String
            updatedAt : String
        }
        input MessageInput{
            emoji : String
            Message : [String]
            chatLogs : String
            createdAt : String
            updatedAt : String
            receiverId: String
        }
        input MessageUpdate {
            emoji : String
            Message : [String]
            createdAt : String
            chatLogs : String
            updatedAt : String
            receiverId: String

        }
        
        union MessageUnion = Messages | err
    `,
  query: `
        type Query {
            messages:[Messages]
            message(_id : String,createdAt:String):MessageUnion
        }
    `,
  mutation: `
        type Mutation {
            addMessage(input : MessageInput):GraphqlUnion
            updateMessage(updateID: String!,update:MessageUpdate):GraphqlUnion
            deleteMessage(messageID : String!):GraphqlUnion
        }
    `,
};
module.exports = typeDefs;
