import {
    UpdateBody as BaseUpdateBody,
    UpdateButton as BaseUpdateButton,
    UpdateDialog as BaseUpdateDialog,
    UpdateLink as BaseUpdateLink
} from "../../../../_template/src/Base/Mutations/Update";

import { MediumEditableContent, UpdateItemURI } from "../Components";
import { UpdateAsyncAction } from "../Queries";

/**
 * Výchozí editovatelný obsah používaný ve všech variantách
 * aktualizace semestru.
 */
const DefaultContent = (props) => <MediumEditableContent {...props} />;

/**
 * GraphQL async action používaná pro uložení změn semestru.
 */
const mutationAsyncAction = UpdateAsyncAction

/**
 * Role oprávněné provádět aktualizaci semestru.
 *
 * Režim `absolute` ověřuje, zda má uživatel alespoň jednu
 * z uvedených rolí.
 */
const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
}

/**
 * Odkaz na editační stránku konkrétního semestru.
 *
 * Komponenta obaluje `BaseUpdateLink`, nastavuje výchozí URI
 * editační stránky a předává konfiguraci přístupových oprávnění.
 * Ostatní vlastnosti jsou předány základní komponentě.
 *
 * @component
 * @param {Object} params Vlastnosti komponenty.
 * @param {string} [params.uriPattern=UpdateItemURI]
 *   URI vzor editační stránky obsahující identifikátor entity.
 * @returns {JSX.Element} Odkaz na editační stránku semestru.
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
 * Dialog umožňující editaci semestru.
 *
 * Komponenta obaluje `BaseUpdateDialog` a předává mu výchozí
 * editovatelný obsah, GraphQL akci pro uložení změn a konfiguraci
 * přístupových oprávnění.
 *
 * @component
 * @param {Object} params Vlastnosti komponenty.
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta vykreslující editovatelný obsah dialogu.
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action provádějící GraphQL mutaci aktualizace.
 * @returns {JSX.Element} Dialog pro editaci semestru.
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
 * Tlačítko otevírající dialog pro editaci semestru.
 *
 * Komponenta obaluje `BaseUpdateButton` a nastavuje používaný
 * dialog, editovatelný obsah, GraphQL async action a oprávnění.
 *
 * @component
 * @param {Object} params Vlastnosti komponenty.
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta editovatelného obsahu.
 * @param {React.ComponentType<Object>} [params.Dialog=UpdateDialog]
 *   Dialog použitý pro editaci semestru.
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action provádějící GraphQL mutaci aktualizace.
 * @returns {JSX.Element} Tlačítko pro otevření editačního dialogu.
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
 * Obsah samostatné stránky pro editaci semestru.
 *
 * Komponenta obaluje `BaseUpdateBody`, vykresluje editovatelný
 * obsah a zajišťuje uložení změn pomocí příslušné GraphQL akce.
 * Přístup k editaci je omezen podle nakonfigurovaných rolí.
 *
 * @component
 * @param {Object} params Vlastnosti komponenty.
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta editovatelného obsahu stránky.
 * @param {Function} [params.mutationAsyncAction=mutationAsyncAction]
 *   Async action provádějící GraphQL mutaci aktualizace.
 * @returns {JSX.Element} Obsah stránky pro editaci semestru.
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