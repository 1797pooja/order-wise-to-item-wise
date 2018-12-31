var csv = require("csvtojson");

csv()
    .fromFile("C:/Users/User/uploads/input-1545819340910.csv")
    .then( function(jsonArrayObj){
//console.log(jsonArrayObj);

      var data = [];
      data.push(jsonArrayObj);
//console.log(data);

      var filter1 = jsonArrayObj.filter(function(name){
        if(name.ItemName!='Chrage')
        {
           return true;
        }
        });
//console.log(filter1);

      var filter2 = filter1.filter(function(name){
         if(name.ItemName!='Packing')
         {
           return true;
         }
      });
//console.log(filter2);
//creating a json array with itemname and quantity
     var aftermap = filter2.map(function(name){
         var testmap = {
                            "Item":name.ItemName,
                            "Order":name.Quantity
                        }
                return testmap;
     });
//console.log(aftermap);

    var result = aftermap.reduce(function(map, obj) {
    if(obj.Item in map){
        obj.Order=+obj.Order;
        map[obj.Item] += (obj.Order);
        }
    else{
       obj.Order=+obj.Order;
       map[obj.Item] = (obj.Order);
        }
    return map;
    }, {});
//console.log(result);

      array = [];
       var i=0;
       Object.keys(result).forEach(function(key){
            array[i]={};
             array[i]['item']=JSON.stringify(key);
            array[i]['order']=JSON.stringify(result[key]);
            i++;
         });
//console.log(array);

      let converter = require('json-2-csv');
      let json2csvCallback = function (err, csv) {
          if (err) throw err;
          console.log(csv);
          };

        converter.json2csv(array, json2csvCallback);
