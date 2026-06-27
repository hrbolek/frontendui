import {
    UpdateBody as BaseUpdateBody,
    UpdateButton as BaseUpdateButton,
    UpdateDialog as BaseUpdateDialog,
    UpdateLink as BaseUpdateLink
} from "../../../../_template/src/Base/Mutations/Update";

import { MediumEditableContent, UpdateItemURI } from "../Components";
import { UpdateAsyncAction } from "../Queries";

const DefaultContent = (props) => <MediumEditableContent {...props} />
const mutationAsyncAction = UpdateAsyncAction

const permissions = {
    oneOfRoles: ["superadmin"],
    mode: "absolute",
}

// ALTERNATIVE, CHECK GQLENDPOINT
// const permissions = {
//     oneOfRoles: ["administrátor", "personalista"],
//     mode: "item",
// }

/**
 * Link na update stránku / update route pro konkrétní entitu.
 *
 * Wrapper nad `BaseUpdateLink`. Nastavuje výchozí `uriPattern` a aplikuje RBAC
 * přes `permissions`. Vše ostatní přeposílá do Base komponenty.
 *
 * @param {Object} params
 * @param {string} [params.uriPattern=UpdateItemURI]
 *   URI pattern pro update route (typicky obsahuje `:id` nebo je již konkrétní URL dle routování).
 * @param {Object} params.props
 *   Další props přeposílané do `BaseUpdateLink` (např. `children`, `className`,
 *   `preserveSearch`, `preserveHash`, atd.).
 * @returns {JSX.Element}
 */
export const UpdateLink = ({
    uriPattern = UpdateItemURI,
    ...props
}) => {
    return <BaseUpdateLink
        {...props}
        uriPattern={uriPattern}
        {...permissions}
    />
}

/**
 * Dialog pro editaci entity.
 *
 * Wrapper nad `BaseUpdateDialog`. Dodává výchozí editovatelný obsah (`DefaultContent`)
 * a výchozí mutační akci (`mutationAsyncAction`) pro uložení změn. Aplikuje RBAC
 * přes `permissions`.
 *
 * @param {Object} params
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta, která vykreslí editovatelný obsah dialogu (typicky MediumEditableContent).
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action (thunk) pro uložení změn (např. UpdateAsyncAction). Použije se podle Base/General implementace.
 * @param {Object} params.props
 *   Další props přeposílané do `BaseUpdateDialog` (např. `title`, `oklabel`, `cancellabel`,
 *   `item`, `onOk`, `onCancel`, atd.).
 * @returns {JSX.Element}
 */
export const UpdateDialog = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateDialog
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};

/**
 * Tlačítko, které otevře update dialog a provede uložení.
 *
 * Wrapper nad `BaseUpdateButton`. Dodává výchozí `DefaultContent`, výchozí `Dialog`,
 * a výchozí `mutationAsyncAction`. Aplikuje RBAC přes `permissions`.
 *
 * @param {Object} params
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta editovatelného obsahu (typicky MediumEditableContent).
 * @param {React.ComponentType<Object>} [params.Dialog=UpdateDialog]
 *   Dialog komponenta použitá pro editaci (volá `onOk(draft)` / `onCancel()`).
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action (thunk) pro uložení změn (např. UpdateAsyncAction).
 * @param {Object} params.props
 *   Další props přeposílané do `BaseUpdateButton` (např. `children`, `className`, `title`,
 *   `item`, `uriPattern`, `onOk`, `onCancel`, atd.).
 * @returns {JSX.Element}
 */
export const UpdateButton = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    Dialog = UpdateDialog,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateButton
            {...props}
            DefaultContent={DefaultContent_}
            Dialog={Dialog}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};

/**
 * “Page-level” update workflow (inline edit / celá stránka editace).
 *
 * Wrapper nad `BaseUpdateBody`. Typicky vykreslí editovatelný obsah (`DefaultContent`)
 * a zajistí uložení přes `mutationAsyncAction` (dle Base/General implementace).
 * Aplikuje RBAC přes `permissions`.
 *
 * @param {Object} params
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta editovatelného obsahu (typicky MediumEditableContent).
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action (thunk) pro uložení změn (např. UpdateAsyncAction).
 * @param {Object} params.props
 *   Další props přeposílané do `BaseUpdateBody` (např. `title`, `oklabel`, `cancellabel`,
 *   `item`, `onOk`, `onCancel`, `className`, atd.).
 * @returns {JSX.Element}
 */
export const UpdateBody = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateBody
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};