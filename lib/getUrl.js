function getUrl(req){
    const protocol = req.protocol;
    const host = req.get('host');
    const originalUrl = req.originalUrl;
    const completeUrl = `${protocol}://${host}${originalUrl}`;
    return completeUrl;
}

module.exports = getUrl;
