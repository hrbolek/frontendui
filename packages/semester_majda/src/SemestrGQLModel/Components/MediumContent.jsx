import {
    Attribute,
    formatDateTime,
} from "../../../../_template/src/Base/Components";

import { Link } from "./Link";

const getStudyPlanURI = (id) => {
    const relativeURI = `/studyplan/StudyPlanGQLModel/view/${id}`;

    if (typeof window === "undefined") {
        return relativeURI;
    }

    const isLocalDevelopment =
        window.location.hostname === "localhost"
        && window.location.port === "5173";

    return isLocalDevelopment
        ? `http://localhost:33001${relativeURI}`
        : relativeURI;
};

const MandatoryValue = ({ value }) => {
    if (value === true) {
        return (
            <span className="badge text-bg-success">
                Ano
            </span>
        );
    }

    if (value === false) {
        return (
            <span className="badge text-bg-secondary">
                Ne
            </span>
        );
    }

    return "—";
};

const TopicSummary = ({ topics }) => {
    if (!topics?.length) {
        return "—";
    }

    return (
        <div className="semester-topic-summary">
            {topics.map((topic) => (
                <div
                    key={topic.id}
                    className="semester-topic-summary-item"
                >
                    <strong className="semester-topic-summary-name">
                        {topic.name
                            || topic.nameEn
                            || topic.id}
                    </strong>

                    <div className="semester-lesson-badges">
                        {topic.lessons?.length > 0 ? (
                            topic.lessons.map((lesson) => (
                                <span
                                    key={lesson.id}
                                    className="badge rounded-pill text-bg-light border"
                                >
                                    {lesson.type?.name || "Lekce"}
                                    {": "}
                                    {lesson.count ?? "—"}
                                </span>
                            ))
                        ) : (
                            <span className="text-body-secondary small">
                                Bez lekcí
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const MediumContent = ({ item, children }) => {
    return (
        <>
            <Attribute label="ID">
                <span className="semester-entity-id">
                    <Link item={item}>
                        {item?.id || "Chybějící ID"}
                    </Link>
                </span>
            </Attribute>

            <Attribute label="Pořadí">
                {item?.order ?? "—"}
            </Attribute>

            <Attribute label="Kredity">
                {item?.credits ?? "—"}
            </Attribute>

            <Attribute label="Povinný">
                <MandatoryValue value={item?.mandatory} />
            </Attribute>

            <Attribute label="Předmět">
                {item?.subject?.name
                    ?? item?.subjectId
                    ?? "—"}
            </Attribute>

            <Attribute label="Zakončení">
                <span className="badge text-bg-primary">
                    {item?.classificationtype?.name
                        ?? item?.classificationtypeId
                        ?? "—"}
                </span>
            </Attribute>

            <Attribute label="Poslední změna">
                {item?.lastchange
                    ? formatDateTime(item.lastchange)
                    : "—"}
            </Attribute>

            <Attribute label="Témata a lekce">
                <TopicSummary topics={item?.topics} />
            </Attribute>

            <Attribute label="Studijní plány">
                {item?.plans?.length > 0 ? (
                    <div className="semester-study-plan-list">
                        {item.plans.map((plan, index) => (
                            <a
                                key={plan.id}
                                href={getStudyPlanURI(plan.id)}
                                className="semester-study-plan-link"
                            >
                                Studijní plán {index + 1}
                            </a>
                        ))}
                    </div>
                ) : (
                    "—"
                )}
            </Attribute>

            {children}
        </>
    );
};