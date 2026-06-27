

## Base Copy

- copy /_template/ directory to your place

## Adapt to new type

### Change URI locations
- in Link.jsx file (see subdir ./components/) change LinkURI
- in Link.jsx file change registerLink('YourGQLModel)

### Register pages and components to Application
- rename RouterSegments in Page/RouterSegments.jsx
- insert RouterSegments into app router, so make them working


At some point you should restart vite.

- use http://localhost:8001/doc and graphiql at http://localhost:8001/gql to get queries and update AsyncActions, fragments, etc. in directory Queries, as an alternative uri you could use http://localhost:33001/
  - readById
  - readPage
  - mutations (CUD)

- try to navigate in your app to URI defined in Link to reach list of items `/template/YOUDEFINED/list/'
- remove all errors until you get your app showing a table
- try to navigate from table into individual items
- check permission at API (source code etc.) to get info about neede roles for particular mutations 
  - UserAbsoluteAccessControlExtension or RbacProviderExtension
  - set

- Change LargeCard, add there more buttons

- Update MediumContent.jsx file to show more or less data related to you entity
- Update MediumEditableContent.jsx file to allow edit of more or less data


## Add new Mutations

- check gqlendpoint to cover all available mutations with appropriate permissions
  
### Update filters

- Set Filter component, correct it at PageVector, do not forget to use appropriate name for query param in url