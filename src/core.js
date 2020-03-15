const axios = require('axios')
const url = require('url')
const path = require('path')
const os = require('os')
const fs = require('fs')
const open = require('open')
const ejs = require('ejs')
const JSDOM = require('jsdom').JSDOM;
const Readability = require('./vendor/readability');

const fetchBookmark = async (url) => {
    try {
        const res = await axios({
            method: 'get',
            url
        })

        return res.data
    } catch (error) {
        throw new Error("Downloading bookmark failed")
    }
}

const parseBookmarkContent = (raw) => {
    try {
        const doc = new JSDOM(raw);

        const reader = new Readability(doc.window.document);
        const parsed = reader.parse();

        return parsed
    } catch (error) {
        throw new Error("Parsing bookmark failed")
    }
}

const parseTag = (tag) => {
    if (tag.indexOf('@') === -1) {
        throw new Error("Tag is not valid")
    } 

    return tag.replace('@', '')
}

const parseTags = (tags) => {
    try {
        const parsedTags = []
        tags.forEach(tag => {
            if (tag.indexOf('@') > -1) {
                parsedTags.push(tag.replace('@', ''))
            }
        })

        return parsedTags
    } catch (error) {
        throw new Error("Parsing tags failed")
    }
}

const parseUrl = (urlStr) => {
    try {
        const parsed = url.parse(urlStr)

        const { href, hostname } = parsed

        if (!href || !hostname) {
            throw new Error("URL is not valid")
        }

        return {
            href,
            hostname
        }

    } catch (error) {
        throw new Error("URL is not valid")
    }
}

const openBrowser = async (url) => {
    try {
        await open(url);
    } catch (error) {
        throw new Error('Opening bookmark failed')
    }
}

const makeTempFile = async (bookmark) => {
    try {
        const templatePath = getTemplatePath()
        const template = await read(templatePath)
        const tempFile = getTempPath()
        const stylePath = getStylePath()
        const data = ejs.render(template, { 
            title: bookmark.title,
            content: bookmark.content,
            stylePath
        });
        await write(tempFile, data)
        return tempFile
    } catch (error) {
        throw new Error('Generating bookmark file failed')
    }
}

const getTemplatePath = () => {
    const templatePath = path.join(__dirname, 'assets', 'template.ejs')

    return templatePath
}

const getStylePath = () => {
    return path.join(__dirname, 'assets', 'mithqal.css')
}

const getTempPath = () => {
    const appDir = getAppDir()
    const tempFile = path.join(appDir, 'temp.html')

    return tempFile
}

const getAppDir = () => {
    const appDirectory = path.join(os.homedir(), '.korgin');

    if (!fs.existsSync(appDirectory)) {
        fs.mkdirSync(appDirectory);
    }

    return appDirectory
}

const getDatabasePath = () => {
    const appDir = getAppDir()
    const databasePath = path.join(appDir, 'korgin.sqlite')
    return databasePath
}

const read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

const write = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

module.exports = {
    fetchBookmark,
    parseBookmarkContent,
    parseTags,
    parseTag,
    parseUrl,
    openBrowser,
    makeTempFile,
    getDatabasePath
}