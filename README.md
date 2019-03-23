# Network graphs
> D3 wrapper for visualizing CSV data as a network graph

Create an animated network graph in the browser, consisting of nodes with connecting arrows, text labels and color. The nodes are force-directed i.e. they respond to clicking and dragging mouse actions.

See the project hosted here, using Github Pages: https://michaelcurrin.github.io/network-graphs/ .

## Purpose

I've built this project as a wrapper on the D3 library which allows me to easily point to a CSV dataset, configure some parameters and then show the visualization in the browser.

The reason I made it is that I have a couple of personal projects which have data which is ideal for making network graphs. But this type of graph is not often found in the dashboard tools I've used. Although there is one in Google Fusion Tables which reads CSV data and can be easily configured, unfortunately Google is retiring that system.

## Usage

```bash
$ bin/serve.sh
```

## References

I found these code samples and they have been extremely useful.

- Force-directed graph with arrows http://bl.ocks.org/jhb/5955887
- Process CSV data https://bl.ocks.org/mbostock/2949937
