import {
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  TreeItemLabel,
  Uri,
} from "vscode";

type LinkAttributes = [string, string, ThemeIcon];

export class LinksTreeDataProvider implements TreeDataProvider<TreeItem> {
  links: Link[];

  constructor() {
    this.links = [];
  }

  getTreeItem(element: Link) {
    return element;
  }

  getChildren(element: Link) {
    if (element) {
      return [];
    }

    if (this.links.length === 0) {
      this.createLinks();
    }

    return this.links;
  }

  createLinks() {
    const linkAttributes: LinkAttributes[] = [
      ["Twilio.com", "twilio.open.twiliocom", new ThemeIcon("link-external")],
      ["Console", "twilio.open.console", new ThemeIcon("link-external")],
      ["Docs", "twilio.open.docs", new ThemeIcon("link-external")],
      ["Code Exchange", "twilio.open.exchange", new ThemeIcon("link-external")],
      ["Help Center", "twilio.open.help", new ThemeIcon("link-external")],
    ];

    const links = linkAttributes.map((element) => {
      return new Link(...element);
    });

    this.links = links;
  }
}

interface Command {
  title: string;
  command: string;
}
interface Link {
  label: string;
  command: Command;
  iconPath: ThemeIcon;
}

class Link extends TreeItem {
  constructor(label: string, command: string, iconPath: ThemeIcon) {
    super(label, TreeItemCollapsibleState.None);
    this.label = label;
    this.command = { title: command, command: command };
    this.iconPath = iconPath;
  }
}
