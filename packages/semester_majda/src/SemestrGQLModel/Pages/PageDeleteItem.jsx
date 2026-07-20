import { PageItemBase } from "./PageBase";
import { DeleteBody } from "../Mutations/Delete";

/**
 * Stránka pro odstranění konkrétního semestru.
 *
 * Komponenta používá společný základ `PageItemBase`, který
 * zajišťuje načtení entity podle ID z adresy stránky. Jako
 * výchozí obsah vykresluje `DeleteBody`, který zobrazí údaje
 * odstraňovaného semestru a umožní potvrdit GraphQL mutaci.
 *
 * Prostřednictvím vlastnosti `SubPage` lze výchozí obsah
 * nahradit jinou komponentou bez změny společného základu stránky.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {React.ComponentType<Object>} [props.SubPage=DeleteBody]
 *   Komponenta vykreslená uvnitř společného základu stránky.
 * @returns {JSX.Element} Stránka pro odstranění semestru.
 */
export const PageDeleteItem = ({ 
    SubPage=DeleteBody,
    ...props
}) => {
    return (
        <PageItemBase
            SubPage={SubPage}
            {...props}
        />
         
    )
}