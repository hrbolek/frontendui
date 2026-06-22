import { DeleteItemURI, ListURI, MediumContent } from "../Components";
import { DeleteAsyncAction } from "../Queries";
import {
    DeleteBody as BaseDeleteBody,
    DeleteButton as BaseDeleteButton,
    DeleteDialog as BaseDeleteDialog,
    DeleteLink as BaseDeleteLink
} from "../../../../_template/src/Base/Mutations/Delete";

const DefaultContent = MediumContent;
const MutationAsyncAction = DeleteAsyncAction;

const permissions = {
    oneOfRoles: ["studijní administrátor", "garant předmětu", "garant programu"],
    mode: "absolute",
};

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
