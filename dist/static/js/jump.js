function goAddress(path, blank) {
  let protocol = window.location.protocol
  let host = window.location.host
  let url = `${protocol}//${host}${path}`
  if(blank) {
    window.open(url);
  }else {
    window.location.href = url
  }
}
