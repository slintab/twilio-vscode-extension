// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { twilioOpenTemplateHandler } from "./commands/exchange";
import {
  twilioOpenConsoleHandler,
  twilioOpenDocsHandler,
  twilioOpenExchangeHandler,
  twilioOpenHelpHandler,
  twilioOpenTwiliocomHandler,
} from "./commands/links";
import { ExchangeTreeDataProvider } from "./views/exchangeView";
import { LinksTreeDataProvider } from "./views/linksView";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const cmdOpenTwiliocom = vscode.commands.registerCommand(
    "twilio.open.twiliocom",
    twilioOpenTwiliocomHandler
  );
  context.subscriptions.push(cmdOpenTwiliocom);

  const cmdOpenExchange = vscode.commands.registerCommand(
    "twilio.open.exchange",
    twilioOpenExchangeHandler
  );
  context.subscriptions.push(cmdOpenExchange);

  const cmdOpenConsole = vscode.commands.registerCommand(
    "twilio.open.console",
    twilioOpenConsoleHandler
  );
  context.subscriptions.push(cmdOpenConsole);

  const cmdOpenDocs = vscode.commands.registerCommand(
    "twilio.open.docs",
    twilioOpenDocsHandler
  );
  context.subscriptions.push(cmdOpenDocs);

  const cmdOpenHelp = vscode.commands.registerCommand(
    "twilio.open.help",
    twilioOpenHelpHandler
  );
  context.subscriptions.push(cmdOpenHelp);

  const cmdOpenTemplate = vscode.commands.registerCommand(
    "twilio.open.template",
    twilioOpenTemplateHandler
  );
  context.subscriptions.push(cmdOpenTemplate);

  vscode.window.registerTreeDataProvider("links", new LinksTreeDataProvider());
  vscode.window.registerTreeDataProvider(
    "codeExchange",
    new ExchangeTreeDataProvider()
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
