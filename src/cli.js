const program = require('commander');
const commands = require('./commands');
const initServer = require('./server');

program
  .command('list')
  .description('display bookmarks')
  .option('-s, --star', 'starred bookmarks')
  .option('-a, --archive', 'archived bookmarks')
  .action(commands.listBookmarks);

program
  .command('show <id>')
  .description('display a bookmark')
  .action(commands.showBookmark);

program
  .command('add <url> [tags...]')
  .description('add new bookmark')
  .action(commands.addBookmark);

program
  .command('delete <id>')
  .description('delete bookmark')
  .action(commands.deleteBookmark);

program
  .command('star <id>')
  .description('star/unstar bookmark')
  .action(commands.starBookmark);

program
  .command('archive <id>')
  .description('archive/restore bookmark')
  .action(commands.archiveBookmark);

program
  .command('set-tags <id> [tags...]')
  .alias('set-tag')
  .alias('set')
  .description('set bookmark tags')
  .action(commands.setTags);

program
  .command('open <id>')
  .description('open bookmark url in browser')
  .action(commands.openBookmark);

program
  .command('read <id>')
  .description('read bookmark offline')
  .action(commands.readBookmark);

program
  .command('run')
  .description('run paperboard web application')
  .action(initServer);

program.parse(process.argv);
