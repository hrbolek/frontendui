import { CardCapsule } from "../../SemestrGQLModel/Components";
import { DeleteButton } from "./Delete";

export const InteractiveMutations = ({ item, semester }) => {
    return (
        <CardCapsule item={item} title="Nástroje">
            <DeleteButton
                className="btn btn-outline-danger"
                item={item}
                rbacitem={semester ?? item}
            >
                Smazat topic
            </DeleteButton>
        </CardCapsule>
    );
};