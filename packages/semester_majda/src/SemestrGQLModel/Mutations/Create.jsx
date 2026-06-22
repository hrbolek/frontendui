import { CreateURI, MediumEditableContent, ReadItemURI, TopicEditableContent } from "../Components";
import { InsertAsyncAction } from "../Queries";
import {
    CreateBody as BaseCreateBody,
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
    CreateLink as BaseCreateLink
} from "../../../../_template/src/Base/Mutations/Create";

const DefaultContent = (props) => <TopicEditableContent {...props} />;
const MutationAsyncAction = InsertAsyncAction;

const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

/**
 * Výchozí draft pro nové téma.
 * semesterId sem NEDÁVÁME napevno,
 * protože se má předávat z parent itemu (semestru) při použití CreateButton.
 */
const defaultitem = {
    name: "Nové téma",
    nameEn: "",
    order: 1,
    description: "",
};

/**
 * Link na create route.
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
 * Tlačítko pro vytvoření nové entity.
 *
 * DŮLEŽITÉ:
 * Pro topic je ideální předat item se semesterId z parent semestru:
 *
 * <CreateButton
 *   item={{ semesterId: semester.id, name: "Nové téma", nameEn: "", order: 1, description: "" }}
 *   rbacitem={semester}
 * >
 *   Vytvořit téma
 * </CreateButton>
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
 * Dialog pro vytvoření nové entity.
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
 * Page-level create workflow.
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
