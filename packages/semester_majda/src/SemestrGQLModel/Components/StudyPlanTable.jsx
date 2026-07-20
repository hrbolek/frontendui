/**
 * Vytvoří adresu detailu studijního plánu.
 *
 * Při vývoji na portu 5173 se odkaz otevře v hlavní aplikaci
 * běžící na portu 33001. V publikované aplikaci se použije
 * relativní adresa.
 *
 * @param {string} id ID studijního plánu.
 * @returns {string} Adresa detailu studijního plánu.
 */
const getStudyPlanURI = (id) => {
    const relativeURI =
        `/studyplan/StudyPlanGQLModel/view/${id}`;

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
 * Přehled studijních plánů navázaných na semestr.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} [props.data=[]] Studijní plány semestru.
 *
 * @returns {JSX.Element}
 */
export const StudyPlanTable = ({ data = [] }) => {
    if (data.length === 0) {
        return (
            <div className="semester-study-plan-empty">
                K tomuto semestru nejsou připojené žádné studijní plány.
            </div>
        );
    }

    return (
        <div className="semester-study-plan-list">
            {data.map((plan, index) => (
                <div
                    className="semester-study-plan-item"
                    key={plan.id}
                >
                    <div className="semester-study-plan-main">
                        <span className="semester-study-plan-number">
                            {index + 1}
                        </span>

                        <div>
                            <a
                                className="semester-study-plan-link"
                                href={getStudyPlanURI(plan.id)}
                            >
                                Studijní plán {index + 1}
                            </a>

                            <div className="semester-study-plan-description">
                                Otevřít podrobnosti studijního plánu
                            </div>
                        </div>
                    </div>

                    <div className="semester-study-plan-relations">
                        {plan.examId && (
                            <span className="badge rounded-pill text-bg-light border">
                                Zkouška
                            </span>
                        )}

                        {plan.eventId && (
                            <span className="badge rounded-pill text-bg-light border">
                                Událost
                            </span>
                        )}

                        {!plan.examId && !plan.eventId && (
                            <span className="text-body-secondary small">
                                Bez navázané zkoušky a události
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};