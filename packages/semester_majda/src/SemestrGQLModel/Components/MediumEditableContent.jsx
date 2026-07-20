import { Input } from "../../../../_template/src/Base/FormControls/Input";

/**
 * Editovatelný obsah formuláře semestru předmětu.
 *
 * Komponenta umožňuje upravit pořadí semestru, počet kreditů
 * a příznak povinnosti. Změny předává nadřazené komponentě
 * prostřednictvím jednotného objektu s vlastnostmi `target.id`
 * a `target.value`.
 *
 * Číselné hodnoty jsou před odesláním převedeny z textové
 * hodnoty formuláře na typ `Number`. Prázdná hodnota se
 * předává jako `null`.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.item Aktuálně upravovaný semestr.
 * @param {number|null} [props.item.order] Pořadí semestru.
 * @param {number|null} [props.item.credits] Počet kreditů.
 * @param {boolean|null} [props.item.mandatory] Příznak povinnosti.
 * @param {Function} [props.onChange] Funkce zpracovávající změnu hodnoty.
 * @param {Function} [props.onBlur] Funkce volaná při opuštění vstupního pole.
 * @param {React.ReactNode} [props.children] Dodatečný obsah formuláře.
 * @returns {JSX.Element} Formulářová pole pro úpravu semestru.
 */
export const MediumEditableContent = ({
    item,
    onChange = () => null,
    onBlur = () => null,
    children
}) => {
    /*
     * Vytvoří obsluhu změny pro zadané číselné pole.
     * Hodnoty z HTML inputu přicházejí jako text, a proto
     * se před předáním nadřazené komponentě převádějí na číslo.
     */
    const handleNumberChange = (id) => (e) => {
        const value = e?.target?.value;

        onChange({
            target: {
                id,
                value: value === "" ? null : Number(value),
            },
        });
    };

    /*
     * Checkbox používá vlastnost `checked` místo `value`.
     * Výsledek je normalizován na boolean hodnotu.
     */
    const handleMandatoryChange = (e) => {
        onChange({
            target: {
                id: "mandatory",
                value: Boolean(e?.target?.checked),
            },
        });
    };

    return (
        <>
            <Input
                id="order"
                type="number"
                label="Pořadí"
                className="form-control"
                value={item?.order ?? ""}
                onChange={handleNumberChange("order")}
                onBlur={onBlur}
            />

            <Input
                id="credits"
                type="number"
                label="Kredity"
                className="form-control"
                value={item?.credits ?? ""}
                onChange={handleNumberChange("credits")}
                onBlur={onBlur}
            />

            <Input
                id="mandatory"
                type="checkbox"
                label="Povinný"
                className="form-check-input"
                checked={Boolean(item?.mandatory)}
                onChange={handleMandatoryChange}
                onBlur={onBlur}
            />

            {children}
        </>
    );
};