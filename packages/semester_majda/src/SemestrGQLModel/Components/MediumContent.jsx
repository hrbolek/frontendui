import {
    Attribute,
    formatDateTime,
} from "../../../../_template/src/Base/Components";

import { Link } from "./Link";

/**
 * Sestaví adresu detailu studijního plánu.
 *
 * Při lokálním vývoji na portu 5173 přesměruje uživatele
 * do hlavní aplikace běžící na portu 33001. V publikované
 * aplikaci použije relativní adresu na stejném serveru.
 *
 * @param {string} id Identifikátor studijního plánu.
 * @returns {string} Adresa detailu studijního plánu.
 */
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

/**
 * Zobrazí hodnotu příznaku povinnosti semestru.
 *
 * Hodnota `true` se zobrazí jako zelený štítek „Ano“,
 * hodnota `false` jako šedý štítek „Ne“. Pokud hodnota
 * není dostupná, zobrazí se pomlčka.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {boolean|null|undefined} props.value Hodnota příznaku povinnosti.
 * @returns {JSX.Element|string} Vizuální reprezentace hodnoty.
 */
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

/**
 * Zobrazí stručný přehled témat a jejich lekcí.
 *
 * Každé téma obsahuje název a seznam lekcí zobrazených
 * pomocí štítků. U lekce se zobrazuje její typ a počet
 * výukových jednotek.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Array<Object>} [props.topics] Témata semestru.
 * @returns {JSX.Element|string} Přehled témat nebo pomlčka.
 */
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

/**
 * Zobrazí základní read-only informace o semestru předmětu.
 *
 * Komponenta zobrazuje identifikátor semestru, pořadí,
 * kredity, povinnost, předmět, způsob zakončení, datum
 * poslední změny, témata s lekcemi a odkazy na související
 * studijní plány.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.item Zobrazovaný semestr předmětu.
 * @param {React.ReactNode} [props.children] Dodatečný obsah komponenty.
 * @returns {JSX.Element} Detail semestru předmětu.
 */
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