exports = function(){

  var products = context.services.get("mongodb-atlas").db("mongoshop").collection("myprods");
  
  const sample = {"$sample": {size: 5}};
  console.log(JSON.stringify(sample));

  return products.aggregate([sample]).toArray()
    .then(result => {
      if(result) {
        for(var i=0;i<result.length;i++) {
          console.log(`i: ${i} ... ${result[i]}`);
          products.updateOne({_id: result[i]._id}, 
          {$set: {"price.value": Double.parseDouble( Number.parseFloat(result[i].price.value*0.5).toFixed(2) ), 
                  "promotionStatus": "platinum"}})
        }
        console.log(`Successfully found document: ${result}.`);
        
      } else {
        console.log("No document matches the provided query.");
      }
      return result;
    })
    .catch(err => console.error(`Failed to find document: ${err}`));
  
};