import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { PageItemBase } from "./PageBase"

export const PageReadItem = ({ 
    SubPage=GeneratedContentBase,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props}/>
    )
}