// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

//*** Lessons\15-Interactive-Visualizations-and-Dashboards\3\Activities\02-Evr_Stocks_CandleStick\Solved

/**
 * Helper function to select samples data - metadata
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - ethnicity
 * index 2 - gender
 * index 3 - age
 * index 4 - location
 * index 5 - bbtype
 * index 6 - wfreq
 */




// d3.json("data/samples.json").then(function(data) {
//   console.log(data);
// });

// Promise Pending
// const dataPromise = d3.json("data/samples.json");
// console.log("Data Promise: ", dataPromise);

// Unpack function
function unpack(rows, index) {
  return rows.map(row => row[index]);
}


function init() {

  // selectedID.html("");  

  // get drop down
  var selectedID = d3.selectAll("#selDataset");

  // Clear html
  selectedID.html("");

  // Populate dropdown with id 
  d3.json("data/samples.json").then(function (data) {

    var selectID = data.names;

    selectID.forEach((id) => {
      selectedID.append("option").text(id).property("value", id);
    });

    // Populate initial view with first id 
    getMetadata(data.names[0]);
    getCharts(data.names[0]);

  });

}

//onChanged event send new ID
function optionChanged(newID){
  getMetadata(newID);
  getCharts(newID);
}

function getMetadata(xID) {
  // read the json file to get data
      d3.json("samples.json").then((data)=> {
      // Get metadata for the Demographic Info
          var metadata = data.metadata;
  
        // filter metadata by id
         var result = metadata.filter(t => t.id.toString() === xID)[0];
        // select demographic panel to put data
         var x = d3.select("#sample-metadata");
          
       // Clear html
         x.html("");
  
       // Take metadata for the selected id and append to demographic panel
          Object.entries(result).forEach(([key, value]) => {   
              x.append("p").text(`${key}: ${value}`);    
          });
      });
  }

function getCharts(xID) {
//Build Charts here
d3.json("samples.json").then((data)=> {
  //console.log(xID);  

  // filter on "samples" metadata for selected id
  var result = data.samples.filter(t => t.id.toString() === xID)[0];
  // Get the top 10 values(values were already sorted)
  var getValues = result.sample_values.slice(0,10);
  // .reverse();
  console.log(getValues);
  



 });

}


init();

//    console.log(data);
//   var id = data.metadata.id;
//   var ethnicity =  data.metadata.ethnicity;
//   var gender = data.metadata.gender;
//   var age = data.metadata.age;
//   var location = data.metadata.location;
//   var bbytpe = data.metadata.bbytpe;
//   var wfreq = data.metadata.wfreq;
   //   console.log(id)
//    });

