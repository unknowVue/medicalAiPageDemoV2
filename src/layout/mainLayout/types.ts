import type React from "react";

export interface MenuItem {
  title: string;
  desc: string;
  id: MenuItemId;
  icon: React.ReactNode;
  toPath: string;
  contentStyle?: React.CSSProperties
}

export enum MenuItemId {
  INFO_DASHBOARD,
  LITERATURE_ADMIN,
  AI_RESEARCH_ASSISTANT
}