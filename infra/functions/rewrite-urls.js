// CloudFront Function (viewer-request) — clean URL rewriting.
// Maps extensionless / directory-style requests to the underlying .html object
// in S3, so visitors see /about-us instead of /about-us.html.
//
// Rules:
//   /                     -> /index.html
//   /about-us             -> /about-us.html
//   /about-us/            -> /about-us.html
//   /assets/styles.css    -> unchanged (has a file extension)
//   /logo.svg             -> unchanged (has a file extension)
//   /about-us.html        -> unchanged (already explicit)
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Root -> index
  if (uri === '/' || uri === '') {
    request.uri = '/index.html';
    return request;
  }

  // Directory-style: /path/ -> /path.html
  if (uri.endsWith('/')) {
    request.uri = uri.slice(0, -1) + '.html';
    return request;
  }

  // Extensionless path -> append .html
  // (only when the last segment has no "." i.e. no file extension)
  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  }

  return request;
}
