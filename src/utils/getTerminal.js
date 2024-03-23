module.exports = { getTerminal };

const vscode = require('vscode');
let terminal = null;

function getTerminal(options) {
    if (!terminal) {
        terminal = vscode.window.createTerminal(options);
    }
    return terminal;
}