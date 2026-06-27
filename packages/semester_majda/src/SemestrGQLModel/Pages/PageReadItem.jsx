import { PageItemBase } from "./PageBase"

import { Tree } from "../../../../_template/src/Base/Vectors/VectorAttribute"
import { MediumCardScalars } from "../../../../_template/src/Base/Scalars/ScalarAttribute"

import { MediumCardVectors } from "../Vectors/VectorAttribute"

const GeneratedContentSemestr = ({ item }) => {
    return (
        <>
            <Tree item={item} />
            <MediumCardScalars item={item} />
            <MediumCardVectors item={item} />
        </>
    )
}

export const PageReadItem = ({ 
    SubPage = GeneratedContentSemestr,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props}/>
    )
}