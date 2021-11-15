
function queryBuilder(input) {
    if (input.length < 1) {
        return 'invalid input';
    }
    var keyArr = []
    var searchKey = []
    var searchKeyArr = []
    var searchValArr = []
    var title = "__query__"
    var search = ["__match__", "__eq__"];
    var finalObj = {}
    finalObj[title] = {}
    // console.log(input)
    // console.log(JSON.parse(input1[0]))
    for (let i = 0; i < input.length; i++) {
        const myArr = input[i].split(".");

        // console.log(myArr);
        for (let j = 0; j < myArr.length - 1; j++) {
            keyArr.push(myArr[j])
        }

        const searchText = myArr[myArr.length - 1];
        // console.log(searchText)
        searchKey = searchText.split("=")
        // console.log(searchKey[0])
        for (k = 0; k < searchKey.length; k++) {
            searchKeyArr.push(searchKey[0])
            searchValArr.push(searchKey[1])
            break;
        }
        
    }  



    
    // validate search params and format
    for (let k = 0; k < searchValArr.length; k++) {
        searchValArr[k] = searchValArr[k].replace("\"", "");
        searchValArr[k] = searchValArr[k].replace("”", "");
        const num = parseInt(searchValArr[k], 10);
        if (!Number.isNaN(num)) {
            searchValArr[k] = num
        }
    }

    for (i = 0; i < input.length; i++) {
        finalObj[title] = {}
        var count = 0;
        // console.log(keyArr.length)
        // for each element in array add them to object and move to next level of JSON
        keyArr.reduce(function (prev, e) {

            var newObj = {};
            count += 1
            if (e == '[]') {
                e = search[0]
            }

            if (count == keyArr.length) {
                prev[e] = newObj;

                if (searchKeyArr[0] == '[]') {
                    searchKeyArr[0] = search[1]
                }
                prev[e] = { [searchKeyArr[0]]: searchValArr[0] };

            } else {
                prev[e] = newObj;
            }
            return newObj;
        }, finalObj[title]);
    }
    return JSON.stringify(finalObj)
}
// test inputs
// var input = ["interests.[].sport.name=\"football\”"];
var input = ["ingredients.[].milk.[].calcium=10"];
// var input = ["info.[].transport.[]=\"car\”"];
// var input = ["name.first_name=\"Sam\”"];
// var input = ["name.first_name=\"Sam\”", "address.country=\"United Kingdom\”"];
// var input = ["info.[].transport.[]=\”car\”", "info.[].owners.[]=\”Tracy\”"];
response = queryBuilder(input);
console.log(response);


module.exports = queryBuilder;