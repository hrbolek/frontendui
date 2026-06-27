import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * TemplateChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `template` entity along with other props to all child elements.
 * This component is useful for injecting a common `template` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the TemplateChildren component.
 * @param {any} props.template - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `template` entity.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 1, message: "No data available" };
 *
 * <TemplateChildren template={templateEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </TemplateChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'template' prop with the specified entity.
 */
export const Children = ({item, children, ...props}) => 
    <ChildWrapper item={item} children={children} {...props} />