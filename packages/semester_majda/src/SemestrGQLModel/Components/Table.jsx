import { useMemo } from "react";

import {
    Table as BaseTable,
    buildTableDef,
} from "../../../../_template/src/Base/Components/Table";

import {
    Link as SemesterLink,
    StudyPlanLink,
} from "./Link";

const DirectIdCell = ({ row, name }) => {
    const ItemLink =
        row?.__typename === "StudyPlanGQLModel"
            ? StudyPlanLink
            : SemesterLink;

    return (
        <td key={name}>
            <ItemLink item={row}>
                {row?.id || "Data error"}
            </ItemLink>
        </td>
    );
};

export const Table = ({ data }) => {
    const table_def = useMemo(() => {
        if (!data || data.length === 0) {
            return {};
        }

        const definition = buildTableDef(data);

        definition.id = {
            label: definition.id?.label || "id",
            component: DirectIdCell,
        };

        return definition;
    }, [data]);

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <BaseTable
            data={data}
            table_def={table_def}
        />
    );
};