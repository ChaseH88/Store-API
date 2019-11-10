async function lookup_array_of_obj_ids(collection, field){
  
  query = await collection.aggregate([
    {
      '$unwind': {
        'path': `$${field}`, 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': `${field}`, 
        'localField': `${field}`, 
        'foreignField': '_id', 
        'as': `${field}`
      }
    }, {
      '$unwind': {
        'path': `$${field}`
      }
    }, {
      '$group': {
        '_id': '$_id', 
        [field]: {
          '$push': `$${field}`
        }
      }
    }
  ]);
  
  return query;

}

module.exports = lookup_array_of_obj_ids;