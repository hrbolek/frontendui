import { CardCapsule as CardCapsule_ } from "./CardCapsule";
import { Row } from "../../../../_template/src/Base/Components/Row";
import { MediumContent as MediumContent_ } from "./MediumContent";
import { InteractiveMutations } from "../Mutations/InteractiveMutations";
import {
    LeftColumn,
    MiddleColumn,
} from "../../../../_template/src/Base/Components/Col";

/**
 * Zobrazuje kompletní detail semestru ve dvousloupcovém rozložení.
 *
 * Levý sloupec obsahuje základní údaje a dostupné mutace.
 * Pravý sloupec obsahuje generovaný detail, témata a studijní plány.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item Zobrazovaný semestr.
 * @param {React.ReactNode} props.children Obsah pravé části stránky.
 * @param {React.ComponentType} [props.CardCapsule]
 * @param {React.ComponentType} [props.MediumContent]
 * @returns {React.JSX.Element}
 */
export const LargeCard = ({
    item,
    children,
    CardCapsule = CardCapsule_,
    MediumContent = MediumContent_,
}) => {
    return (
        <div className="semester-large-card">
            <CardCapsule item={item}>
                <Row g={4} className="semester-detail-row">
                    <LeftColumn
                        xl={4}
                        md={12}
                        className="semester-sidebar"
                    >
                        <CardCapsule
                            item={item}
                            title="Základní údaje"
                        >
                            <MediumContent item={item} />
                        </CardCapsule>

                        <div className="semester-mutations">
                            <InteractiveMutations item={item} />
                        </div>
                    </LeftColumn>

                    <MiddleColumn
                        xl={8}
                        md={12}
                        className="semester-main-content"
                    >
                        {children}
                    </MiddleColumn>
                </Row>
            </CardCapsule>
        </div>
    );
};