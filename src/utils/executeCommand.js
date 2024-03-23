module.exports = { executeCommand };

const { getTerminal } = require('./getTerminal');

// 执行终端命令
function executeCommand(command, options) {
    const terminal = getTerminal(options);

    terminal.sendText(command, true);
}