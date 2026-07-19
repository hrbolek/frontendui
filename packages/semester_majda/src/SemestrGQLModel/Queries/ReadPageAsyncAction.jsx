import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LinkFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const ReadPageQueryStr = `
query semesterPage(
    $skip: Int,
    $limit: Int,
    $orderby: String,
    $where: SemesterInputFilter
) {
    semesterPage(
        skip: $skip,
        limit: $limit,
        orderby: $orderby,
        where: $where
    ) {
        ...Link
    }
}
`;

const ReadPageQuery = createQueryStrLazy(
    ReadPageQueryStr,
    LinkFragment
);

export const ReadPageAsyncAction =
    createAsyncGraphQLAction2(ReadPageQuery);