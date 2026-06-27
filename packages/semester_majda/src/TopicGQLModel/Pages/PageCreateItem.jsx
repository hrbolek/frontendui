import { ReadAsyncAction } from "../Queries"
import { Row } from "../../../../_template/src/Base/Components/Row";
import { CreateBody } from "../Mutations/Create";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { PageItemBase } from "./PageBase";



const PageBody = ({...props}) => (
    <Row>
        <LeftColumn />
        <MiddleColumn>
            <CreateBody {...props} />
        </MiddleColumn>
    </Row>
)

export const PageCreateItem = ({ 
    SubPage=PageBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}
