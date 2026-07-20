import { CreateURI, MediumEditableContent, ReadItemURI } from "../Components";
import { InsertAsyncAction } from "../Queries";

import {
    CreateBody as BaseCreateBody,
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
    CreateLink as BaseCreateLink
} from "../../../../_template/src/Base/Mutations/Create";

/**
 * Výchozí formulářový obsah používaný při vytváření tématu.
 */
const DefaultContent = (props) => <MediumEditableContent {...props} />;

/**
 * GraphQL async action používaná pro vložení nového tématu.
 */
const MutationAsyncAction = InsertAsyncAction;

/**
 * Role oprávněné vytvořit nové téma semestru.
 */
const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

/**
 * Výchozí hodnoty nově vytvářeného tématu.
 *
 * Identifikátor semestru se předává z nadřazené komponenty,
 * která tlačítko pro vytvoření tématu vykresluje.
 */
const defaultitem = {
    name: "Nové téma",
    nameEn: "",
    description: "",
    order: 1,
};

/**
 * Odkaz na samostatnou stránku pro vytvoření tématu.
 *
 * Komponenta obaluje `BaseCreateLink`, nastavuje výchozí URI
 * a aplikuje kontrolu přístupových oprávnění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.uriPattern=CreateURI]
 *   URI stránky pro vytvoření tématu.
 * @returns {JSX.Element} Odkaz na stránku pro vytvoření tématu.
 */
export const CreateLink = ({
    uriPattern = CreateURI,
    ...props
}) => (
    <BaseCreateLink
        {...props}
        uriPattern={uriPattern}
        {...permissions}
    />
);

/**
 * Tlačítko otevírající dialog pro vytvoření nového tématu.
 *
 * Nadřazená komponenta může prostřednictvím vlastnosti `item`
 * předat výchozí hodnoty tématu, zejména `semesterId` a pořadí
 * nového tématu.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci vložení.
 * @param {React.ComponentType<Object>} [props.CreateDialog=CreateDialog]
 *   Dialog použitý pro vytvoření tématu.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole tématu.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu vytvořeného tématu.
 * @param {Object} [props.rbacitem]
 *   Objekt použitý pro kontrolu oprávnění.
 * @param {Object} [props.item=defaultitem]
 *   Výchozí data nově vytvářeného tématu.
 * @returns {JSX.Element} Tlačítko pro vytvoření tématu.
 */
export const CreateButton = ({
    mutationAsyncAction = MutationAsyncAction,
    CreateDialog: CreateDialog_ = CreateDialog,
    DefaultContent: defaultContent = DefaultContent,
    readItemURI = ReadItemURI,
    rbacitem,
    item = defaultitem,
    ...props
}) => {
    return (
        <BaseCreateButton
            {...props}
            DefaultContent={defaultContent}
            CreateDialog={CreateDialog_}
            readItemURI={readItemURI}
            rbacitem={rbacitem}
            item={item}
            mutationAsyncAction={mutationAsyncAction}
            {...permissions}
        />
    );
};

/**
 * Dialog obsahující formulář pro vytvoření nového tématu.
 *
 * Dialog používá předaná nebo výchozí data tématu a po
 * úspěšném vytvoření umožňuje přejít na jeho detail.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.title="Nové téma"] Nadpis dialogu.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole tématu.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu vytvořeného tématu.
 * @param {Object} [props.item=defaultitem]
 *   Výchozí data nového tématu.
 * @returns {JSX.Element} Dialog pro vytvoření tématu.
 */
export const CreateDialog = ({
    title = "Nové téma",
    DefaultContent: defaultContent = DefaultContent,
    readItemURI = ReadItemURI,
    item = defaultitem,
    ...props
}) => {
    return (
        <BaseCreateDialog
            {...props}
            title={title}
            DefaultContent={defaultContent}
            readItemURI={readItemURI}
            item={item}
        />
    );
};

/**
 * Obsah samostatné stránky pro vytvoření tématu.
 *
 * Komponenta obaluje `BaseCreateBody`, vykresluje formulář
 * a zajišťuje provedení GraphQL mutace pro vložení tématu.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci vložení.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole tématu.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu vytvořeného tématu.
 * @returns {JSX.Element} Obsah stránky pro vytvoření tématu.
 */
export const CreateBody = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: defaultContent = DefaultContent,
    readItemURI = ReadItemURI,
    ...props
}) => {
    return (
        <BaseCreateBody
            {...props}
            DefaultContent={defaultContent}
            readItemURI={readItemURI}
            mutationAsyncAction={mutationAsyncAction}
        />
    );
};