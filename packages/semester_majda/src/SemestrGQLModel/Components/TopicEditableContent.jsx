
import { Input } from "../../../../_template/src/Base/FormControls/Input";

/**
 * Editovatelný obsah formuláře tématu semestru.
 *
 * Komponenta zobrazuje textová pole pro český název,
 * anglický název a popis tématu. Aktuální hodnoty získává
 * z objektu `item` a změny předává nadřazené komponentě
 * prostřednictvím funkcí `onChange` a `onBlur`.
 *
 * Komponenta neprovádí GraphQL mutaci přímo. Pouze připravuje
 * formulářová pole a předává změněné hodnoty komponentě,
 * která řídí vytvoření nebo aktualizaci tématu.
 *
 * @component
 * @param {Object} props Vlastnosti komponenty.
 * @param {Object} props.item Aktuálně upravované téma.
 * @param {string|null} [props.item.name] Český název tématu.
 * @param {string|null} [props.item.nameEn] Anglický název tématu.
 * @param {string|null} [props.item.description] Popis tématu.
 * @param {Function} [props.onChange] Funkce zpracovávající změnu hodnoty.
 * @param {Function} [props.onBlur] Funkce volaná při opuštění vstupního pole.
 * @param {React.ReactNode} [props.children] Dodatečný obsah formuláře.
 * @returns {JSX.Element} Formulářová pole pro úpravu tématu.
 */
export const TopicEditableContent = ({
    item,
    onChange = (e) => null,
    onBlur = (e) => null,
    children
}) => {
    return (
        <>
            <Input
                id="name"
                label="Název"
                className="form-control"
                value={item?.name ?? ""}
                onChange={onChange}
                onBlur={onBlur}
            />

            <Input
                id="nameEn"
                label="Název anglicky"
                className="form-control"
                value={item?.nameEn ?? ""}
                onChange={onChange}
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