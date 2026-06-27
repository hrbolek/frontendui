import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import {
    reduceToFirstEntity,
    updateItemsFromGraphQLResult
} from "../../../../dynamic/src/Store";

const InsertMutationStr = `
mutation topicInsert(
    $semesterId: UUID!,
    $id: UUID,
    $name: String,
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
        ... on TopicGQLModel {
            ...Large
        }
        ... on TopicGQLModelInsertError {
            ...InsertError
        }
    }
}

fragment InsertError on TopicGQLModelInsertError {
    __typename
    Entity {
        ...Large
    }
    msg
    failed
    code
    location
    input
}
`;

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`, LargeFragment);

export const InsertAsyncAction = createAsyncGraphQLAction2(
    InsertMutation,
    updateItemsFromGraphQLResult,
    reduceToFirstEntity
);