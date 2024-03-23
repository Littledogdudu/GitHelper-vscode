const vscode = require('vscode');
const { executeCommand } = require('../utils/executeCommand');

const fileSystemWatcher = vscode.workspace.createFileSystemWatcher('**/*');
let ignoreList;
const ignoreListListener = vscode.workspace.onDidChangeConfiguration(() => {
    ignoreList = vscode.workspace.getConfiguration().get('skysource2030.ignoreList');
});

function containsAny(str, substrings) {
    return substrings.some(sub => str.includes(sub));
}

function autoAdd() {
    // 使用workspace.createFileSystemWatcher创建文件系统观察者
    
    // 监听文件的创建、更改和删除事件
    fileSystemWatcher.onDidChange(uri => {
        if (containsAny(uri.fsPath, ignoreList)) {
            return;
        }
        runGitAdd(uri.fsPath);
    });
    
    fileSystemWatcher.onDidCreate(uri => {
        if (containsAny(uri.fsPath, ignoreList)) {
            return;
        }
        runGitAdd(uri.fsPath);
    });
    
    fileSystemWatcher.onDidDelete(uri => {
        if (containsAny(uri.fsPath, ignoreList)) {
            return;
        }
        runGitAdd(uri.fsPath);
    });
    
    return fileSystemWatcher;
}

function runGitAdd(filePath) {
    const msg = vscode.window.setStatusBarMessage(`正在添加文件 ${filePath} 到暂存区...`);
    executeCommand('git add \'' + filePath + '\'');
    msg.dispose();
}

module.exports = {
    ignoreListListener,
    autoAdd
};