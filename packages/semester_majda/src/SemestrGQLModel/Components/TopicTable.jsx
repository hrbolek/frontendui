import { useCallback, useMemo, useState } from "react";

import {
    Table as BaseTable,
    buildTableDef,
    KebabMenu,
} from "../../../../_template/src/Base/Components/Table";

import { DeleteButton as TopicDeleteButton } from "../../TopicGQLModel/Mutations/Delete";

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

    const table_def = useMemo(() => {
        if (visibleData.length === 0) {
            return {};
        }

        const def = buildTableDef(visibleData);

        def.tools = {
            label: "Nástroje",
            component: ({ row }) => (
                <td>
                    <KebabMenu
                        actions={[
                            {
                                children: (
                                    <TopicDeleteButton
                                        className="btn btn-sm btn-outline-secondary border-0 text-start w-100"
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
    }, [visibleData, semester, handleTopicDeleted]);

    if (visibleData.length === 0) {
        return null;
    }

    return (
        <BaseTable
            data={visibleData}
            table_def={table_def}
        />
    );
};