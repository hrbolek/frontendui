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

const TopicDescriptionCell = ({ row }) => (
    <td className="semester-topic-description">
        {row?.description || "—"}
    </td>
);

/**
 * Zobrazuje témata semestru a umožňuje jejich bezpečné smazání.
 *
 * Smazaný topic se odebere pouze z lokálního zobrazení. Nedochází
 * k obnovení celé stránky a ostatní data semestru zůstávají zachována.
 */
export const TopicTable = ({ data, semester }) => {
    const [deletedTopicIds, setDeletedTopicIds] = useState(
        () => new Set()
    );

    const handleTopicDeleted = useCallback((deletedId) => {
        setDeletedTopicIds((currentIds) => {
            const updatedIds = new Set(currentIds);
            updatedIds.add(deletedId);

            return updatedIds;
        });
    }, []);

    const visibleData = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.filter(
            (topic) => !deletedTopicIds.has(topic.id)
        );
    }, [data, deletedTopicIds]);

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