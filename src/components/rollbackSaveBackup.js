module.exports = { rollbackSaveBackup };

const vscode = require('vscode');
const { executeCommand } = require('../utils/executeCommand');

// 回滚时备份当前文档
function rollbackSaveBackup(file) {
    // 配置：备份路径
    const rollbackAutoSavePath = vscode.workspace.getConfiguration().get('skysource2030.rollbackAutoSavePath');

    // 检查备份路径是否为空
    if (!rollbackAutoSavePath) {
        vscode.window.showErrorMessage('请设置备份路径或关闭备份开关');
        return;
    }
    // 如果没有路径就创建一个
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    let date = year * 10000 + month * 100 + day;

    // 删除旧的备份
    const pathDel1 = rollbackAutoSavePath + '\\' + (date - 2).toString();
    const pathDel2 = rollbackAutoSavePath + '\\' + (date - 3).toString();
    const delCommand = 'rm -rf \'' + pathDel1 + '\' \'' + pathDel2 + '\'';
    executeCommand(delCommand);

    // 创建备份目录
    const pathBackup = rollbackAutoSavePath + '\\' + date.toString();
    const mkdirCommand = 'mkdir -p \'' + pathBackup + '\'';
    executeCommand(mkdirCommand);
    // 备份当前文档
    const BackupCommand = 'cp \'' + file + '\' -t \'' + pathBackup + '\'';
    executeCommand(BackupCommand);
    // vscode.window.showInformationMessage(`已备份当前文档至${pathBackup}`);
}