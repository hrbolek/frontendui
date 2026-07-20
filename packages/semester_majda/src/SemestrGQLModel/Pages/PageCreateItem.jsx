import { ReadAsyncAction } from "../Queries"
import { Row } from "../../../../_template/src/Base/Components/Row";
import { CreateBody } from "../Mutations/Create";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { PageItemBase } from "./PageBase";

/**
 * Výchozí obsah stránky pro vytvoření semestru.
 *
 * Používá dvousloupcové rozložení kompatibilní s ostatními
 * stránkami aplikace. Levý sloupec zůstává prázdný a formulář
 * pro vytvoření semestru je umístěn do hlavního prostředního
 * sloupce.
 *
 * @component
 * @param {Object} props Vlastnosti předávané komponentě `CreateBody`.
 * @returns {JSX.Element} Rozložení stránky s formulářem pro vytvoření semestru.
 */
const PageBody = ({...props}) => (
    <Row>
        <LeftColumn />
        <MiddleColumn>
            <CreateBody {...props} />
        </MiddleColumn>
    </Row>
)

/**
 * Stránka pro vytvoření nového semestru předmětu.
 *
 * Komponenta používá společný základ `PageItemBase` a jako
 * výchozí obsah předává komponentu `PageBody`. Prostřednictvím
 * vlastnosti `SubPage` je možné výchozí obsah nahradit jinou
 * komponentou bez změny samotné stránky.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {React.ComponentType<Object>} [props.SubPage=PageBody]
 *   Komponenta vykreslená uvnitř společného základu stránky.
 * @returns {JSX.Element} Stránka pro vytvoření semestru.
 */
export const PageCreateItem = ({ 
    SubPage=PageBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}