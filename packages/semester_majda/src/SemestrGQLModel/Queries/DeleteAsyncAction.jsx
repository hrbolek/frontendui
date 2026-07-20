import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

/**
 * GraphQL mutace pro odstranění tématu semestru.
 *
 * Mutace přijímá identifikátor tématu a hodnotu `lastchange`.
 * Hodnota poslední změny slouží ke kontrole, zda téma nebylo
 * od jeho načtení upraveno jiným uživatelem.
 *
 * Odpověď obsahuje odstraněnou entitu a stavové údaje mutace,
 * například informaci o úspěchu, chybový kód nebo zprávu.
 */
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

/**
 * GraphQL dotaz připravený pro vytvoření asynchronní akce.
 */
const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`);

/**
 * Asynchronní akce provádějící odstranění topicu.
 *
 * Akce je používána komponentou pro odstranění tématu
 * a zajišťuje odeslání mutace na GraphQL endpoint.
 *
 * @type {Function}
 */
export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation);