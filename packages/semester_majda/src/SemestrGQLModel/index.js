export * from "./Components";
export * from "./Scalars";
export * from "./Vectors";
export * from "./Queries";
export * from "./Pages";

import * as Components from "./Components";
import * as Pages from "./Pages";

export const TemplateUI = {
    ...Components,
    ...Pages,
};