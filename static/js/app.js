function buildMetadata(sample) {
   // clear data 
  METATABLE.html(""); 

  d3.json(`/metadata/${sample}`).then((data) => {

 

     // Use `d3.json` to fetch the metadata for a sample
    var METATABLE = d3.select("#sample-metadata"); 
    

    //add each key/value pair ot panel 

    Object.entries(data).forEach(([key, value]) =>{
      //append tags for each entry in metadata
      METATABLE.append("h6").text(`${key}:${value}`); 
      console.log(key, value); 
    }); 
  });
  
}

function buildCharts(sample) {
   
    // get this data 
    // "otu_ids": sample_data.otu_id.values.tolist(),
    // "sample_values": sample_data[sample].values.tolist(),
    // "otu_labels": sample_data.otu_label.tolist(),

    d3.json(`/samples/${sample}`).then((data) => {
      const otu_ids = data.otu_ids; 
      const otu_labels = data.otu_labels; 
      const sample_values = data.sample_values; 
      // console.log(otu_ids, otu_labels, sample_values); 
 
        
      //bubblechart!

      var bubbleChart = {
            margin: {t: 0}, 
            xaxis: {title: "OTU ID"}
        }; 

      var bubbleData = [
         {x: otu_ids, 
          y: sample_values, 
          text: otu_labels, 
          mode: "markers", 
          marker: {
            size: sample_values, 
            color: otu_ids, 
            colorscale: "Jet"
         }
        } 
      ]; 


      //make teh bubble chart 
      
      Plotly.plot("bubble", bubbleData, bubbleChart); 

      //piechart!
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      var pieData = [
        {values: sample_values.slice(0, 10), 
          labels: otu_ids.slice(0, 10), 
          type: "pie"
        }
      ]; 

      var pieChart = {margin: { t: 0, l: 0}}; 
  
    Plotly.plot("pie", pieData, pieChart); 

  })
  

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

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();