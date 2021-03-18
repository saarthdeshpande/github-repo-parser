const { Octokit } = require("@octokit/core");

class GitHubRepoParser {
    constructor(GITHUB_API_KEY) {
        this.GITHUB_API_KEY = GITHUB_API_KEY;
        this.octokit = new Octokit({ auth: GITHUB_API_KEY });
    }

    getContentsUrl = async (pathsUrl) => {
        return await this.octokit.request(`GET ${pathsUrl}`, {
            owner: this.owner,
            repo: this.repo,
            tree_sha: this.GITHUB_API_KEY
        })
            .then(res => res.data)
    }

    gatherRawUrls = async (listOfFiles, level) => {
        console.log(`Collecting Level #${++level} files.`)
        listOfFiles.map(file => {
            const dotIndex = file.download_url ? file.download_url.lastIndexOf('.') + 1 : file.download_url
            let extension;
            if (file.type === 'file') {
                file.download_url.substring(dotIndex,).includes('/') ? extension = 'Miscellaneous' : extension = file.download_url.substring(dotIndex,)
                this.rawUrls[extension]   // if key exists in dictionary
                    ?
                    this.rawUrls[extension].push(file.download_url)
                    :
                    this.rawUrls[extension] = [file.download_url]
            }
        })
        if (listOfFiles.filter(file => file.type === 'dir').length === 0) {
            return;
        } else {
            for (const dir of listOfFiles
                .filter(file => file.type === 'dir')) {
                await this.gatherRawUrls(await this.getContentsUrl(dir.url), level);
            }
        }
    }

    initializeRepoDetails = (url) => {
        this.rawUrls = {};
        this.url = url;
        this.owner = url.split('https://github.com/')[1].split('/')[0];
        this.repo = url.split('https://github.com/')[1].split('/')[1];
    }

    collectData = async (url) => {
        await this.initializeRepoDetails(url);
        await this.octokit.request(`GET /repos/${this.url.split('https://github.com/')[1]}`, {
            owner: this.owner,
            repo: this.repo,
            tree_sha: this.GITHUB_API_KEY
        })
            .then(res => this.getContentsUrl(res.data.contents_url.split('{+path}')[0]))
            .then(async listOfFiles => await this.gatherRawUrls(listOfFiles, 0))
            .catch(e => console.log(e));
        return this.rawUrls;
    }
}

module.exports = GitHubRepoParser