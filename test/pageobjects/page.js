module.exports = class Page {
    open (path) {
        return browser.url(`https://franco-trackgenix-app.vercel.app//${path}`)
    }
}
