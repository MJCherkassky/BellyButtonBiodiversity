
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

d3.json("samples.json").then((data) => {
    console.log(data)
    var sampleDataset = data.samples;
    var namesDataset = data.names;

    //Load all ID's into dropdown menu

    var dropdown = d3.select("#selDataset");
    var option;
    for (var i = 0; i < namesDataset.length; i++) {
        option = dropdown.append("option").text(namesDataset[i])
    };

    showBars(namesDataset[0]);
    showPanel(namesDataset[0]);
})

function showPanel(name) {
    d3.json("samples.json").then((data) => {
        var metaset = d3.select("#sample-metadata")
        var panelb = metaset.selectAll("p")
        panelb.remove();

        var intname = parseInt(name);
        var sample = data.metadata.filter(m => m.id === intname)[0];
        
        Object.entries(sample).forEach(function([key, value]) {
            var cell = metaset.append("p");
            cell.text(`${key}: ${value}`)
        })
    })
}

// Make change function so all graphics change to your selected "ID" from the dropdown
function optionChanged() {
    var name = d3.select("#selDataset").node().value;
    console.log(name);
    showBars(name);
    showPanel(name);
    

}
Change(941)
function showBars(name) {
    d3.json("samples.json").then((data) => {
        var sample = data.samples.filter(obj => obj.id ==name)[0];

        var barData = [
            {
                y: sample.otu_ids.slice(0,10).reverse().map(obj => `OTU ${obj}`),
                x: sample.sample_values.slice(0,10).reverse(),
                text: sample.otu_labels.slice(0,10).reverse(),
                orientation: "h",
                type:"bar"
            }
        ]

        var layout = {
            title: `Top 10 Cultures in ID# ${name}`
        }

        Plotly.newPlot("bar", barData, layout);
    })
}







































// // Init your data load and append list of subject ID's to dropdown
// function loadDropdown() {
//     // select dropdown menu 
//     var dropdown = d3.select("#selDataset");
//     d3.json("samples.json").then((data)=> {

//         // get the id data to the dropdwown menu
//         data.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value");
//         });
//         // call the functions to display the data and the plots to the page
        
        
//     });
// }

// loadDropdown();

// function unpack(keys, index) {
//     return keys.map(key => key[index]);
    
// }


// function makeDemoInfo(id) {
//     d3.json("./samples.json").then((data) => {
//         // filter samples by ID to grab demographic Info
//         var demoInfo = data.metadata.filter(s => s.id === id)[0];
//         // data.forEach((id) => {
//         //     selection.append("option")
//         //         .text(id)
//         //         .property("value",id)
//         // })
//         var selection = d3.select("#sample-metadata");

//         selection.html("");

//         Object.entries(demoInfo).forEach((key) => {
//             selection.append("h5").text(key[0] + ": " + key[1] + "\n")
//         });
//     })
// }

// makeDemoInfo(941)

// // One function, all charts 
// function makePlots(id) {
//     // log data
//     d3.json("./samples.json").then((data) => {

//         console.log(data)
//         // // filter samples by ID to grab respective info
//         var demoInfo = data.metadata.filter(s => s.id === id)[0];
        
//         let idSample = data.samples.filter(s => s.sample_values)
//         console.log(idSample)

//         let SampleId = idSample.map(v => v.sample_values)
//         // console.log(SampleId)
//         var Samples = SampleId[0].slice(0,10).reverse()
//         console.log(Samples)

//         let otu_ids = idSample.map(otu => otu.otu_ids)
//         // console.log(otu_ids)
//         var otuId = otu_ids[0].slice(0,10).reverse()
//         console.log(otuId)

//         let otu_labels = idSample.map(labels => labels.otu_labels)
//         // console.log(otu_labels)
//         var labels = otu_labels[0].slice(0,10).reverse()
//         console.log(labels)
        

//         //Create chart using values logged above
//         var dataChart = {
//             x: Samples,
//             y:`${otuId}`,
//             text: `${labels}`,
//             // orientation: 'h',
//             type:"bar",
//             hovertext: labels
            
//         };

//         layout = {
//             title: "Top Cultures",
//             hovertext: labels,
//             // yaxis:`OTU: ${otuId}`
//         }

//         var dataArray = [dataChart]
//         Plotly.newPlot('bar',dataArray, layout)
//     })
    
// }

// makePlots(941)