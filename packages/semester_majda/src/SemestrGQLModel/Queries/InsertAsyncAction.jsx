import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const InsertMutationStr = `
mutation topicInsert(
    $semesterId: UUID!,
    $name: String!,
    $id: UUID,
    $nameEn: String,
    $order: Int,
    $description: String
) {
    topicInsert(
        topic: {
            semesterId: $semesterId,
            id: $id,
            name: $name,
            nameEn: $nameEn,
            order: $order,
            description: $description
        }
    ) {
        __typename

        ... on TopicGQLModel {
            __typename
            id
            lastchange
            semesterId
            name
            nameEn
            order
            description
        }

        ... on TopicGQLModelInsertError {
            __typename
            msg
            failed
            code
            location
            input
            Entity {
                __typename
                id
                lastchange
                semesterId
                name
                nameEn
                order
                description
            }
        }
    }
}
`;

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`);
export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation);
``