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
        }
        msg
        failed
        code
        location
        input
    }
}
`;

const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`);
const BaseDeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation);

export const DeleteAsyncAction = (...args) => {
    console.log("VOLÁ SE TOPIC DeleteAsyncAction", args);
    return BaseDeleteAsyncAction(...args);
};