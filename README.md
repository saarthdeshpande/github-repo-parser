# GitHub Repository Parser

Why parse a repository?
<ul>
<li>To collect all files of a particular repository, flattened and grouped by extension, is too menial to be done manually. 
<li>Grouped files can be used for further analysis / use / testing, based on requirements.
</ul>

How does the parser work?
<ul>
<li>The parser is developed using the GitHub API.</li>
<li>Recursive level-wise file parsing is done to obtain absolute path of each file in the repository.</li> 
<li>Simultaneously, files of each type are grouped together and a dictionary of type { extension: array_of_files } is returned.</li>
</ul>

<h2>Installation</h2>
<code>npm install github-repo-parser</code>


<h2>Illustration</h2>

```jsx
import GitHubRepoParser from 'GitHubRepoParser';

const parser = new GitHubRepoParser(<YOUR_GITHUB_API_KEY>)

(async () => 
    console.log(
        await parser.collectData(<GITHUB_REPOSITORY_URL>)
        )
    )();
```

<h2>Sample Output</h2>
```json5
{
    gitignore: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/.gitignore'
    ],
    md: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/README.md'
    ],
    py: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/bsCLI.py',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/imports.py',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/mail.py',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/model.py',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/preprocess.py',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/views.py'
    ],
    txt: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/fail_body.txt',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/mail_body.txt',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/requirements.txt',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/static/pdf/uploads/dummy.txt'
    ],
    png: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/screenshots/homepage.png',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/screenshots/mail.png'
    ],
    css: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/static/styles/styles.css'
    ],
    html: [
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/templates/public/end_page.html',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/templates/public/upload_pdf.html',
        'https://raw.githubusercontent.com/saarthdeshpande/book-summarizer/master/templates/public/templates/public_template.html'
    ]
}
```