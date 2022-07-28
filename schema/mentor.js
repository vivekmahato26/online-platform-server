const typeDefs = {
  root: `
        type GeneralDetails{
            name :String
            email :String
            phone : String
            Qualification : String
            Experience : String
            CourseAllocated : String
            address : Address
        }
    
        type Mentor {
            _id:String
            name:String
            tickets : [Tickets]
            chats : [ChatLogs]
            course : Course
            batch : Batch
            MentorDetails : [GeneralDetails]
            createdAt : String
            updatedAt : String           
        }

        input GeneralDetailsInput{
            name :String
            email :String
            phone : String
            Qualification : String
            Experience : String
            CourseAllocated : String
            address : String
        }

        input MentorInput {
            name:String
            tickets : String
            chats : String
            course : String
            batch : String
            MentorDetails : [GeneralDetailsInput]
        }
        input MentorUpdate{
            tickets : String
            chats : String
            course : String
            batch : String
            MentorDetails : [GeneralDetailsInput]           
        }
        union MentorUnion = Mentor | err

    `,
  query: `
        type Query {
            mentors:[Mentor]
            mentor(_id:String,createdAt:String):MentorUnion
        }
    `,
  mutation: `
        type Mutation {
            addMentor (input : MentorInput):GraphqlUnion
            updateMentor(updateID :String,update : MentorUpdate) : GraphqlUnion
            deleteMentor(mentorID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
