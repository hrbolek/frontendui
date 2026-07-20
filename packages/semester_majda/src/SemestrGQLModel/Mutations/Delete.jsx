import { DeleteItemURI, ListURI, MediumContent } from "../Components";
import { DeleteAsyncAction } from "../Queries";

import {
    DeleteBody as BaseDeleteBody,
    DeleteButton as BaseDeleteButton,
    DeleteDialog as BaseDeleteDialog,
    DeleteLink as BaseDeleteLink
} from "../../../../_template/src/Base/Mutations/Delete";

/**
 * Výchozí komponenta zobrazující informace o semestru,
 * který má být odstraněn.
 */
const DefaultContent = MediumContent;

/**
 * GraphQL async action používaná pro odstranění semestru.
 */
const MutationAsyncAction = DeleteAsyncAction;

/**
 * Role oprávněné odstranit semestr.
 */
const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

/**
 * Odkaz na samostatnou stránku pro odstranění semestru.
 *
 * Komponenta obaluje `BaseDeleteLink`, nastavuje výchozí URI
 * a aplikuje kontrolu přístupových oprávnění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.uriPattern=DeleteItemURI]
 *   URI stránky pro odstranění konkrétního semestru.
 * @returns {JSX.Element} Odkaz na stránku pro odstranění semestru.
 */
export const DeleteLink = ({
    uriPattern = DeleteItemURI,
    ...props
}) => {
    return (
        <BaseDeleteLink
            {...props}
            uriPattern={uriPattern}
            {...permissions}
        />
    );
};

/**
 * Tlačítko otevírající potvrzovací dialog pro odstranění semestru.
 *
 * Komponenta předává základnímu tlačítku obsah dialogu,
 * GraphQL async action, adresu seznamu semestrů a callback,
 * který se zavolá po potvrzení operace.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný semestr.
 * @param {React.ComponentType<Object>} [props.Dialog=DeleteDialog]
 *   Potvrzovací dialog použitý před odstraněním.
 * @param {string} [props.vectorItemsURI=ListURI]
 *   URI seznamu semestrů.
 * @param {Function} [props.onOk]
 *   Callback volaný po potvrzení odstranění.
 * @returns {JSX.Element} Tlačítko pro odstranění semestru.
 */
export const DeleteButton = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    Dialog = DeleteDialog,
    vectorItemsURI = ListURI,
    onOk,
    ...props
}) => {
    return (
        <BaseDeleteButton
            {...props}
            DefaultContent={DefaultContent_}
            Dialog={Dialog}
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            onOk={onOk}
            {...permissions}
        />
    );
};

/**
 * Potvrzovací dialog pro odstranění semestru.
 *
 * Dialog zobrazuje informace o odstraňovaném semestru
 * a po potvrzení spustí příslušnou GraphQL async action.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný semestr.
 * @param {string} [props.vectorItemsURI=ListURI]
 *   URI seznamu semestrů.
 * @returns {JSX.Element} Potvrzovací dialog pro odstranění semestru.
 */
export const DeleteDialog = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    vectorItemsURI = ListURI,
    ...props
}) => {
    return (
        <BaseDeleteDialog
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            {...permissions}
        />
    );
};

/**
 * Obsah samostatné stránky pro odstranění semestru.
 *
 * Komponenta obaluje `BaseDeleteBody`, zobrazí údaje
 * odstraňovaného semestru a zajistí provedení GraphQL mutace.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný semestr.
 * @param {string} [props.vectorItemsURI=ListURI]
 *   URI seznamu semestrů.
 * @returns {JSX.Element} Obsah stránky pro odstranění semestru.
 */
export const DeleteBody = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    vectorItemsURI = ListURI,
    ...props
}) => {
    return (
        <BaseDeleteBody
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            {...permissions}
        />
    );
};