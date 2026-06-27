import { PersonFill } from "react-bootstrap-icons"
import { Link } from "./Link"
import { CardCapsule as CardCapsule_ } from "../../../../_template/src/Base/Components"

/**
 * A specialized card component that displays an `TemplateLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `TemplateLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `template` object.
 *
 * @component
 * @param {Object} props - The props for the TemplateCardCapsule component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The display name for the template entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { TemplateCardCapsule } from './TemplateCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const templateEntity = { id: 123, name: "Example Entity" };
 *
 * <TemplateCardCapsule template={templateEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </TemplateCardCapsule>
 */
export const CardCapsule = ({ item, children, title=null}) => {
    
    if (!title) {
        title = <><PersonFill /> <Link item={item} /></>
    }
    return (
        
        <CardCapsule_ title={title}>
            {children}
        </CardCapsule_>
    )
}
