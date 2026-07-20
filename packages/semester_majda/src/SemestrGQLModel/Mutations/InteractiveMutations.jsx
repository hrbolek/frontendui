import { CardCapsule } from "../Components";
import { VectorItemsURI } from "../Components";

import { UpdateButton, UpdateLink } from "./Update";
import { CreateButton as TopicCreateButton } from "../../TopicGQLModel/Mutations/Create";

import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

/**
 * Odkaz na seznam semestrů předmětu.
 *
 * Komponenta používá společný `ProxyLink` a ve výchozím
 * nastavení zachovává parametry vyhledávání i hash aktuální URL.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {React.ReactNode} props.children Obsah odkazu.
 * @param {boolean} [props.preserveHash=true] Určuje, zda se zachová hash URL.
 * @param {boolean} [props.preserveSearch=true] Určuje, zda se zachovají parametry URL.
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
 * Zobrazí dostupné interaktivní nástroje pro semestr.
 *
 * Nabídka obsahuje odkaz zpět na seznam semestrů, odkaz
 * na samostatnou editační stránku, otevření editace v dialogu
 * a tlačítko pro vytvoření nového tématu.
 *
 * Dostupnost jednotlivých mutací je řízena komponentami mutací
 * podle rolí uživatele a RBAC údajů předaného semestru.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.item Semestr, nad kterým se nástroje provádějí.
 * @param {string} props.item.id Identifikátor semestru.
 * @param {Array<Object>} [props.item.topics] Existující témata semestru.
 * @returns {JSX.Element} Karta s dostupnými nástroji semestru.
 */
export const InteractiveMutations = ({ item }) => {
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

            {/*
             * Nové téma se předvyplní identifikátorem semestru,
             * výchozím názvem a pořadím za posledním existujícím
             * tématem. Samotnou mutaci zajišťuje TopicCreateButton.
             */}
            <TopicCreateButton
                className="btn btn-outline-success"
                item={{
                    semesterId: item.id,
                    name: "Nové téma",
                    nameEn: "",
                    description: "",
                    order: (item?.topics?.length ?? 0) + 1,
                }}
                rbacitem={item}
            >
                Vytvořit téma
            </TopicCreateButton>
        </CardCapsule>
    );
};