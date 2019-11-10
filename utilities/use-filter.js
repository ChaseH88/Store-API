/**
 * 
 * @param {*} query - The array from the user. Comes from 'req.query'.
 * @param {*} filters - An array of the filters that are used.
 */
exports.useFilters = (query, filters) => {
  
  // Format the custom filters array
  let regex = new RegExp(filters
    .join()
    .replace(/,/g, "|"),"g");
    
  // Return the query string with the dollar sign
  return(
    JSON.parse(
      JSON.stringify(query)
        .replace(regex, match => `$${match}`)
    )
  );

}