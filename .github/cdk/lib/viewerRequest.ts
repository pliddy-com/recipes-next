function handler(event) {
  const request = event.request;
  const uri = request.uri;

  const rewrites = [
    ['/categories/', '/tag/'],
    ['/cuisine/', '/tag/'],
  ];

  // handle rewrites
  rewrites.forEach((rewrite) => {
    const [original, revision] = rewrite;

    if (request.uri.includes.original) {
      request.uri.replace(original, revision);
    }
  });

  // Check whether the URI is missing a file name.
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
