// Load JSON data and populate console.log

// Create a dropdown menu of all ID's
// Grab info from each ID 
// Make a plot corresponding to that ID info
    // Bar Chart
        // Need to sort the data by top 10 OTU's. This is sorting and splicing.
    // Bubble scatter plot
        // Display all samples

// Display sample metadata (individuals demographic info)
    // Find the html element to append a list of information
// Make a change function
    // repopulates the info pulled on a new ID
    // Updates the chart

// 

// Init your data load and append list of subject ID's to dropdown
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        // call the functions to display the data and the plots to the page
        
    });
}

init();


// One function, all charts 
function makePlots(id) {
    // log data
    d3.json("./samples.json").then((data) => {

        // filter samples by ID to grab demographic Info
        var demoInfo = data.metadata.filter(s => s.id === id)[0];
        
        let idSample = data.samples.filter(s => s.sample_values)
        console.log(idSample)
        
        let SampleId = idSample.map(v => v.sample_values)
        // console.log(SampleId)
        var top10Samples = SampleId.slice(0,10).reverse()
        console.log(top10Samples)

        let otu_ids = idSample.map(otu => otu.otu_ids)
        // console.log(otu_ids)
        var top10OTUid = otu_ids.slice(0,10).reverse()
        console.log(top10OTUid)

        let otu_labels = idSample.map(labels => labels.otu_labels)
        // console.log(otu_labels)
        var top10Labels = otu_labels.slice(0,10).reverse()
        console.log(top10Labels)
        
        var selection = d3.select("#sample-metadata");
        selection.html("");

        var trace1 = {
            type: "bar",
            orientation: "h",
            x:top10Samples,
            y:top10OTUid
        }
        layout = {

        }
 
        var chartData = [trace1]


        Plotly.newPlot("bar", chartData, layout);

        Object.entries(demoInfo).forEach((key) => {
            selection.append("h5").text(key[0] + ": " + key[1] + "\n")
        });
    })
    
}

makePlots(940)


// data.samples.sample_values.map(sv => sv.sample_values)
//         console.log(sample_values)

// d3.json("samples.json").then((data) => {
//     // console.log(data)

//     //Grab values from JSON response object to build plot
//     // var samples = data.samples.filter(s => s.id.toString() === id)[0]
//     // console.log(samples)
    
//     var otu_ids = data.samples.otu_ids;
//     var otu_labels = data.samples.otu_labels;
//     //Create trace
//     // console.log(sample_values);
//     // console.log(otu_ids)
//     // console.log(otu_labels)
    
//     var trace1 = {
//         x: sample_values,
//         y: otu_ids,
//         orientation: 'h',
//         hovertemplate: `${otu_labels}: ${sample_values}`,
//         type: 'bar'
//     }

//     var dataOTU = [trace1];
//     var layout = {
//         title: "Top Cultures in Sample"
//     };

//     Plotly.newPlot("bar", dataOTU, layout);
// });

// We need to get all individual ID data, so we have to go into the metadata and store info
// Need to make this a function because it will run every time id changes
// function getInfo(id) {
//     d3.json("samples.json").then((data) => {
//         var metadata = data.metadata;
//         // console.log(metadata);
//         //Filter metadata by id
//         var idInfo = metadata.filter(m => m.id.toString() === id)[0];
//         // Select element to show data
//         var demoInfo = d3.select("sample-metadata");
//         // Reset info panel before each refresh
//         demoInfo.html("");
//         // Grab pertinent info from data for the id and add to the info panel
//         Object.entries(data).forEach(([key, value]) => {
//             demoInfo.append("h5").text(`${key}: ${value}`)
//         });
//     });
// }

// getInfo();

// data.names
// data.metadata.(id, ethnicity, gender, age, location, bbtype, wfreq)
// data.samples