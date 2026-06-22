import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
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
`;

const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`);
export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation);