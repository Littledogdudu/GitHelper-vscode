// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { executeCommand } = require('./src/utils/executeCommand');
const { rollbackSaveBackup } = require('./src/components/rollbackSaveBackup');
const { autoAdd } = require('./src/components/autoAdd');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


const registerCommand = (name, callback) => {
	return vscode.commands.registerCommand(`githelper.${name}`, callback);
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('接下来就由我来接管主人的git add的工作喽!');

	// 回滚
	const disposableRollback = registerCommand('rollback', () => {
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
		executeCommand(`git checkout HEAD '${documentPath}'`, null);
	});

	// TODO merge： git stash --> git merge(需要考虑冲突解决) --> git stash pop

	const disposableStash = registerCommand('stash', () => {
		executeCommand('git stash', null);
	});

	const disposableStashPop = registerCommand('stashPop', () => {
		executeCommand('git stash pop', null);
	});

	// 自动git add
	const disposableAutoAdd = registerCommand('autoAdd', () => {
		const gitAutoAdd = vscode.workspace.getConfiguration().get('skysource2030.gitAutoAdd');
		const git = vscode.extensions.getExtension('vscode.git');
		console.log("git", git);
		// if (gitAutoAdd) {
		// 	// 执行git add命令
		// 	autoAdd();
		// }
	});

	context.subscriptions.push(
		disposableRollback,
		disposableStash,
		disposableStashPop,
		disposableAutoAdd
	);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
