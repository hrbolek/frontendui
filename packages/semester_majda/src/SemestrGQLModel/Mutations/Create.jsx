import { CreateURI, MediumEditableContent, ReadItemURI } from "../Components"
import { InsertAsyncAction } from "../Queries"
import { 
    CreateBody as BaseCreateBody, 
    CreateButton as BaseCreateButton, 
    CreateDialog as BaseCreateDialog, 
    CreateLink  as BaseCreateLink
} from "../../../../_template/src/Base/Mutations/Create"

const DefaultContent = (props) => <MediumEditableContent {...props} />
const MutationAsyncAction = InsertAsyncAction

const permissions = {
    oneOfRoles: ["superadmin"],
    mode: "absolute",
}

const defaultitem = { name: "Nové téma", nameEn: " ",order: 1, description: " "};

/**
 * Wrapper nad `BaseCreateLink` (alias importu `CreateLink` z Base/Mutations/Create),
 * který je odvozený z obecných `General*` komponent.
 *
 * Účel wrapperu:
 * - nastaví výchozí `uriPattern` pro create route
 * - aplikuje výchozí RBAC nastavení přes `permissions` (např. `oneOfRoles`, `mode`)
 * - všechny ostatní props pouze přeposílá do Base komponenty
 * 
 * Vizuálně vyrenderuje link pro kliknutí
 *
 * @param {Object} params
 * @param {string} [params.uriPattern=CreateURI]
 *   Cílová URI/pattern pro link na create stránku nebo create akci (dle routování aplikace).
 *
 * @param {Object} params.props
 *   Další props přeposílané do `BaseCreateLink` (např. `children`, `className`,
 *   `preserveSearch`, `preserveHash`, atd.).
 *
 * @returns {JSX.Element} Vykreslí `BaseCreateLink` s přednastaveným `uriPattern` a RBAC oprávněními.
 */
export const CreateLink = ({
    uriPattern=CreateURI,
    ...props
}) => (
    <BaseCreateLink {...props} uriPattern={uriPattern} {...permissions} />
);

/**
 * Wrapper nad `BaseCreateButton` (alias importu `CreateButton` z Base/Mutations/Create),
 * který je odvozený z obecných `General*` komponent.
 *
 * Účel wrapperu:
 * - nastaví výchozí oprávnění (RBAC) přes `permissions` (`oneOfRoles`, `mode`)
 * - nastaví výchozí mutaci pro vytvoření entity (`mutationAsyncAction`)
 * - umožní vyměnit dialog a obsah formuláře (`CreateDialog`, `DefaultContent`)
 * - určí kam se má po úspěšném vytvoření navigovat (`readItemURI`)
 * - předá výchozí `item` pro nový záznam
 *
 * Zobrazí tlačítko a po jeho stisku otevře dialog, při volbě OK dochází k odeslání mutace na backend
 *
 * @param {Object} params
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro vytvoření entity (např. InsertAsyncAction). Používá ho Base/General logika.
 *
 * @param {React.ComponentType<Object>} [params.CreateDialog=CreateDialog]
 *   Komponenta dialogu použitá pro vytvoření (renderuje formulář a volá `onOk(draft)` / `onCancel()`).
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta, která vykreslí editable obsah formuláře (typicky MediumEditableContent).
 *
 * @param {string} [params.readItemURI=ReadItemURI]
 *   URI pattern pro navigaci na detail nově vytvořené entity (obvykle obsahuje `:id`).
 *
 * @param {Object} [params.rbacitem]
 *   RBAC item pro PermissionGate/Permission check (pokud se liší od entity, která se vytváří).
 *
 * @param {Object} [params.item=defaultitem]
 *   Výchozí objekt (draft) pro nový záznam. Posílá se do dialogu jako `item`.
 *
 * @param {Object} params.props
 *   Všechny další props jsou přeposlány přímo do `BaseCreateButton`
 *   (typicky `children`, `className`, `disabled`, `title`, atd.).
 *
 * @returns {JSX.Element} Vykreslí `BaseCreateButton` s přednastavenými defaulty a RBAC oprávněními.
 */
export const CreateButton = ({
    mutationAsyncAction=MutationAsyncAction,
    CreateDialog: CreateDialog_=CreateDialog,
    DefaultContent:defaultContent=DefaultContent,
    readItemURI=ReadItemURI, 
    rbacitem,
    item=defaultitem,
    ...props
}) => {
    return <BaseCreateButton 
        {...props}
        DefaultContent={defaultContent} 
        CreateDialog={CreateDialog_}
        readItemURI={readItemURI}
        rbacitem={rbacitem}
        item={item}
        mutationAsyncAction={mutationAsyncAction}
        {...permissions}
    />
}

/**
 * Wrapper nad `BaseCreateDialog` (alias importu `CreateDialog` z Base/Mutations/Create),
 * který je odvozený z obecných `General*` komponent.
 *
 * Účel wrapperu:
 * - nastaví výchozí title, obsah formuláře a výchozí draft (`item`)
 * - předá `readItemURI` pro případnou navigaci po vytvoření (dle implementace Base/General)
 * - umožní přepsat `mutationAsyncAction` (pokud BaseCreateDialog mutaci používá)
 *
 * Mutaci provadi až tlačítko (`BaseCreateButton`) Dialog jen zobrazuje a zabezpecuje sber dat
 * a dialog je jen “formulář”. 
 *
 * @param {Object} params
 * @param {string} [params.title="Nov(ý/é)"]
 *   Titulek dialogu.
 *
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro vytvoření entity. Použije se pouze pokud ho `BaseCreateDialog` skutečně volá
 *   (záleží na Base/General implementaci).
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta, která vykreslí editable obsah formuláře (typicky MediumEditableContent).
 *
 * @param {string} [params.readItemURI=ReadItemURI]
 *   URI pattern pro navigaci na detail nově vytvořené entity (obvykle obsahuje `:id`).
 *
 * @param {Object} [params.item=defaultitem]
 *   Výchozí objekt (draft) pro nový záznam. Posílá se do dialogu jako `item`.
 *
 * @param {Object} params.props
 *   Všechny další props jsou přeposlány přímo do `BaseCreateDialog`
 *   (typicky `oklabel`, `cancellabel`, `onOk`, `onCancel`, `className`, atd.).
 *
 * @returns {JSX.Element} Vykreslí `BaseCreateDialog` s přednastavenými defaulty.
 */
export const CreateDialog = ({
    title = "Nov(ý/é)",
    // mutationAsyncAction=MutationAsyncAction,
    DefaultContent:defaultContent=DefaultContent,
    readItemURI=ReadItemURI, 
    item=defaultitem,
    ...props
}) => {
    return <BaseCreateDialog 
        {...props} 
        title={title}
        DefaultContent={defaultContent} 
        readItemURI={readItemURI}
        item={item}
        // mutationAsyncAction={mutationAsyncAction}
    />
};

/**
 * Wrapper nad `BaseCreateBody` (alias importu `CreateBody` z Base/Mutations/Create),
 * který je odvozený z obecných `General*` komponent.
 *
 * `CreateBody` typicky reprezentuje “page-level” create workflow (ne jen tlačítko + modal):
 * - vykreslí create formulář pomocí `DefaultContent`
 * - zajistí uložení přes `mutationAsyncAction` (dle Base/General implementace)
 * - po úspěchu může navigovat na detail vytvořené entity přes `readItemURI` (pokud Base/General takto funguje)
 *
 * Wrapper pouze nastavuje defaulty a přeposílá props do `BaseCreateBody`.
 * 
 * Vizualizuje <DefaultContent />, sbira zmeny a umoznuje volani backendu pro ulozeni dat
 *
 * @param {Object} params
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro vytvoření entity (např. InsertAsyncAction). Používá ho Base/General logika.
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=DefaultContent]
 *   Komponenta, která vykreslí editable obsah formuláře (typicky MediumEditableContent).
 *
 * @param {string} [params.readItemURI=ReadItemURI]
 *   URI pattern pro navigaci na detail nově vytvořené entity (obvykle obsahuje `:id`).
 *
 * @param {Object} params.props
 *   Všechny další props jsou přeposlány přímo do `BaseCreateBody`
 *   (typicky `title`, `oklabel`, `cancellabel`, `onOk`, `onCancel`, `className`, atd.).
 *
 * @returns {JSX.Element} Vykreslí `BaseCreateBody` s přednastavenými defaulty.
 */
export const CreateBody = ({
    mutationAsyncAction=MutationAsyncAction,
    DefaultContent:defaultContent=DefaultContent,
    readItemURI=ReadItemURI, 
    ...props
}) => {
    return <BaseCreateBody 
        {...props} 
        DefaultContent={defaultContent} 
        readItemURI={readItemURI}
        mutationAsyncAction={mutationAsyncAction}
    />
};

