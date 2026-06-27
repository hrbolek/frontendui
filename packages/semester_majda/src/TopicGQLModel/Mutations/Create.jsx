import { CreateURI, MediumEditableContent, ReadItemURI } from "../Components";
import { InsertAsyncAction } from "../Queries";
import {
    CreateBody as BaseCreateBody,
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
    CreateLink as BaseCreateLink
} from "../../../../_template/src/Base/Mutations/Create";

const DefaultContent = (props) => <MediumEditableContent {...props} />;
const MutationAsyncAction = InsertAsyncAction;

const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

const defaultitem = {
    name: "Nové téma",
    nameEn: "",
    description: "",
    order: 1,
};

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