<h1 align="center">
  Korgin
</h1>

<h4 align="center">
  Korgin, is a cli application for managing a reading list of bookmarks from the Internet.
</h4>

<div align="center">
  <img alt="Boards" width="60%" src="./screenshot.png"/>
</div>

## Install

### Yarn

```bash
yarn global add korgin
```

### NPM

```bash
npm install --global korgin
```

## Usage

```
$ korgin --help
Usage: index [options] [command]

Options:
  -h, --help                             display help for command

Commands:
  list [options]                         display all bookmarks
  add <url> [tags...]                    add new bookmark
  delete <id>                            delete bookmark
  read <id>                              read bookmark offline
  open <id>                              open bookmark url in browser
  archive <id>                           archive/restore bookmark
  star <id>                              star/Unstar bookmark
  add-tags|add-tag <id> [tags...]        add tags to bookmark
  remove-tags|remove-tag <id> [tags...]  remove tags from bookmark
  help [command]                         display help for command

Examples:
  list -t
  list @programming -s
  list -d
  add https://dev.to/simonholdorf/9-projects-you-can-do-to-become-a-frontend-master-in-2020-n2h @programming @frontent
  delete 2
  read 1
  open 1
  archive 2
  star 1
  add-tags 2 @coding
  remove-tags 2 @coding
```

## Highlights
- Organize bookmarks, add, edit, delete and search
- Archive and restore bookmarks
- Star & unstar mechanisms
- Simple and minimal command line interface
- Uses sqlite3 as its database
- Reading bookmarks offlane
- Make bookmarks more readable by removing extra stuffs

## Todos
- Importing bookmark from other bookmark managers like pocket
- Better styles
- Better configuration through a config file and init command
- More view options, board view, etc

## Development

Any contribution, pull requests, issue and feedbacks would be greatly appreciated.

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd taskbook`
- Install the project dependencies: `npm install` or `yarn install`

## License

[MIT](https://github.com/majidsajadi/korgin/blob/master/license)