function buildMetadata(sample) {
    var metaUrl = `/metadata/${sample}`;
    d3.json(metaUrl).then(data => {
      console.log(data); 
      var PANEL = document.getElementById("sample-metadata");

      // Clear any existing metadata
      PANEL.innerHTML = '';

      // Loop through all of the keys in the json response and
      // create new metadata tags
      for(var key in data) {
          h6tag = document.createElement("h6");
          h6Text = document.createTextNode(`${key}: ${data[key]}`);
          h6tag.append(h6Text);

          PANEL.appendChild(h6tag);
      }
  });
   
}


    
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample


    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
 

  // user input from dropdown - fills in url 
  // var sample? to fill in? 

// ???? 

 
 

  //
  

  

    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
// }


// Get new data whenever the dropdown selection changes


function getData(route) {
  // Use a request to grab the json data needed for all charts
    // console.log(route);
  d3.json(`/sample/${sample}`).then(function(data) {
    console.log("newdata", data);
    buildMetaData(data);
  });
}



// function getData(route) {
//   console.log(route);
//   d3.json(`/${route}`).then(function(data) {
//     console.log("newdata", data);
//     updatePlotly(data);
//   });
// }


// function getData(sample, callback) {
//   Plotly.d3.json(`/samples/${sample}`, function(error, sampleData) {
//       if (error) return console.warn(error);

//       Plotly.d3.json('/otu', function(error, otuData) {
//           if (error) return console.warn(error);
//           callback(sampleData, otuData);
//       });
//   });


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

// var sampleData = "/samples/sample>";
//   // d3.json(sampleData).then(function(response) {

//     console.log(sampleData);



    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


function getOptions() {

  // Grab a reference to the dropdown select element
  var selector = document.getElementById('selDataset');

  // Use the list of sample names to populate the select options
  Plotly.d3.json('/names', function(error, sampleNames) {
      for (var i = 0; i < sampleNames.length;  i++) {
          var currentOption = document.createElement('option');
          currentOption.text = sampleNames[i];
          currentOption.value = sampleNames[i]
          selector.appendChild(currentOption);
      }
      console.log('/names');
      getData(sampleNames[0], buildCharts);
  })
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
