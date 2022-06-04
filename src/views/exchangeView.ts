import axios from "axios";
import {
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  TreeItemLabel,
  Uri,
} from "vscode";

type LinkAttributes = [string, string, ThemeIcon];

export class ExchangeTreeDataProvider implements TreeDataProvider<TreeItem> {
  templates: Template[];

  constructor() {
    this.templates = [];
  }

  getTreeItem(element: Template) {
    return element;
  }

  async getChildren(element: Template) {
    if (element) {
      return [];
    }

    if (this.templates.length === 0) {
      await this.fetchTemplates();
    }

    return this.templates;
  }

  async fetchTemplates() {
    const GITHUB_TEMPLATE_URL =
      "https://api.github.com/repos/twilio-labs/function-templates/contents";

    const resp = await axios.get(GITHUB_TEMPLATE_URL);
    const contents = resp.data;

    const folders = contents.filter((item: { type: string; name: string }) => {
      if (item.type !== "dir") {
        return false;
      }

      if (item.name.includes(".")) {
        return false;
      }

      if (item.name.charAt(0) === "_") {
        return false;
      }

      if (item.name === "docs") {
        return false;
      }

      if (item.name === "test") {
        return false;
      }

      return true;
    });

    const templates = folders.map(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      (folder: { name: string; html_url: string }) => {
        return new Template(
          folder.name,
          "twilio.open.template",
          new ThemeIcon("rocket"),
          folder.html_url
        );
      }
    );

    this.templates = templates;
  }
}

interface Command {
  title: string;
  command: string;
  arguments: string[];
}

interface Template {
  label: string;
  command: Command;
  iconPath: ThemeIcon;
}

class Template extends TreeItem {
  constructor(
    label: string,
    command: string,
    iconPath: ThemeIcon,
    source: string
  ) {
    super(label, TreeItemCollapsibleState.None);
    this.label = label;
    this.command = {
      title: command,
      command: command,
      arguments: [label, source],
    };
    this.iconPath = iconPath;
  }
}
