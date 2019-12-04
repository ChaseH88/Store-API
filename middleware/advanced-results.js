const { useFilters } = require("../utilities/use-filter");
/**
 * 
 * @param {*} model Name of the MongoDB Model
 * @param {*} populate String of key you want to lookup. Also can be an object with options.
 */
const advancedResults = (model, populate) => async (req, res, next) => {

  let query;

  // Copy the Query
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['where', 'select', 'page', 'limit', 'sort'];

  let params = removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = useFilters(reqQuery, ['gt', 'gte', 'lt', 'lte', 'in']);

  // Search the database
  query = model.find(queryStr);
            

  /**
   * IMPORTANT NOTE ABOUT POPULATE...YOU MUST
   *  REQUIRE THE MODEL FOR THE 'ref' TO WORK
   */

  
  // Select fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Select fields
  if(req.query.where) {
    console.log(req.query.where);
    // const fields = req.query.select.split(',').join(' ');
    // query = query.select(fields);
  }

  // Sort
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else { 
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  
  if(populate){
    query = query.populate(populate);
  }

  const results = await query;
  
  // Pagination Result
  let pagination = { }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next();

}

module.exports = advancedResults;