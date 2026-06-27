import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { LargeFragment } from "./Fragments"
import { reduceToFirstEntity } from "../../../../dynamic/src/Store"

const SearchQueryStr = `
query SearchQuery($skip: Int, $limit: Int, $pattern: String) {
  result: userPage(skip: $skip, limit: $limit, where: {email: {_ilike: $pattern}}) {
    ...Large
  }
}
`


export const SearchAsyncActionQuery = createQueryStrLazy(`${SearchQueryStr}`, LargeFragment)
export const SearchAsyncAction = createAsyncGraphQLAction2(SearchAsyncActionQuery)