export interface Message {
  id: number;
  content: string;
  belongParty: 'user' | 'ai';
}

export interface Dialogue {
  id: number;
  title?: string;
  msgList: Message[];
}