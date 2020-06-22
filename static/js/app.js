/**************************************************************************
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
 ***************************************************************************/

function init() {

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
function optionChanged(newID) {
  getMetadata(newID);
  getCharts(newID);
}

function getMetadata(xID) {
  // get data from json file
  d3.json("samples.json").then((data) => {
    
    // Get metadata for the Demographic Info
    var metadata = data.metadata;

    // filter metadata by id
    var result = metadata.filter(t => t.id.toString() === xID)[0];
    
    // select html id #sample-metadata to add data
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
  d3.json("samples.json").then((data) => {
   

    // filter on "samples" metadata for selected id
    var result = data.samples.filter(t => t.id.toString() === xID)[0];
    
    // Get the top 10 sample_values(values were already sorted)
    var getValues = result.sample_values.slice(0, 10).reverse();

    // Get the top 10 otu_labels(values were already sorted)
    var getHover = result.otu_labels.slice(0, 10).reverse();

    // Get the top 10 out_ids(values were already sorted)
    var getLabels = result.otu_ids.slice(0, 10).reverse();

    // Append text prefix "OTU: to out_ids
    var prefix = "OTU "

    // Add prefix to all the element of OTU labels array
    var otuLabels = getLabels.map(el => prefix + el);


    console.log(getValues);
    console.log(getLabels);
    console.log(otuLabels);
    console.log(getHover);

    //=============Bar Chart====================
    var trace1 = {
     type: "bar",
      x: getValues,
      y: otuLabels,
      text: getHover,
      marker: {
        color: "#00008B"},
      orientation: "h", 
      
    };

    var data = [trace1];

    var layout = {
      title: "ID " + xID + " - Top 10 OTUs",
      yaxis: {
        autorange: true
      },
        margin: {
          l: 100,
          r: 50,
          b: 100,
          t: 100,
          pad: 4
        }       
      
    };

    Plotly.newPlot("bar", data, layout);
  //===================================================================

  //================Bubble Chart=======================================

   var getBubbleValues = result.sample_values;
   var getBubbleLabels = result.otu_ids;
   var getBubbleHover = result.otu_labels;

   var trace2 = {
    type: "bubble",
    x: getBubbleLabels,
    y: getBubbleValues,
    text: getBubbleHover,
    mode: 'markers',
    marker: {size: getBubbleValues, color: getBubbleLabels,colorscale: "Earth"}
    
  };
  
  var data = [trace2];
  
  var layout = {
    //title: "ID " + xID + " - Bacteria",
    showlegend: false,
    xaxis: {title: "OTU ID"},
    height: 600,
    width: 900
  };
  
  Plotly.newPlot('bubble', data, layout);
 //==================End Bubble Chart========================

  });

}


init();


