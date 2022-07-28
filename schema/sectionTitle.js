const typeDefs = {
  root: `
          type SectionTitle {
            _id:String
            title:String
            Section: Section
            module : Modules
            createdAt : String
            updatedAt : String
  
          }
          input SectionTitleInput{
            title:String
            Section: String
            module:String

          }
          input SectionTitleUpdate{
            title:String
            Section: String
            module:String

          }
          union SectionTitleUnion = SectionTitle | err
      `,

  query: `
          type Query {
              sectionTitles : [SectionTitle]
              sectionTitle(_id :String,createdAt:String):SectionTitleUnion
          }
      `,
  mutation: `
          type Mutation {
              addSectionTitle (input : SectionTitleInput):GraphqlUnion
              updateSectionTitle(updateID:String!,update:SectionTitleUpdate):GraphqlUnion
              deleteSectionTitle(sectiontitleID: String!):GraphqlUnion

          }
      `,
};

module.exports = typeDefs;
