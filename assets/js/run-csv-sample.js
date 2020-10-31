var filePath = "assets/data/sample.csv";
csv(filePath)
  .then(d => draw(d, true));
