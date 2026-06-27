import { UpdateAsyncAction } from "../Queries";
import { MediumEditableContent } from "./MediumEditableContent";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";
import { useCallback } from "react";
import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider";


export const ConfirmEdit = ({ item, children }) => {
    const { run , error, loading, entity, data, onChange: contextOnChange, onBlur: contextOnBlur } = useGQLEntityContext()
    
    const localOnMutationEvent = useCallback((mutationHandler, notifyHandler) => async (e) => {
        const newItem = { ...item, [e.target.id]: e.target.value }
        const newEvent = { target: { value: newItem } }
        
        await notifyHandler(newEvent)
        return await mutationHandler(e)
    })

    const {
        draft,
        dirty,
        onChange, 
        onBlur,
        onCancel,
        onConfirm,
    } = useEditAction(UpdateAsyncAction, item, {mode: "confirm"})

    const handleConfirm = useCallback(async () => {
        const result = await onConfirm();
        console.log("ConfirmEdit handleConfirm result", result, "draft", draft)
        if (result) {
            const event = { target: { value: result } };
            // důležité: použij params z kontextu (provider si je drží jako "poslední vars")
            await contextOnChange(event);
        }
        return result;
    }, [onConfirm, contextOnChange]);


    return (
        <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur} >
            {children}
            <hr />
            {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
            <button 
                className="btn btn-warning form-control" 
                onClick={onCancel}
                disabled={!dirty || loading}
            >
                Zrušit změny
            </button>
            <button 
                className="btn btn-primary form-control" 
                onClick={handleConfirm}
                disabled={!dirty || loading}
            >
                Uložit změny
            </button>
        </MediumEditableContent>
    )
}