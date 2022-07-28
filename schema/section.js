module.exports = {
  root: ` 
        type Section {
            _id: String
            video: String
            resource: String
            title:String
            description: String
            createdAt: String
            sectionTitle:SectionTitle
            updatedAt: String

        }
        
        input SectionInput {
            id: String
            video: String
            resource: String
            title:String
            description: String
            createdAt: String
            sectionTitle:String
            updatedAt: String

        }

        input SectionUpdate {
            id: String
            video: String
            resource: String
            title:String
            description: String
            createdAt: String
            sectionTitle:String
            updatedAt: String

        }
        union SectionUnion = Section | err

        `,
  query: `
            type Query {
                sections: [Section]
                section(_id:String,createdAt:String): SectionUnion

            
        }`,
  mutation: `
            type Mutation {
                addSection(input:SectionInput): GraphqlUnion
                updateSection(updateID:String,update:SectionUpdate): GraphqlUnion
                deleteSection(sectionID: String!):GraphqlUnion

        }`,
};
