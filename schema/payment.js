module.exports = {
  root: ` 
        type Payment {
            _id: String
            modeOfPay: String
            status: String
            amountCharged:String
            orderId: String
            details:String
            transactionId: String
            invoice : Invoice
            student : [Student]
            createdAt : String
            updatedAt : String
        }
        
        input PaymentInput {
            id: String
            modeOfPay: String
            status: String
            amountCharged:String
            orderId: String
            createdAt: String
            details:String
            transactionId: String
            student: [String]
            name: String
            contact: String
            custId: String
            invoice : String
        }

        input PaymentUpdate {
            id: String
            modeOfPay: String
            status: String
            amountCharged:String
            orderId: String
            createdAt: String
            details:String
            transactionId: String
            student: [String]
            invoice : String

        }
        union PaymentUnion = Payment | err
   `,
  query: `
            type Query {
                payments: [Payment]
                payment(id:String,createdAt:String): PaymentUnion

            
        }`,
  mutation: `
            type Mutation {
                addPayment(input:PaymentInput): GraphqlUnion
                updatePayment(updateID:String,update:PaymentUpdate): GraphqlUnion
        }`,
};
