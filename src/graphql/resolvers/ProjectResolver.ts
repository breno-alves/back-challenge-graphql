import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';


import User from '../../models/User';
import Project from '../../models/Project';

@InputType()
class ProjectInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Int)
    user_id: number;
}

@Resolver()
export class ProjectResolver {
    @Mutation(() => Project)
    async createProject(@Arg('options', () => ProjectInput) options: ProjectInput) {
        const user = await User.findOne({ where: { id: options.user_id } });
        const dto = {
            name: options.name,
            email: options.email,
            user
        }
        const project = await Project.create(dto).save();
        return project;
    }

    @Query(() => [Project])
    project() {
        return Project.find();
    }
}