// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let terminal = null;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('接下来就由我来接管主人的git add的工作喽!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('githelper.extension.rollback', () => {
		// 获取当前活动文档
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // 没有打开的活动文档
		}

		// 获取活动文档的绝对路径
		const documentPath = editor.document.uri.fsPath;
		// 配置：是否在回滚时备份当前文档
		const rollbackAutoSave = vscode.workspace.getConfiguration().get('skysource2030.rollbackAutoSave');
		if (rollbackAutoSave) {
			rollbackSaveBackup(documentPath);
		}

		// 执行git checkout HEAD命令
		executeGitCommand(`git checkout HEAD '${documentPath}'`, "");
	});

	context.subscriptions.push(disposable);

	// rollback回滚
	async function executeGitCommand(command, options) {
		if (!terminal) {
			terminal = vscode.window.createTerminal(options);
		}

		terminal.sendText(command);
	}

	// 回滚时备份当前文档
	async function rollbackSaveBackup(file) {
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
		terminal.sendText(delCommand);

		// 创建备份目录
		const pathBackup = rollbackAutoSavePath + '\\' + date.toString();
		const mkdirCommand = 'mkdir -p \'' + pathBackup + '\'';
		terminal.sendText(mkdirCommand);
		// 备份当前文档
		const  BackupCommand = 'cp \'' + file + '\' -t \'' + pathBackup + '\'';
		terminal.sendText(BackupCommand);
		vscode.window.showInformationMessage(`已备份当前文档至${pathBackup}`);

		terminal.show();
	}
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
