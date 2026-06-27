export const makeMutationURI = (linkURI, action, { withId = false } = {}) => {
    const viewSegmentRe = /\/view(\/|$)/;
    if (!viewSegmentRe.test(linkURI)) throw new Error(`LinkURI must contain '/view'. Got: ${linkURI}`);

    const base = linkURI.replace(viewSegmentRe, `/${action}$1`).replace(/\/?$/, "/");
    return withId ? `${base}:id` : base.replace(/\/$/, "");
};