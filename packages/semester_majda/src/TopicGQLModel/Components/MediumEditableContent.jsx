import { Input } from "../../../../_template/src/Base/FormControls/Input";

export const MediumEditableContent = ({
    item,
    onChange = () => null,
    onBlur = () => null,
    children
}) => {
    const handleNumberChange = (id) => (e) => {
        const value = e?.target?.value;

        onChange({
            target: {
                id,
                value: value === "" ? null : Number(value),
            },
        });
    };

    return (
        <>
            <Input
                id="name"
                label="Název tématu"
                className="form-control"
                value={item?.name ?? ""}
                onChange={onChange}
                onBlur={onBlur}
            />

            <Input
                id="nameEn"
                label="Anglický název"
                className="form-control"
                value={item?.nameEn ?? ""}
                onChange={onChange}
                onBlur={onBlur}
            />

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
                id="description"
                label="Popis"
                className="form-control"
                value={item?.description ?? ""}
                onChange={onChange}
                onBlur={onBlur}
            />

            {children}
        </>
    );
};