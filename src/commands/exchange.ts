import { resolve } from "path";
import * as fs from "fs";
import * as vscode from "vscode";
// @ts-ignore
import * as download from "github-directory-downloader";

export async function twilioOpenTemplateHandler(
  template: string,
  path: string
) {
  if (!path) {
    vscode.commands.executeCommand("twilio.open.exchange");
    return;
  }

  const folder = await getFolderSelection();

  if (!folder) {
    return;
  }

  const destination = resolve(folder, template);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const res = await download(path, destination);

  await openFolder(destination);
}

async function getFolderSelection() {
  const destination = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    defaultUri: vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri
      : undefined,
    openLabel: "Save Template",
  });

  if (!destination) {
    return;
  }

  return destination[0].path;
}

async function openFolder(path: string) {
  const windowSelection = await vscode.window.showInformationMessage(
    "Template ready! Do you want to open it?",
    { modal: true },
    "This window",
    "New window"
  );

  if (windowSelection === undefined) {
    return;
  }

  const openWindow = windowSelection !== "This window" ? true : false;

  await vscode.commands.executeCommand(
    "vscode.openFolder",
    vscode.Uri.file(path),
    {
      forceNewWindow: openWindow,
    }
  );
}
