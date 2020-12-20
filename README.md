# Network Graphs
> The easy way to visualize CSV data as a network graph

Create an animated force-directed network graph in the browser, consisting of nodes with connecting arrows, text labels and color. The nodes are force-directed i.e. they respond to clicking and dragging mouse actions.

<div align="center">
  
[![View site - GH Pages](https://img.shields.io/badge/View_site-GH_Pages-green?style=for-the-badge)](https://michaelcurrin.github.io/network-graphs/)

</div>


## Purpose

I've built this project as a wrapper on the D3 library which allows me to easily point to a CSV dataset, configure some parameters and then show the visualization in the browser.

The reason I made it is that I have a couple of personal projects which have data which is ideal for making network graphs. But this type of graph is not often found in the dashboard tools I've used. Although there is one in Google Fusion Tables which reads CSV data and can be easily configured, unfortunately Google is retiring that system.

## Installation

Clone the repo.

There are no dependencies to install.

## Usage

Start a server in the root of the project.

If you have Python 3 installed, that's a good choice. Here's a shortcut, using [Makefile](/Makefile).

```sh
$ make serve
```


## Deploy
> Setup the site on GH Pages

1. Fork the project.
2. Go to Settings of your repo.
3. Setup _GitHub Pages_ using `master` and project root.
4. Wait for your build to complete in the Environment tab on the repo main page. 
5. Then click _View Deployment_ to find your URL.


## Resources

I found these code samples and they have been extremely useful.

- [Force-directed graph with arrows](http://bl.ocks.org/jhb/5955887)
- [Process CSV data](https://bl.ocks.org/mbostock/2949937)


## License

Released under [MIT](/LICENSE).
