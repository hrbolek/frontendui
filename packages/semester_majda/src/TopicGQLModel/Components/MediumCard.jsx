import { PersonFill } from "react-bootstrap-icons"
import { CardCapsule } from "./CardCapsule"
import { MediumContent } from "./MediumContent"
import { Link } from "./Link"

/**
 * A card component that displays detailed content for an template entity.
 *
 * This component combines `TemplateCardCapsule` and `TemplateMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the template entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumCard component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumCard template={templateEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </TemplateMediumCard>
 */
export const MediumCard = ({ item, children }) => {
    return (
        <CardCapsule title={<><PersonFill /> <Link item={item} /></>}>
            {children}
            <MediumContent item={item}>
            </MediumContent>
        </CardCapsule>
    )
}
