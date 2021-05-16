/** @typedef {{typeDefs: string, name: string, url?: string;}} ServiceDefinition */

/**
 * This `composition` is defined as a global by the runtime we define in Rust.
 * We declare this as a `var` here only to allow the TSDoc type annotation to be
 * applied to it. Running `var` multiple times has no effect.
 * @type {{
 *   composeAndValidate: import('../../federation-js').composeAndValidate,
 *   parseGraphqlDocument: import('graphql').parse
 * }} */
var composition;

/**
 * @type {ServiceDefinition[]}
 */
var serviceList = serviceList;

if (!serviceList || !Array.isArray(serviceList)) {
  throw new Error("Error in JS-Rust-land: serviceList missing or incorrect.");
}

serviceList.some((service) => {
  if (
    typeof service.name !== "string" || !service.name ||
    typeof service.url !== "string" && service.url ||
    typeof service.typeDefs !== "string" && service.typeDefs
  ) {
    throw new Error("Missing required data structure on service.");
  }
});

serviceList = serviceList.map(({ typeDefs, ...rest }) => ({
  typeDefs: composition.parseGraphqlDocument(typeDefs),
  ...rest,
}));

// This is super important to be the last element to make sure we don't try to
// deserialize the serviceList (above) in Rust, which is ... complex.
null;
