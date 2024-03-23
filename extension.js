// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { executeCommand } = require('./src/utils/executeCommand');
const { rollbackSaveBackup } = require('./src/components/rollbackSaveBackup');
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
		executeCommand(`git checkout HEAD '${documentPath}'`, "");
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
