import * as vscode from "vscode";

export function twilioOpenTwiliocomHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://twilio.com"));
}

export function twilioOpenConsoleHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://console.twilio.com/"));
}

export function twilioOpenExchangeHandler() {
  vscode.env.openExternal(
    vscode.Uri.parse("https://www.twilio.com/code-exchange")
  );
}

export function twilioOpenHelpHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://support.twilio.com/"));
}

export function twilioOpenDocsHandler() {
  vscode.env.openExternal(vscode.Uri.parse("https://www.twilio.com/docs"));
}
