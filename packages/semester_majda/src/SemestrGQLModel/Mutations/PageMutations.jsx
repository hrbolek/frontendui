import { CardCapsule } from "../Components";
import { VectorItemsURI } from "../Components";

import { UpdateButton, UpdateLink } from "./Update";
import { DeleteButton } from "./Delete";

import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

/**
 * Odkaz na seznam semestrů předmětu.
 *
 * Komponenta používá společný `ProxyLink` a ve výchozím
 * nastavení zachovává hash i parametry aktuální URL.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {React.ReactNode} props.children Obsah odkazu.
 * @param {boolean} [props.preserveHash=true]
 *   Určuje, zda se při navigaci zachová hash URL.
 * @param {boolean} [props.preserveSearch=true]
 *   Určuje, zda se při navigaci zachovají parametry URL.
 * @returns {JSX.Element} Odkaz na seznam semestrů.
 */
export const PageLink = ({
    children,
    preserveHash = true,
    preserveSearch = true,
    ...props
}) => {
    return (
        <ProxyLink
            to={VectorItemsURI}
            preserveHash={preserveHash}
            preserveSearch={preserveSearch}
            {...props}
        >
            {children}
        </ProxyLink>
    );
};

/**
 * Zobrazí nástroje pro práci s konkrétním semestrem.
 *
 * Nabídka obsahuje odkaz na seznam semestrů, odkaz na
 * samostatnou editační stránku, otevření editace v dialogu
 * a tlačítko pro odstranění semestru.
 *
 * Jednotlivé mutační komponenty samostatně kontrolují
 * oprávnění uživatele pomocí RBAC údajů semestru.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.item Semestr, nad kterým se operace provádějí.
 * @returns {JSX.Element} Karta s nástroji semestru.
 */
export const PageMutations = ({ item }) => {
    return (
        <CardCapsule item={item} title="Nástroje">
            <PageLink className="btn btn-outline-success">
                Stránka
            </PageLink>

            <UpdateLink
                className="btn btn-outline-success"
                item={item}
                rbacitem={item}
            >
                Upravit
            </UpdateLink>

            <UpdateButton
                className="btn btn-outline-success"
                item={item}
                rbacitem={item}
            >
                Upravit Dialog
            </UpdateButton>

            <DeleteButton
                className="btn btn-outline-danger"
                item={item}
                rbacitem={item}
            >
                Odstranit
            </DeleteButton>
        </CardCapsule>
    );
};