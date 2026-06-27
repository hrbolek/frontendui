import { CardCapsule } from "../Components";
import { VectorItemsURI } from "../Components";
import { UpdateButton, UpdateLink } from "./Update";
import { DeleteButton } from "./Delete";
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

export const PageLink = ({ children, preserveHash = true, preserveSearch = true, ...props }) => {
    return (
        <ProxyLink
            to={VectorItemsURI}
            preserveHash={preserveHash}
            preserveSearch={preserveSearch}
            {...props}
        >
            {children}
        </ProxyLink>
    );
};

export const PageMutations = ({ item }) => {
    return (
        <CardCapsule item={item} title="Nástroje">
            <PageLink className="btn btn-outline-success">
                Stránka
            </PageLink>

            <UpdateLink
                className="btn btn-outline-success"
                item={item}
                rbacitem={item}
            >
                Upravit
            </UpdateLink>

            <UpdateButton
                className="btn btn-outline-success"
                item={item}
                rbacitem={item}
            >
                Upravit Dialog
            </UpdateButton>

            <DeleteButton
                className="btn btn-outline-danger"
                item={item}
                rbacitem={item}
            >
                Odstranit
            </DeleteButton>
        </CardCapsule>
    );
};