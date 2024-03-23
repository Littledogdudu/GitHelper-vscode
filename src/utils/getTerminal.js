const vscode = require('vscode');
const { v4 } = require('uuid');

let terminal = null;
const uniqueTerminalId = v4();

// execFile?

// function executeTask(command) {
//     const tmpUUID = v4();
//     const task = new vscode.Task(
//         { type: 'Shell' },
//         vscode.TaskScope.Workspace,
//         'git add' + tmpUUID,
//         'git',
//         new vscode.ShellExecution(command)
//     );

//     // Execute the task
//     vscode.tasks.executeTask(task);
//     // Listen for the end of the task
//     const listener = vscode.tasks.onDidEndTaskProcess((event) => {
//         if (event.execution.task.name === ('git add' + tmpUUID)) {
//             // Dispose of the output channel when the task ends
//             event.execution.terminate();
//             listener.dispose();
//         }
//     });
// }

function getTerminal() {
    const terminalName = `Terminal${uniqueTerminalId}`;
    if (vscode.window.terminals.map(item => item.name).indexOf(terminalName) < 0) {
        // 终端被关闭就重建一个
        terminal = vscode.window.createTerminal(terminalName);
    }
    return terminal;
}

function closeTerminal() {
    if (terminal) {
        terminal.dispose();
        terminal = null;
    }
}

module.exports = {
    uniqueTerminalId,
    getTerminal,
    closeTerminal
};