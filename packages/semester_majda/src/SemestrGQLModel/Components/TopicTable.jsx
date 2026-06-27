import { useMemo } from "react";
import {
    Table as BaseTable,
    buildTableDef,
    KebabMenu,
} from "../../../../_template/src/Base/Components/Table";

import { DeleteButton as TopicDeleteButton } from "../../TopicGQLModel/Mutations/Delete";

export const TopicTable = ({ data, semester }) => {
    const table_def = useMemo(() => {
        if (!data || data.length === 0) return {};

        const def = buildTableDef(data);

        def.tools = {
            label: "Nástroje",
            component: ({ row }) => (
                <td>
                    <KebabMenu
                        actions={[
                            {
                                label: "TEST TopicTable",
                                onClick: () => console.log("Používá se TopicTable", row),
                            },
                            {
                                children: (
                                    <TopicDeleteButton
                                        className="btn btn-sm btn-outline-secondary border-0 text-start w-100"
                                        item={row}
                                        rbacitem={semester}
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
    }, [data, semester]);

    if (!data || data.length === 0) return null;

    return <BaseTable data={data} table_def={table_def} />;
};