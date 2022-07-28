module.exports = {
  root: ` 
        type Subscription {
            _id: String
            startDate: String
            endDate: String
            invoiceId:String
            order(id: Int): Order
            payment(id: Int): Payment
            course(id: Int): Course
            student (id: Int): Student
            batches (id: Int): Batch
            createdAt : String
            updatedAt : String
        }
        
        input SubscriptionInput {
            id: String
            startDate: String
            endDate: String
            invoiceId:String
            order: String
            payment: String
            course: String
            batch: String
            student: String
        }

        input SubscriptionUpdate {
            id: String
            startDate: String
            endDate: String
            invoiceId:String
            order: String
            payment: String
            course: String
            batch: String
            student: String
        }
        union SubscriptionUnion = Subscription | err

        `,
  query: `
            type Query {
                subscriptions: [Subscription]
                subscription(_id:String,createdAt:String): SubscriptionUnion

            
        }`,
  mutation: `
            type Mutation {
                addSubscription(input:SubscriptionInput): GraphqlUnion
                updateSubscription(updateID:String,update:SubscriptionUpdate): GraphqlUnion
                deleteSubscription(subscriptionID: String!):GraphqlUnion

        }`,
};
