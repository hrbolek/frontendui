import { useCallback } from "react";
import { useMemo } from "react";

import { UpdateAsyncAction } from "../Queries";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { MediumEditableContent } from "./MediumEditableContent";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";

/**
 * TemplateLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `template` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `TemplateMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`template`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.template - Objekt reprezentující editovanou šablonu (template entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=TemplateUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <TemplateLiveEdit template={templateEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <TemplateLiveEdit template={templateEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </TemplateLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const LiveEdit_ = ({ children, asyncAction=UpdateAsyncAction}) => {
    const { onChange, onBlur, item } = useGQLEntityContext()
    return (
        <AsyncActionProvider 
            item={item} 
            queryAsyncAction={asyncAction}
            options={{deferred: true, network: true}}
            onChange={onChange}
            onBlur={onBlur}
        >
            <LiveEditWrapper item={item}>
                {children}
                {/* <hr />
                <pre>{JSON.stringify(item, null, 2)}</pre> */}
            </LiveEditWrapper>
        </AsyncActionProvider>
    )
}

const LiveEditWrapper = ({ item, children }) => {
    const { run , error, loading, entity, data, onChange, onBlur } = useGQLEntityContext()
    
    const handleEvent = useCallback((handler) => async (e) => {
        const {id, value} = e?.target || {}
        if (id === undefined || value === undefined) return 
        if (item?.[id] === value) {
            return;
        }
        const newItem = { ...item, [e.target.id]: e.target.value }
        const newEvent = { target: { value: newItem } }
        // console.log("LiveEditWrapper localOnChange start e", e, '=>', newEvent)
        // const result = await delayer(()=>onChange(newEvent))
        const result = await handler(newEvent)
        // console.log("LiveEditWrapper localOnChange end e", e, '=>', newItem, '=>', result)
        return result
    }, [item])

    const bindedOnChange = useMemo(() => handleEvent(onChange), [onChange, handleEvent])
    const bindedOnBlur = useMemo(() => handleEvent(onBlur), [onBlur, handleEvent])

    return (
        <MediumEditableContent item={item} onChange={bindedOnChange} onBlur={bindedOnBlur} >
            {children}
            {/* <hr />
            <pre>{JSON.stringify(item, null, 2)}</pre> */}
        </MediumEditableContent>
    )
}


export const LiveEdit = ({ item, children, asyncMutationAction=UpdateAsyncAction }) => {
    // const { run , error, loading, entity, data, onChange: contextOnChange, onBlur: contextOnBlur } = useGQLEntityContext()
    const {
        draft,
        dirty,
        loading: saving,
        onChange, 
        onBlur,
        onCancel,
        onConfirm,
    } = useEditAction(asyncMutationAction, item, {
        mode: "live", 
        // onCommit: contextOnChange
    })

    return (
        
        <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur} >
            {saving && <LoadingSpinner/>}
            {children}
        </MediumEditableContent>
        
    )
}