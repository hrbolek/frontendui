import { CardCapsule } from "../Components/CardCapsule";
import { Table } from "../Components/Table";
import { TopicTable } from "../Components/TopicTable";
import { StudyPlanTable } from "../Components/StudyPlanTable";

import { Col } from "../../../../_template/src/Base/Components/Col";
import { Row } from "../../../../_template/src/Base/Components/Row";

/**
 * Uživatelsky přívětivé názvy vektorových atributů.
 */
const vectorTitles = {
    topics: "Témata a lekce",
    plans: "Studijní plány",
};

/**
 * Vybere správnou tabulku podle názvu vektorového atributu.
 *
 * @component
 * @param {Object} props
 * @param {string} props.attribute_name Název atributu.
 * @param {Array<Object>} props.attribute_value Hodnoty atributu.
 * @param {Object} props.item Nadřazený semestr.
 *
 * @returns {JSX.Element}
 */
const VectorTable = ({
    attribute_name,
    attribute_value,
    item,
}) => {
    if (attribute_name === "topics") {
        return (
            <TopicTable
                data={attribute_value}
                semester={item}
            />
        );
    }

    if (attribute_name === "plans") {
        return (
            <StudyPlanTable
                data={attribute_value}
            />
        );
    }

    /*
     * Obecná tabulka se použije pouze pro ostatní
     * vektorové atributy.
     */
    return (
        <Table
            data={attribute_value}
        />
    );
};

/**
 * Vytvoří komponentu pro zadaný vektorový atribut.
 *
 * @param {string} attribute_name Název atributu.
 * @returns {React.ComponentType}
 */
export const VectorAttributeFactory = (attribute_name) => {
    const GeneratedVectorAttribute = ({ item }) => {
        const attribute_value = item?.[attribute_name] || [];

        return (
            <Row key={attribute_name}>
                <Col className="col-2">
                    <b>
                        {vectorTitles[attribute_name]
                            ?? attribute_name}
                    </b>
                </Col>

                <Col className="col-10">
                    <CardCapsule item={item}>
                        <VectorTable
                            attribute_name={attribute_name}
                            attribute_value={attribute_value}
                            item={item}
                        />
                    </CardCapsule>
                </Col>
            </Row>
        );
    };

    return GeneratedVectorAttribute;
};

/**
 * Řádkové zobrazení jednoho vektorového atributu.
 *
 * @component
 */
export const VectorAttribute_ = ({
    attribute_name,
    item,
}) => {
    const attribute_value = item?.[attribute_name] || [];

    return (
        <Row key={attribute_name}>
            <Col className="col-2">
                <b>
                    {vectorTitles[attribute_name]
                        ?? attribute_name}
                </b>
            </Col>

            <Col className="col-10">
                <CardCapsule item={item}>
                    <VectorTable
                        attribute_name={attribute_name}
                        attribute_value={attribute_value}
                        item={item}
                    />
                </CardCapsule>
            </Col>
        </Row>
    );
};

/**
 * Samostatná karta jednoho vektorového atributu.
 *
 * @component
 */
export const VectorAttribute = ({
    attribute_name,
    item,
}) => {
    const attribute_value = item?.[attribute_name] || [];

    const title =
        vectorTitles[attribute_name]
        ?? attribute_name;

    return (
        <CardCapsule
            item={item}
            title={title}
        >
            <VectorTable
                attribute_name={attribute_name}
                attribute_value={attribute_value}
                item={item}
            />
        </CardCapsule>
    );
};

/**
 * Zobrazí všechny vektorové atributy semestru.
 *
 * Typicky se jedná o témata a studijní plány.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.item Semestr obsahující vektorové atributy.
 *
 * @returns {JSX.Element|null}
 */
export const MediumCardVectors = ({ item }) => {
    const vectorAttributes = Object.entries(item || {}).filter(
        ([, attribute_value]) =>
            Array.isArray(attribute_value)
    );

    if (vectorAttributes.length === 0) {
        return null;
    }

    return (
        <div className="semester-vector-list">
            {vectorAttributes.map(([attribute_name]) => (
                <VectorAttribute
                    key={attribute_name}
                    attribute_name={attribute_name}
                    item={item}
                />
            ))}
        </div>
    );
};