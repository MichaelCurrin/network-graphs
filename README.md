# Network graphs
> D3 wrapper for visualizing CSV data as a network graph

Creates an animated network graph in the browser, consisting of nodes with connecting arrows, text labels and color. The nodes are force-directed i.e. they respond to clicking and dragging mouse actions.

## Purpose

I have a couple of personal projects which have data which is great for making network graphs. But that kind of graph is not found in the dashboard tools I've used. There is one in Google Fusion Tables which reads CSV data and can be easily customized - unfortunately Google is retiring that system.

So I've built my wrapper on the D3 library which allows me to easily point to a CSV dataset, configure some parameters and then show the visualization in the browser.

## Usage

```bash
$ bin/serve.sh
```

## References

I found these code samples and they have been extremely useful.

- Force-directed graph with arrows http://bl.ocks.org/jhb/5955887
- Process CSV data https://bl.ocks.org/mbostock/2949937
