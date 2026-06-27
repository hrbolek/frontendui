import { useState } from "react";
import { createPortal } from "react-dom";

import { DeleteItemURI, ListURI, MediumContent } from "../Components";
import { DeleteAsyncAction } from "../Queries";

import {
    DeleteBody as BaseDeleteBody,
    DeleteDialog as BaseDeleteDialog,
    DeleteLink as BaseDeleteLink
} from "../../../../_template/src/Base/Mutations/Delete";

import { PermissionGate } from "../../../../dynamic/src/Hooks/useRoles";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";
import { AsyncStateIndicator } from "../../../../_template/src/Base/Helpers/AsyncStateIndicator";

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
    item,
    rbacitem,
    children = "Smazat topic",
    className = "btn btn-outline-danger",
    ...props
}) => {
    const [show, setShow] = useState(false);

    const {
        loading: saving,
        error: savingError,
        commitNow
    } = useEditAction(mutationAsyncAction, item, {
        mode: "confirm",
    });

    const handleOpen = () => {
        console.log("OTEVÍRÁM DELETE DIALOG PRO TOPIC", item);
        setShow(true);
    };

    const handleCancel = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        console.log("KLIK NA ODSTRANIT TOPIC", item);

        if (!item?.id || !item?.lastchange) {
            console.error("Topic nemá id nebo lastchange:", item);
            return;
        }

        try {
            const result = await commitNow({
                id: item.id,
                lastchange: item.lastchange,
            });

            console.log("VÝSLEDEK SMAZÁNÍ TOPICU", result);

            window.location.reload();
        } catch (e) {
            console.error("CHYBA PŘI MAZÁNÍ TOPICU", e);
        }
    };

    return (
        <PermissionGate
            rbacitem={rbacitem ?? item}
            oneOfRoles={permissions.oneOfRoles}
            mode={permissions.mode}
        >
            <button
                {...props}
                type="button"
                className={className}
                onClick={handleOpen}
            >
                {children}
            </button>

            {show && (
                <>
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Odstranit</h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    />
                                </div>

                                <div className="modal-body">
                                    <DefaultContent_ item={item} />

                                    <AsyncStateIndicator
                                        error={savingError}
                                        loading={saving}
                                        text="Odstraňuji"
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleDelete}
                                        disabled={saving}
                                    >
                                        {saving ? "Mažu..." : "Odstranit"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    >
                                        Zrušit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show" />
                </>
            )}
        </PermissionGate>
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