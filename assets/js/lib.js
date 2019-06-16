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

    nodelabels.attr("x", d => d.x)
        .attr("y", d => d.y);

    edgepaths.attr('d', function (d) {
        var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        return path;
    });
}


/**
 * Render network graph in target SVG using specified dataset.
 *
 * @param {Object} dataset The expected structure is detailed below. There can be any number of
 *     elements in the nodes and edges arrays.
 *     {
 *          nodes: [
 *              {
 *                  name: String
 *              },
 *              ...
 *          ],
 *          edges [
 *              {
 *                  source: Number   // Index of element in nodes array.
 *                  target: Number   // As above.
 *              },
 *              ...
 *          ]
 *     }
 */
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
    };

    svg.append('defs').append('marker')
        .attr(arrowProperties)
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#ccc')
        .attr('stroke', '#ccc');

    force.on("tick", () => tick(edges, nodes, nodelabels, edgepaths));
}


/**
 * Convert links to nodes.
 *
 * Extract nodes and unique names used across the source and target pairs of the links.
 *
 * The links object passed in by reference is also updated, such that source or target string on
 * each element is replaced with an associative array.
 *
 * Return nodes as an array, where each element is an assocative array with key as value and
 * value as the name taken from a link source and target.
 */
function toNodes(links) {
    var nodes = {};

    /**
     * Get a node value by name if set, otherwise set it.
     *
     * Note that type will be set initially and if the later type is different it will be ignored.
     * So nodes which appear in both columns will have an unreliable type, which is fine for
     * a single color graph of one type of node (e.g. person) but not a two color graph (e.g. person
     * and message).
     */
    function getOrSetNode(name, type) {
        return nodes[name] || (nodes[name] = {
            name: name,
            type: type,
        });
    }

    links.forEach(link => {
        link.source = getOrSetNode(link.source, 'source');
        link.target = getOrSetNode(link.target, 'target');
    });

    return d3.values(nodes);
}


/**
 * Convert CSV data to a dataset containing nodes and edges.
 *
 * Read a CSV with source and destination columns and convert to dataset with keys as edges
 * and nodes. A name may be repeated across the source or target columns but will appear
 * as a unique name in the nodes data. The edges data contains references to IDs in the nodes array.
 *
 * @param {String} filePath Name of CSV file with header to read in. Must have the following
 *      columns and any number of rows:
 *          source
 *          target
 */
function csv(filePath) {
    return new Promise(resolve => {
        d3.csv(filePath, (error, links) => {
            if (error)
                throw error;

            var nodes = toNodes(links);
            var dataset = {
                nodes: nodes,
                edges: links
            };
            resolve(dataset);
        })
    });
}
