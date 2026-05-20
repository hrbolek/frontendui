import { Input } from "../../../../_template/src/Base/FormControls/Input";

export const MediumEditableContent = ({ item, onChange = (e) => null, onBlur = (e) => null, children }) => {
    const handleChangeMandatory = (e) => {
        // Pojistka: zkusí vzít e.target.checked, pokud tam není, zkusí přímo e.target.value
        const isChecked = e?.target?.checked !== undefined ? e.target.checked : e?.target?.value;
        
        onChange({
            target: {
                id: "mandatory",
                value: Boolean(isChecked),
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
                onChange={onChange}
                onBlur={onBlur}
            />

            <Input
                id="credits"
                type="number"
                label="Kredity"
                className="form-control"
                value={item?.credits ?? ""}
                onChange={onChange}
                onBlur={onBlur}
            />

            <Input
                id="mandatory"
                type="checkbox"
                label="Povinný"
                className="form-check-input"
                // Klíčová oprava: propojení stavu z databáze/draftu do komponenty
                checked={Boolean(item?.mandatory)} 
                onChange={handleChangeMandatory}
                onBlur={onBlur}
            />

            {children}
        </>
    );
};