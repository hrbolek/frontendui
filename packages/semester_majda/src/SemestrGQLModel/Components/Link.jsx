import { URIRoot } from "../../uriroot";
import { registerLink } from "../../../../_template/src/Base/Components/Link";
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";

const modelURI = `${URIRoot}/SemesterGQLModel`;

export const ListURI = `${modelURI}/list/`;
export const CreateURI = `${modelURI}/create/`;
export const ReadURI = `${modelURI}/view/`;
export const UpdateURI = `${modelURI}/edit/`;
export const DeleteURI = `${modelURI}/delete/`;

export const LinkURI = ReadURI;
export const VectorItemsURI = ListURI;

const idParam = ":id";

export const ReadItemURI = `${LinkURI}${idParam}`;
export const UpdateItemURI = `${UpdateURI}${idParam}`;
export const DeleteItemURI = `${DeleteURI}${idParam}`;

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

export const Link = ({
    item,
    LinkURI: LinkURI_ = LinkURI,
    action = "view",
    children,
    ...props
}) => {
    const targetURI = LinkURI_.replace("view", action);

    return (
        <ProxyLink
            to={`${targetURI}${item?.id}`}
            {...props}
        >
            {children
                || item?.subject?.name
                || item?.classificationtype?.name
                || item?.fullname
                || item?.name
                || item?.id
                || "Nevím"}
        </ProxyLink>
    );
};

export const StudyPlanLink = ({
    item,
    children,
    className,
    title,
}) => {
    if (!item?.id) {
        return children || "Data error";
    }

    return (
        <a
            href={getStudyPlanURI(item.id)}
            className={className}
            title={title}
        >
            {children
                || item?.name
                || item?.id
                || "Studijní plán"}
        </a>
    );
};

registerLink("SemesterGQLModel", Link);
registerLink("StudyPlanGQLModel", StudyPlanLink);