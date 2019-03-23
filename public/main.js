/**
 * Main network graphing script.
 */
const w = 1280;
const h = 720;
const linkDistance = 10;


/** Handle object movement. **/
function tick(edges, nodes, nodelabels, edgepaths) {
    edges.attr({
        "x1": function (d) {
            return d.source.x;
        },
        "y1": function (d) {
            return d.source.y;
        },
        "x2": function (d) {
            return d.target.x;
        },
        "y2": function (d) {
            return d.target.y;
        }
    });

    nodes.attr({
        "cx": function (d) {
            return d.x;
        },
        "cy": function (d) {
            return d.y;
        }
    });

    nodelabels.attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        });

    edgepaths.attr('d', function (d) {
        var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        return path;
    });
}


/** Render network graph in target SVG using specified dataset. **/
function draw(dataset) {
    var svg = d3.select("body").append("svg");
    svg.attr({
        "width": w,
        "height": h,
    });

    var force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.edges)
        .size([w, h])
        .linkDistance([linkDistance])
        .charge([-500])
        .theta(0.1)
        .gravity(0.05)
        .start();

    var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .attr("id", function (d, i) {
            return 'edge' + i;
        })
        .attr('marker-end', 'url(#arrowhead)')
        .style("stroke", "#ccc")
        .style("pointer-events", "none");

    var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .style("fill", '#08c')
        .call(force.drag)
        .attr("r", 8);

    var nodelabels = svg.selectAll(".nodelabel")
        .data(dataset.nodes)
        .enter()
        .append("text")
        .text(function (d) {
            return d.name;
        });

    var edgepaths = svg.selectAll(".edgepath")
        .data(dataset.edges)
        .enter()
        .append('path')
        .style("pointer-events", "none");

    var arrowProperties = {
        'id': 'arrowhead',
        'viewBox': '-0 -5 10 10',
        'refX': 17,
        'refY': 0,
        'orient': 'auto',
        'markerWidth': 10,
        'markerHeight': 10,
        'xoverflow': 'visible',
    }

    svg.append('defs').append('marker')
        .attr(arrowProperties)
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#ccc')
        .attr('stroke', '#ccc');

    force.on("tick", () => tick(edges, nodes, nodelabels, edgepaths));
}


/**
 * Convert CSV data to a dataset containing nodes and edges.
 *
 * Read a CSV with source and destination columns and convert to dataset with keys as edges
 * and nodes. A name may be repeated across the source or target columns but will appear
 * as a unique name in the nodes data. The edges data contains references to IDs in the nodes array.
 */
function csv(filePath) {
    return new Promise(function (resolve) {
        var nodesByName = {};

        d3.csv(filePath, function (error, links) {
            if (error)
                throw error;


            links.forEach(function (link) {
                link.source = nodeByName(link.source);
                link.target = nodeByName(link.target);
            });

            function nodeByName(name) {
                return nodesByName[name] || (nodesByName[name] = {
                    name: name
                });
            }

            var nodes = d3.values(nodesByName);

            var dataset = {
                nodes: nodes,
                edges: links
            }
            resolve(dataset)
        })
    })
}


csv("/sample.csv")
    .then(dataset => draw(dataset));
