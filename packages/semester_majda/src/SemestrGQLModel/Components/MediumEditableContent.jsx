import { Input } from "../../../../_template/src/Base/FormControls/Input"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */
export const MediumEditableContent = ({ item, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
        {/* defaultValue={item?.name|| "Název"}  */}
            <Input id={"order"} type = "number" label={"Pořadí"} className="form-control" value={item?.order?? " "} onChange={onChange} onBlur={onBlur} />
            <Input id={"credits"} label={"Kredity"} className="form-control" value={item?.credits?? " "} onChange={onChange} onBlur={onBlur} />
            <Input id={"mandatory"} label={"Povinný"} className="form-control" value={item?.mandatory?? " "} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}