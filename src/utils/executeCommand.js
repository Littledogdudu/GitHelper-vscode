const { getTerminal } = require('./getTerminal');

// 执行终端命令
function executeCommand(command) {
    const terminal = getTerminal();
    terminal.sendText(command);
}

module.exports = {
    executeCommand
};