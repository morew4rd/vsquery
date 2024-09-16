const vscode = require("vscode");

function activate(context) {
  // Create an output channel
  const outputChannel = vscode.window.createOutputChannel("vsquery");

  let disposable = vscode.commands.registerCommand('vsquery.executeSnippet', async () => {
    const snippet = await vscode.window.showInputBox({
      prompt: 'Enter a JavaScript snippet to execute',
      placeHolder: 'e.g., console.log("Hello, World!");'
    });

    if (snippet) {
      try {
        // Execute the snippet in a safe context
        const result = eval(snippet);

        // Write the result to the output channel
        outputChannel.clear();
        outputChannel.appendLine(`Snippet executed successfully. Result: ${result}`);
        outputChannel.show(true); // Show the output channel
      } catch (error) {
        // Write the error to the output channel
        outputChannel.clear();
        outputChannel.appendLine(`Error executing snippet: ${error.message}`);
        outputChannel.show(true); // Show the output channel
      }
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};