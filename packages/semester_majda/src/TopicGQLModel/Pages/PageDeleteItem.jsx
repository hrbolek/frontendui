import { PageItemBase } from "./PageBase";
import { DeleteBody } from "../Mutations/Delete";

export const PageDeleteItem = ({ 
    SubPage=DeleteBody,
    ...props
}) => {
    return (
        <PageItemBase
            SubPage={SubPage}
            {...props}
        />
         
    )
}

