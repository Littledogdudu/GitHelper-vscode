module.exports = { autoAdd };
const vscode = require('vscode');
const { executeCommand } = require('../utils/executeCommand');

function autoAdd() {
    // TODO 监听文件更改
    vscode.workspace.onDidChangeTextDocument((e) => {
        const fileName = e.document.fileName;
        vscode.window.showInformationMessage(`File ${fileName} changed. Running git add...`);
        runGitAdd(fileName);
    });

    // 监听文件创建
    vscode.workspace.onDidCreateFiles((e) => {
        const fileNames = e.files.map((file) => file.fsPath);
        vscode.window.showInformationMessage(`Files created: ${fileNames.join(', ')}. Running git add...`);
        runGitAdd(fileNames);
    });

    // 监听文件删除
    vscode.workspace.onDidDeleteFiles((e) => {
        const fileNames = e.files.map((file) => file.fsPath);
        vscode.window.showInformationMessage(`Files deleted: ${fileNames.join(', ')}. Running git add...`);
        runGitAdd(fileNames);
    });
}

function runGitAdd(filePaths) {
    if (Array.isArray(filePaths)) {
        let command = 'git add \'';
        command += filePaths.join('\' \'');
        command += '\'';
        executeCommand(command, null);
    } else {
        executeCommand('git add \'' + filePaths + '\'', null);
    }
}