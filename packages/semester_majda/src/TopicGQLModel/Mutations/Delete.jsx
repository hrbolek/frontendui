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

/**
 * Výchozí komponenta zobrazující údaje topicu před odstraněním.
 */
const DefaultContent = MediumContent;

/**
 * GraphQL async action používaná pro odstranění topicu.
 */
const MutationAsyncAction = DeleteAsyncAction;

/**
 * Role oprávněné odstranit topic.
 */
const permissions = {
    oneOfRoles: [
        "studijní administrátor",
        "garant předmětu",
        "garant programu"
    ],
    mode: "absolute",
};

/**
 * Odkaz na samostatnou stránku pro odstranění topicu.
 *
 * Komponenta obaluje `BaseDeleteLink`, nastavuje výchozí URI
 * a aplikuje kontrolu přístupových oprávnění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {string} [props.uriPattern=DeleteItemURI]
 *   URI stránky pro odstranění konkrétního topicu.
 * @returns {JSX.Element} Odkaz na stránku pro odstranění topicu.
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
 * Tlačítko pro bezpečné odstranění topicu.
 *
 * Tlačítko se používá uvnitř rozbalovací nabídky tabulky témat.
 * Po kliknutí zobrazí potvrzovací panel s informacemi o topicu.
 * Samotné odstranění se provede prostřednictvím GraphQL async
 * action až po potvrzení uživatelem.
 *
 * Po úspěšném odstranění se zavolá callback `onDeleted`.
 * Nadřazená tabulka pomocí něj odebere topic ze svého lokálního
 * zobrazení, takže není nutné obnovovat celou stránku.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný topic.
 * @param {Object} props.item Odstraňovaný topic.
 * @param {string} props.item.id Identifikátor topicu.
 * @param {string} props.item.lastchange Čas poslední změny topicu.
 * @param {Object} [props.rbacitem] Objekt použitý při kontrole oprávnění.
 * @param {Function} [props.onDeleted]
 *   Callback volaný po úspěšném odstranění topicu.
 * @param {React.ReactNode} [props.children="Smazat topic"]
 *   Text nebo obsah tlačítka.
 * @param {string} [props.className="btn btn-outline-danger"]
 *   CSS třídy tlačítka.
 * @returns {JSX.Element} Tlačítko a potvrzovací panel odstranění.
 */
export const DeleteButton = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    item,
    rbacitem,
    onDeleted,
    children = "Smazat topic",
    className = "btn btn-outline-danger",
    ...props
}) => {
    /*
     * Řídí zobrazení potvrzovacího panelu.
     */
    const [show, setShow] = useState(false);

    /*
     * Uchovává odkaz na dropdown nabídku, ze které byl
     * potvrzovací panel otevřen.
     */
    const dropdownMenuRef = useRef(null);

    /*
     * Hook zajišťuje stav ukládání, případnou chybu
     * a ruční spuštění GraphQL mutace.
     */
    const {
        loading: saving,
        error: savingError,
        commitNow
    } = useEditAction(mutationAsyncAction, item, {
        mode: "confirm",
    });

    /**
     * Odstraní pomocnou CSS třídu z dropdown nabídky.
     *
     * Funkce se používá při zavření panelu, po úspěšném
     * odstranění i při odpojení komponenty.
     */
    const cleanupDropdownClass = () => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.classList.remove(
                "topic-delete-dropdown-modal"
            );

            dropdownMenuRef.current = null;
        }
    };

    /*
     * Při odpojení komponenty zajistí odstranění dočasné
     * CSS třídy, aby nezůstala na původní dropdown nabídce.
     */
    useEffect(() => {
        return () => {
            cleanupDropdownClass();
        };
    }, []);

    /**
     * Otevře potvrzovací panel odstranění.
     *
     * Pokud bylo tlačítko umístěné v dropdown nabídce,
     * přidá se nabídce CSS třída, která ji dočasně zobrazí
     * jako modal uprostřed obrazovky.
     */
    const handleOpen = (event) => {
        const dropdownMenu = event?.currentTarget?.closest?.(".dropdown-menu");

        if (dropdownMenu) {
            dropdownMenuRef.current = dropdownMenu;
            dropdownMenu.classList.add("topic-delete-dropdown-modal");
        }

        setShow(true);
    };

    /**
     * Zavře potvrzovací panel bez provedení mutace.
     */
    const handleCancel = () => {
        cleanupDropdownClass();
        setShow(false);
    };

    /**
     * Provede GraphQL mutaci odstranění topicu.
     *
     * Pro odstranění je potřeba ID a čas poslední změny.
     * Po úspěchu se panel zavře a nadřazené komponentě
     * se prostřednictvím `onDeleted` předá ID odstraněného topicu.
     */
    const handleDelete = async () => {
        if (!item?.id || !item?.lastchange) {
            return;
        }

        try {
            const result = await commitNow({
                id: item.id,
                lastchange: item.lastchange,
            });

            cleanupDropdownClass();
            setShow(false);

            if (onDeleted) {
                await onDeleted(item.id, result);
            }
        } catch {
            // Chybu z mutace zobrazí AsyncStateIndicator.
        }
    };

    return (
        <PermissionGate
            rbacitem={rbacitem ?? item}
            oneOfRoles={permissions.oneOfRoles}
            mode={permissions.mode}
        >
            {/*
             * Styly mění původní dropdown nabídku na potvrzovací
             * panel zobrazený uprostřed obrazovky.
             */}
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
                    onClick={(event) => event.stopPropagation()}
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

/**
 * Obecný potvrzovací dialog pro odstranění topicu.
 *
 * Komponenta obaluje `BaseDeleteDialog`, předává mu výchozí
 * obsah, GraphQL async action, adresu seznamu a oprávnění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný topic.
 * @param {string} [props.vectorItemsURI=ListURI]
 *   URI seznamu topiců.
 * @returns {JSX.Element} Potvrzovací dialog odstranění.
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
 * Obsah samostatné stránky pro odstranění topicu.
 *
 * Komponenta obaluje `BaseDeleteBody`, zobrazí informace
 * o topicu a zajistí provedení GraphQL mutace odstranění.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Function} [props.mutationAsyncAction=MutationAsyncAction]
 *   Async action provádějící GraphQL mutaci odstranění.
 * @param {React.ComponentType<Object>} [props.DefaultContent=DefaultContent]
 *   Komponenta zobrazující odstraňovaný topic.
 * @param {string} [props.vectorItemsURI=ListURI]
 *   URI seznamu topiců.
 * @returns {JSX.Element} Obsah stránky pro odstranění topicu.
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