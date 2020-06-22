
// Create a dropdown menu of all ID's
// Grab info from each ID 
// Make a plot corresponding to that ID info
    // Bar Chart
        // Need to sort the data by top 10 OTU's. This is sorting and splicing.
    // Bubble scatter plot
        // Display all samples

// Display sample metadata (individuals demographic info)
    // Find the html element to append values of information 
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

    showGraphs(namesDataset[0]);
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
    showGraphs(name);
    showPanel(name);
}
//When an ID is selected, filter all data to show graphs relating to that ID
function showGraphs(name) {
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

        var bubbleData = [{
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            },
            text: sample.otu_labels
        
        }];
        
        // set the layout for the bubble plot
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
    
        
        // create the bubble plot
        Plotly.newPlot("bubble", bubbleData, layout2); 
    })
}