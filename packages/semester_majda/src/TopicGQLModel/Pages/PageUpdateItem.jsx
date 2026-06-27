import { UpdateBody } from "../Mutations/Update"
import { PageItemBase } from "./PageBase"

export const PageUpdateItem = ({ 
    SubPage=UpdateBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}