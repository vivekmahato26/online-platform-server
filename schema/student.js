module.exports = {
  root: ` 
        type Student {
            _id: String
            course: Course
            address: Address
            batch : Batch
            subscription: Subscription
            invoice : Invoice
            tickets: Tickets
            payments: Payment
            orders: Order
            jobApp: JobApp
            challanges: Challange
            createdAt: String
            updatedAt: String

        }
        
        input StudentInput {
            id: String
            address: String
            jobApp : String
            course:String
            subscription: String
            tickets: String
            payments: String
            challanges: String
            orders: String
            batch : String
            invoice : String

        }

        input StudentUpdate {
            id: String
            address: String
            jobApp : String
            course:String
            subscription: String
            tickets: String
            payments: String
            challanges: String
            orders: String
            batch : String
            invoice : String


        }
        union StudentUnion = Student | err
        `,
  query: `
            type Query {
                students: [Student]
                student(_id:String,createdAt:String):StudentUnion
                
        }`,
  mutation: `
            type Mutation {
                addStudent(input:StudentInput): GraphqlUnion
                updateStudent(updateID:String,update:StudentUpdate): GraphqlUnion
                deleteStudent(updateID: String!):GraphqlUnion
                
        }`,
};
