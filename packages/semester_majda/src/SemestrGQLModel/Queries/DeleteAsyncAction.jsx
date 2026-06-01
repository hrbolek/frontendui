import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const DeleteMutationStr = `
mutation topicDelete(
    $id: UUID!,
    $lastchange: DateTime!
) {
    topicDelete(
        topic: {
            id: $id,
            lastchange: $lastchange
        }
    ) {
        __typename
        ... on TopicGQLModelDeleteError {
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
            msg
            code
            failed
            location
            input
        }
    }
}
`
const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`, LargeFragment)
export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation)