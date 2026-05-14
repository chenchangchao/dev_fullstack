export default async function getReq(req, res) {
  const baseURL = req.url.substr(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/").pop();
  const regexV4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.movies)); // Convert object to JSON string
    return;
  }

  if (baseURL !== "/api/movies/") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" })); // Convert object to JSON string
    return;
  }

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Error",
        message: "UUID is not valid",
      })
    ); // Convert object to JSON string
    return;
  }

  const filteredMovie = req.movies.filter((m) => {
    return m.id === id;
  });
  if (filteredMovie.length > 0) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filteredMovie));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
  }
}
