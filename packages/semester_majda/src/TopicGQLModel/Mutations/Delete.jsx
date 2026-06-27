import { useEffect, useRef, useState } from "react";

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
    const dropdownMenuRef = useRef(null);

    const {
        loading: saving,
        error: savingError,
        commitNow
    } = useEditAction(mutationAsyncAction, item, {
        mode: "confirm",
    });

    const cleanupDropdownClass = () => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.classList.remove("topic-delete-dropdown-modal");
            dropdownMenuRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            cleanupDropdownClass();
        };
    }, []);

    const handleOpen = (e) => {
        console.log("OTEVÍRÁM DELETE DIALOG PRO TOPIC", item);

        const dropdownMenu = e?.currentTarget?.closest?.(".dropdown-menu");

        if (dropdownMenu) {
            dropdownMenuRef.current = dropdownMenu;
            dropdownMenu.classList.add("topic-delete-dropdown-modal");
        }

        setShow(true);
    };

    const handleCancel = () => {
        cleanupDropdownClass();
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
            <style>
                {`
                    .topic-delete-dropdown-modal {
                        position: fixed !important;
                        top: 50% !important;
                        left: 50% !important;
                        transform: translate(-50%, -50%) !important;
                        width: min(850px, 92vw) !important;
                        max-width: 850px !important;
                        min-width: 600px !important;
                        max-height: 80vh !important;
                        overflow: visible !important;
                        padding: 0 !important;
                        border: none !important;
                        border-radius: 0.75rem !important;
                        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.35) !important;
                        z-index: 2000 !important;
                        background: white !important;
                    }

                    .topic-delete-panel {
                        background: white;
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }

                    .topic-delete-panel-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem 1.5rem;
                        border-bottom: 1px solid #dee2e6;
                    }

                    .topic-delete-panel-body {
                        padding: 1.5rem;
                        max-height: 55vh;
                        overflow-y: auto;
                        font-size: 1rem;
                    }

                    .topic-delete-panel-footer {
                        display: flex;
                        justify-content: flex-end;
                        gap: 0.75rem;
                        padding: 1rem 1.5rem;
                        border-top: 1px solid #dee2e6;
                    }
                `}
            </style>

            {!show && (
                <button
                    {...props}
                    type="button"
                    className={className}
                    onClick={handleOpen}
                >
                    {children}
                </button>
            )}

            {show && (
                <div
                    className="topic-delete-panel"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="topic-delete-panel-header">
                        <h4 className="m-0">Odstranit topic</h4>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleCancel}
                            disabled={saving}
                            aria-label="Zavřít"
                        />
                    </div>

                    <div className="topic-delete-panel-body">
                        <div className="alert alert-warning">
                            Opravdu chceš odstranit tento topic?
                        </div>

                        <div className="border rounded p-3 bg-light">
                            <DefaultContent_ item={item} />
                        </div>

                        <AsyncStateIndicator
                            error={savingError}
                            loading={saving}
                            text="Odstraňuji"
                        />
                    </div>

                    <div className="topic-delete-panel-footer">
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            onClick={handleDelete}
                            disabled={saving}
                        >
                            {saving ? "Mažu..." : "Odstranit"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-danger btn-lg"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Zrušit
                        </button>
                    </div>
                </div>
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