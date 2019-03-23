#!/bin/bash
# Serve the assets in the public directory on port 8888 with a Python 3 server.

cd public
python3 -m http.server 8888
