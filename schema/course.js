module.exports = {
  root: ` 
        type Desc {
            title: String
            subTitle: String
            desc: [String]
        }
        type Course {
            _id: String
            course_name: String
            uploadedAt: String
            batch: [Batch]
            section : [Section]
            challange : [Challange]
            totalVideos : String
            totalMilestones : String
            totalProjects : String
            createdAt : String
            updatedAt : String
            description: [Desc]
            totalHrs: Float
            objectives: [String]
            requirements: [String]
        }

        input DescInput {
            title: String
            subTitle: String
            desc: [String]
        }
        
        input CourseInput {
            course_name: String
            description: [DescInput]
            totalHrs: Float
            objectives: [String]
            requirements: [String]
        }

        input CourseUpdate {
            course_name: String
            description: [DescInput]
            totalHrs: Float
            objectives: [String]
            requirements: [String]
        }
        union CourseUnion = Course | err
    `,

  query: `
            type Query {
                courses: [Course]
                course(_id: String,createdAt:String): CourseUnion
            
        }`,
  mutation: `
            type Mutation {
                addCourse(input:CourseInput): GraphqlUnion
                updateCourse(updateID:String,update:CourseUpdate): GraphqlUnion
                deleteCourse(updateID: String!):GraphqlUnion

            }`,
};
