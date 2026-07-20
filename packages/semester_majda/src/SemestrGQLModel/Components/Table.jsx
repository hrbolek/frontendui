import { useMemo } from "react";

import {
    Table as BaseTable,
    buildTableDef,
} from "../../../../_template/src/Base/Components/Table";

import {
    Link as SemesterLink,
    StudyPlanLink,
} from "./Link";

/**
 * Buňka tabulky zobrazující ID entity jako odkaz.
 *
 * Cílová komponenta odkazu se vybírá podle GraphQL atributu
 * `__typename`. Studijní plán používá `StudyPlanLink`,
 * ostatní položky používají odkaz na detail semestru.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.row Data zobrazovaného řádku.
 * @param {string} [props.row.__typename] GraphQL typ entity.
 * @param {string} [props.row.id] Identifikátor entity.
 * @param {string} props.name Název aktuálního sloupce.
 * @returns {JSX.Element} Buňka tabulky s odkazem na detail entity.
 */
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

/**
 * Obecná tabulka pro zobrazení kolekce GraphQL entit.
 *
 * Definice sloupců je automaticky vytvořena podle předaných dat
 * pomocí funkce `buildTableDef`. Výchozí zobrazení sloupce `id`
 * je následně nahrazeno komponentou `DirectIdCell`, která z ID
 * vytvoří funkční odkaz na detail entity.
 *
 * Výpočet definice tabulky je uložen pomocí `useMemo`, aby se
 * neopakoval při každém vykreslení se stejnými daty.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Array<Object>} [props.data] Data zobrazovaná v tabulce.
 * @returns {JSX.Element|null} Tabulka entit nebo `null`, pokud nejsou dostupná data.
 */
export const Table = ({ data }) => {
    const table_def = useMemo(() => {
        if (!data || data.length === 0) {
            return {};
        }

        const definition = buildTableDef(data);

        /*
         * Výchozí buňka s ID se nahrazuje buňkou obsahující
         * odkaz na odpovídající detail entity.
         */
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