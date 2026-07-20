import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    Table as BaseTable,
    buildTableDef,
    KebabMenu,
} from "../../../../_template/src/Base/Components/Table";

import {
    DeleteButton as TopicDeleteButton,
} from "../../TopicGQLModel/Mutations/Delete";

/**
 * Buňka tabulky zobrazující lekce přiřazené k tématu.
 *
 * Každá lekce je reprezentována štítkem obsahujícím její typ
 * a počet výukových jednotek. Pokud téma neobsahuje žádné lekce,
 * zobrazí se informace „Bez lekcí“.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.row Téma zobrazované v aktuálním řádku.
 * @param {Array<Object>} [props.row.lessons] Lekce daného tématu.
 * @returns {JSX.Element} Buňka tabulky s přehledem lekcí.
 */
const TopicLessonsCell = ({ row }) => {
    if (!row?.lessons?.length) {
        return (
            <td>
                <span className="text-body-secondary">
                    Bez lekcí
                </span>
            </td>
        );
    }

    return (
        <td>
            <div className="semester-table-lesson-list">
                {row.lessons.map((lesson) => (
                    <span
                        key={lesson.id}
                        className="badge rounded-pill text-bg-light border"
                    >
                        {lesson.type?.name || "Lekce"}
                        {": "}
                        {lesson.count ?? "—"}
                    </span>
                ))}
            </div>
        </td>
    );
};

/**
 * Buňka tabulky zobrazující popis tématu.
 *
 * Pokud popis není vyplněný, zobrazí se místo něj pomlčka.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.row Téma zobrazované v aktuálním řádku.
 * @param {string|null} [props.row.description] Popis tématu.
 * @returns {JSX.Element} Buňka tabulky s popisem tématu.
 */
const TopicDescriptionCell = ({ row }) => (
    <td className="semester-topic-description">
        {row?.description || "—"}
    </td>
);

/**
 * Zobrazuje témata semestru a umožňuje jejich bezpečné smazání.
 *
 * Tabulka zobrazuje uživatelsky důležité údaje o tématu:
 * název, popis a související lekce. Technické atributy nejsou
 * v tabulce zobrazené, ale zůstávají dostupné v detailu tématu.
 *
 * Smazání tématu je dostupné přes rozbalovací nabídku ve sloupci
 * „Nástroje“. Po úspěšném smazání se identifikátor tématu uloží
 * do lokálního stavu a téma se okamžitě odstraní ze zobrazených
 * dat bez obnovení celé stránky.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Array<Object>} [props.data] Témata zobrazovaného semestru.
 * @param {Object} props.semester Nadřazený semestr používaný pro kontrolu oprávnění.
 * @returns {JSX.Element|null} Tabulka témat nebo `null`, pokud nejsou dostupná žádná témata.
 */
export const TopicTable = ({ data, semester }) => {
    /*
     * Set uchovává identifikátory témat, která byla během
     * aktuálního zobrazení stránky úspěšně smazána.
     */
    const [deletedTopicIds, setDeletedTopicIds] = useState(
        () => new Set()
    );

    /**
     * Po úspěšném smazání přidá ID tématu do lokálního seznamu
     * odstraněných témat. Vytvořením nového Setu se vyvolá
     * aktualizace React komponenty.
     */
    const handleTopicDeleted = useCallback((deletedId) => {
        setDeletedTopicIds((currentIds) => {
            const updatedIds = new Set(currentIds);
            updatedIds.add(deletedId);

            return updatedIds;
        });
    }, []);

    /*
     * Z původních dat odfiltruje témata, která již byla smazána.
     * Výpočet se opakuje pouze při změně dat nebo seznamu ID.
     */
    const visibleData = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.filter(
            (topic) => !deletedTopicIds.has(topic.id)
        );
    }, [data, deletedTopicIds]);

    /*
     * Definice sloupců se vytváří pouze při změně zobrazených
     * témat, semestru nebo callbacku zpracovávajícího smazání.
     */
    const tableDef = useMemo(() => {
        if (visibleData.length === 0) {
            return {};
        }

        const def = buildTableDef(visibleData);

        // Technické údaje zůstávají dostupné v detailu topicu.
        // V hlavní tabulce nejsou potřebné.
        delete def.__typename;
        delete def.id;
        delete def.lastchange;
        delete def.created;

        if (def.name) {
            def.name.label = "Téma";
        }

        if (def.description) {
            def.description.label = "Popis";
            def.description.component = TopicDescriptionCell;
        }

        def.lessons = {
            label: "Lekce",
            component: TopicLessonsCell,
        };

        /*
         * Nabídka nástrojů obsahuje tlačítko pro smazání tématu.
         * Samotné potvrzení a provedení GraphQL mutace zajišťuje
         * komponenta TopicDeleteButton.
         */
        def.tools = {
            label: "Nástroje",
            component: ({ row }) => (
                <td className="semester-topic-tools">
                    <KebabMenu
                        actions={[
                            {
                                children: (
                                    <TopicDeleteButton
                                        className="btn btn-sm btn-outline-danger border-0 text-start w-100"
                                        item={row}
                                        rbacitem={semester}
                                        onDeleted={handleTopicDeleted}
                                    >
                                        Smazat topic
                                    </TopicDeleteButton>
                                ),
                            },
                        ]}
                    />
                </td>
            ),
        };

        return def;
    }, [
        visibleData,
        semester,
        handleTopicDeleted,
    ]);

    if (visibleData.length === 0) {
        return null;
    }

    return (
        <div className="semester-topic-table">
            <BaseTable
                data={visibleData}
                table_def={tableDef}
            />
        </div>
    );
};