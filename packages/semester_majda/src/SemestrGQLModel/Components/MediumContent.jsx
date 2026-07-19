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
        window.location.hostname === "localhost" &&
        window.location.port === "5173";

    return isLocalDevelopment
        ? `http://localhost:33001${relativeURI}`
        : relativeURI;
};

export const MediumContent = ({ item, children }) => {
    return (
        <>
            <Attribute label="Id">
                <Link item={item}>
                    {item?.id || "Data error"}
                </Link>
            </Attribute>

            <Attribute label="Order">
                {item?.order ?? "—"}
            </Attribute>

            <Attribute label="Credits">
                {item?.credits ?? "—"}
            </Attribute>

            <Attribute label="Mandatory">
                {item?.mandatory === true
                    ? "Ano"
                    : item?.mandatory === false
                        ? "Ne"
                        : "—"}
            </Attribute>

            <Attribute label="Subject">
                {item?.subject?.name ?? item?.subjectId ?? "—"}
            </Attribute>

            <Attribute label="Classification type">
                {item?.classificationtype?.name
                    ?? item?.classificationtypeId
                    ?? "—"}
            </Attribute>

            <Attribute label="Last changed">
                {item?.lastchange
                    ? formatDateTime(item.lastchange)
                    : "—"}
            </Attribute>

            <Attribute label="Lekce / témata semestru">
                {item?.topics?.length > 0 ? (
                    <ul>
                        {item.topics.map((topic) => (
                            <li key={topic.id}>
                                <strong>
                                    {topic.name
                                        || topic.nameEn
                                        || topic.id}
                                </strong>

                                {topic.lessons?.length > 0 ? (
                                    <ul>
                                        {topic.lessons.map((lesson) => (
                                            <li key={lesson.id}>
                                                {lesson.type?.name || "Lekce"}
                                                {" – počet jednotek: "}
                                                {lesson.count ?? "—"}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>Bez lekcí</div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    "—"
                )}
            </Attribute>

            <Attribute label="Studijní plány">
                {item?.plans?.length > 0 ? (
                    <ul>
                        {item.plans.map((plan) => (
                            <li key={plan.id}>
                                <a href={getStudyPlanURI(plan.id)}>
                                    {plan.eventId
                                        || plan.examId
                                        || plan.id}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    "—"
                )}
            </Attribute>

            <hr />

            {children}
        </>
    );
};