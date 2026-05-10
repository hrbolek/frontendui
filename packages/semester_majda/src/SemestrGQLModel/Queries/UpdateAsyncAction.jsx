import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation semesterUpdate(
	$id: UUID! # null, 
	$lastchange: DateTime! # null, 
	$order: Int,
  $mandatory: Boolean,
  $credits: Int,
  $classificationtypeId: UUID,
  $subjectId: UUID
) {
  semesterUpdate(
	semester: {
	id: $id, 
	lastchange: $lastchange, 
	order: $order,
  mandatory: $mandatory,
  credits: $credits,
  classificationtypeId: $classificationtypeId,
  subjectId: $subjectId}
  ) {
    ... on SemesterGQLModel { ...Large }
    ... on SemesterGQLModelUpdateError { ...Error }
  }
}

fragment Error on SemesterGQLModelUpdateError {
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
`

const UpdateMutation = createQueryStrLazy(`${UpdateMutationStr}`, LargeFragment)
export const UpdateAsyncAction = createAsyncGraphQLAction2(UpdateMutation, 
    updateItemsFromGraphQLResult, reduceToFirstEntity)