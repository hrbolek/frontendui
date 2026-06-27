// import Row from "react-bootstrap/Row"
import { MediumCard } from "./MediumCard"
import { CardCapsule as CardCapsule_} from "./CardCapsule"
import { Row } from "../../../../_template/src/Base/Components/Row"
// import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { MediumContent as MediumContent_ } from "./MediumContent"
import { InteractiveMutations } from '../Mutations/InteractiveMutations'
import { LeftColumn, MiddleColumn } from "../../../../_template/src/Base/Components/Col"
/**
 * A large card component for displaying detailed content and layout for an template entity.
 *
 * This component wraps an `TemplateCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `TemplateMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the TemplateLargeCard component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateLargeCard template={templateEntity}>
 *   <p>Additional content for the middle column.</p>
 * </TemplateLargeCard>
 */
export const LargeCard = ({ item, children, CardCapsule=CardCapsule_, MediumContent=MediumContent_ }) => {
    // console.log("LargeCard.item", item)
    return (
        <CardCapsule item={item} >
            <Row>
                <LeftColumn>
                    <CardCapsule item={item} title="Detail">
                        <MediumContent item={item} />
                    </CardCapsule>
                    <InteractiveMutations item={item} />
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </CardCapsule>
    )
}
