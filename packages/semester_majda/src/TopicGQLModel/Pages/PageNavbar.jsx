import Nav from 'react-bootstrap/Nav'
import { Link, LinkURI } from '../Components'
import { ProxyLink } from '../../../../_template/src/Base/Components/ProxyLink';
import { NavDropdown } from 'react-bootstrap';
import { UpdateLink } from '../Mutations/Update';
import { CreateButton } from '../Mutations/Create';

/**
 * Allow to use HashContainer for determination which component at page will be rendered.
 * That must be manually inserted at TemplatePageContent, usually this should be done 
 * as children of TemplateLargeCard.
 * <TemplateLargeCard>
 *     <HashContainer>
 *         <VectorA id="history"/>
 *         <VectorB id="roles"/>
 *         <VectorC id="graph"/>
 *     </HashContainer>
 * </TemplateLargeCard>
 * it is usefull to define globally active "areas" like science, administration, teaching, ...
 */
// const TemplatePageSegments = [
//     { segment: 'education', label: 'Výuka' },
//     { segment: 'reaserach', label: 'Tvůrčí činnost' },
//     { segment: 'administration', label: 'Organizační činnost' },
//     { segment: 'development', label: 'Rozvoj' },
// ]

/**
 * A navigation button component that generates a URL based on the template's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.template - The template object containing details about the template.
 * @param {string|number} props.template.id - The unique identifier for the template.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a template and segment
 * const template = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton template={template} segment={segment} label={label} />
 * // Resulting URL: `/ug/template/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton template={{ id: 456 }} segment="settings" label="Template Settings" />
 * // Resulting URL: `/ug/template/view/456#settings`
 */
// const TitleNavButton = ({ item, segment, label, ...props }) => {
//     // const urlbase = (segment) => `/templates/template/${segment}/${template?.id}`;
//     const urlbase = (segment) => `${LinkURI}${item?.id}#${segment}`;
//     return (
//         <Nav.Link as={"span"} {...props}>
//             {/* <ProxyLink to={urlbase(segment)}>{label}</ProxyLink> */}
//         </Nav.Link>
//     );
// };

/**
 * Renders the navigation bar for an Template page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `template` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.template - The template entity object that provides context for the page.
 * @param {string|number} props.template.id - The unique identifier for the template.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered TemplatePageNavbar component.
 *
 * @example
 * // Example usage:
 * const template = { id: 123, ... };
 * <TemplatePageNavbar template={template} onSearchChange={handleSearchChange} />
 */
// export const PageNavbar = ({ item, children, onSearchChange }) => {
//     // const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash
//     const currentHash = "da"
//     return (
//         <div className='screen-only'>
//             <MyNavbar onSearchChange={onSearchChange} >
//                 {item && TemplatePageSegments.map(({ segment, label }) => (
//                     <Nav.Item key={segment} >
//                         <TitleNavButton
//                             template={item}
//                             segment={segment}
//                             label={label}
//                             className={segment === currentHash ? "active" : ""} aria-current={segment === currentHash ? "page" : undefined}
//                         />
//                     </Nav.Item>
//                 ))}
//                 {children}
//             </MyNavbar>
//         </div>
//     );
// };


export const MyNavDropdown = ({ item }) => {
    const { __typename } = item || {}
    const hasProperType = __typename === "TemplateGQLModel"
    return (
        <NavDropdown title="Skupiny">
            <NavDropdown.Item as={ProxyLink} to={VectorItemsURI}>
                Seznam všech 
            </NavDropdown.Item>
            
            <NavDropdown.Item as={Link} item={item} action="roles" disabled={!hasProperType}>
                Role<br/><Link item={item} />
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} item={item} action="subgroups" disabled={!hasProperType}>
                Podskupiny<br/><Link item={item} />
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} item={item} action="memberships" disabled={!hasProperType}>
                Členové<br/><Link item={item} />
            </NavDropdown.Item>
        
        
            <NavDropdown.Divider />
            
            <NavDropdown.Item 
                as={UpdateLink} 
                item={item}
                disabled={!hasProperType} 
            >
                Upravit<br/><Link item={item} />
            </NavDropdown.Item>
            <NavDropdown.Item 
                as={CreateButton} 
                item={item} 
                disabled={!hasProperType} 
                item={{
                    group: item,
                    groupId: item?.groupId
                }}
            >
                Nové<br/><Link item={item} />
            </NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item as={ProxyLink} to={`/generic/${item?.__typename}/__def/${item?.id}`} reloadDocument={false}>Definice</NavDropdown.Item >
        </NavDropdown>
    )
}