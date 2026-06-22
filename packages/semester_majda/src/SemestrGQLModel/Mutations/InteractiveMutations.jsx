import { CardCapsule } from "../Components";
import { VectorItemsURI } from "../Components";
import { CreateButton } from "./Create";
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

export const InteractiveMutations = ({ item }) => {
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

            <CreateButton
                className="btn btn-outline-success"
                item={{
                    semesterId: item.id,
                    name: "Nové téma",
                    nameEn: "",
                    description: "",
                }}
                rbacitem={item}
            >
                Vytvořit téma
            </CreateButton>

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