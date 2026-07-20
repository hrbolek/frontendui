import { CreateURI, MediumEditableContent, ReadItemURI } from "../Components";
import { InsertAsyncAction } from "../Queries";

import {
    CreateBody as BaseCreateBody,
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
    CreateLink as BaseCreateLink
} from "../../../../_template/src/Base/Mutations/Create";

/**
 * Výchozí formulářový obsah používaný při vytváření semestru.
 */
const DefaultContent = (props) => <MediumEditableContent {...props} />;

/**
 * GraphQL async action používaná pro vložení nového semestru.
 */
const MutationAsyncAction = InsertAsyncAction;

/**
 * Role oprávněné vytvořit nový semestr.
 */
const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

/**
 * Výchozí hodnoty nově vytvářeného semestru.
 *
 * Hodnoty se použijí, pokud nadřazená komponenta nepředá
 * vlastní objekt prostřednictvím vlastnosti `item`.
 */
const defaultitem = {
    order: 1,
    credits: 0,
    mandatory: false,
};

/**
 * Odkaz na samostatnou stránku pro vytvoření semestru.
 *
 * Komponenta obaluje `BaseCreateLink`, nastavuje výchozí URI
 * vytvářecí stránky a aplikuje kontrolu přístupových oprávnění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.uriPattern=CreateURI] URI stránky pro vytvoření semestru.
 * @returns {JSX.Element} Odkaz na stránku pro vytvoření semestru.
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
 * Tlačítko otevírající dialog pro vytvoření nového semestru.
 *
 * Komponenta předává základnímu tlačítku výchozí formulář,
 * dialog, vstupní hodnoty, GraphQL async action a URI detailu,
 * na který lze po úspěšném vytvoření přejít.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci vložení.
 * @param {React.ComponentType<Object>} [props.CreateDialog=CreateDialog]
 *   Dialog použitý pro vytvoření semestru.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu nově vytvořeného semestru.
 * @param {Object} [props.rbacitem] Objekt použitý při kontrole oprávnění.
 * @param {Object} [props.item=defaultitem] Výchozí hodnoty nového semestru.
 * @returns {JSX.Element} Tlačítko pro vytvoření semestru.
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
 * Dialog obsahující formulář pro vytvoření nového semestru.
 *
 * Používá výchozí hodnoty semestru a po úspěšném vytvoření
 * umožňuje přejít na jeho detail.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.title="Nový semestr"] Nadpis dialogu.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu vytvořeného semestru.
 * @param {Object} [props.item=defaultitem] Výchozí hodnoty formuláře.
 * @returns {JSX.Element} Dialog pro vytvoření semestru.
 */
export const CreateDialog = ({
    title = "Nový semestr",
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
 * Obsah samostatné stránky pro vytvoření semestru.
 *
 * Komponenta obaluje `BaseCreateBody`, vykresluje formulář
 * a zajišťuje provedení GraphQL mutace pro vložení semestru.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci vložení.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta obsahující formulářová pole.
 * @param {string} [props.readItemURI=ReadItemURI]
 *   URI detailu vytvořeného semestru.
 * @returns {JSX.Element} Obsah stránky pro vytvoření semestru.
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
            {...permissions}
        />
    );
};