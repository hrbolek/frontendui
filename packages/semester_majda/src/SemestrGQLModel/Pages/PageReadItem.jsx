import { PageItemBase } from "./PageBase";

import { Tree } from "../../../../_template/src/Base/Vectors/VectorAttribute";
import { MediumCardScalars } from "../../../../_template/src/Base/Scalars/ScalarAttribute";
import { MediumCardVectors } from "../Vectors/VectorAttribute";

/**
 * Obsah detailu semestru.
 *
 * Hlavní informace, témata a studijní plány jsou zobrazené jako první.
 * Technické informace z GraphQL odpovědi zůstávají dostupné
 * v rozbalovacím panelu.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item Načtený semestr předmětu.
 *
 * @returns {JSX.Element}
 */
const GeneratedContentSemestr = ({ item }) => {
    return (
        <div className="semester-generated-content">
            <MediumCardVectors item={item} />

            <details className="semester-technical-panel">
                <summary>Technické informace</summary>

                <div className="semester-technical-panel-content">
                    <Tree item={item} />
                    <MediumCardScalars item={item} />
                </div>
            </details>
        </div>
    );
};

/**
 * Read-only stránka detailu semestru.
 *
 * @component
 * @param {Object} props
 * @param {React.ComponentType} [props.SubPage]
 *   Komponenta použitá k vykreslení načteného semestru.
 *
 * @returns {JSX.Element}
 */
export const PageReadItem = ({
    SubPage = GeneratedContentSemestr,
    ...props
}) => {
    return (
        <PageItemBase
            SubPage={SubPage}
            {...props}
        />
    );
};