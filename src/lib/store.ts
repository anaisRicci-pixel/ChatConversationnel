import { MOCK_PROJECTS, MOCK_SOURCES, MOCK_CHATS, Project, Source, Chat, Message } from "./mock-data";

export interface AppState {
  projects: Project[];
  sources: Source[];
  chats: Chat[];
  dismissedExpiredBanner: boolean;
}

export type Action =
  | { type: "CREATE_PROJECT"; payload: Omit<Project, "id" | "date" | "pinned"> }
  | { type: "UPDATE_PROJECT"; id: string; payload: Partial<Pick<Project, "name" | "instructions">> }
  | { type: "DELETE_PROJECT"; id: string }
  | { type: "PIN_PROJECT"; id: string; pinned: boolean }
  | { type: "ADD_SOURCE"; payload: Omit<Source, "id" | "date"> }
  | { type: "DELETE_SOURCE"; id: string }
  | { type: "CREATE_CHAT"; payload: Omit<Chat, "id" | "date" | "pinned" | "messages"> }
  | { type: "DELETE_CHAT"; id: string }
  | { type: "PIN_CHAT"; id: string; pinned: boolean }
  | { type: "SEND_MESSAGE"; chatId: string; message: Omit<Message, "id"> }
  | { type: "ADD_AI_RESPONSE"; chatId: string; message: Omit<Message, "id"> }
  | { type: "DISMISS_EXPIRED_BANNER" };

export const initialState: AppState = {
  projects: MOCK_PROJECTS,
  sources: MOCK_SOURCES,
  chats: MOCK_CHATS,
  dismissedExpiredBanner: false,
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function today(): string {
  return "Aujourd'hui";
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [
          {
            id: generateId("proj"),
            date: today(),
            pinned: false,
            ...action.payload,
          },
          ...state.projects,
        ],
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, ...action.payload } : p
        ),
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
        chats: state.chats.filter((c) => c.projectId !== action.id),
        sources: state.sources.filter((s) => s.projectId !== action.id),
      };

    case "PIN_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, pinned: action.pinned } : p
        ),
      };

    case "ADD_SOURCE":
      return {
        ...state,
        sources: [
          {
            id: generateId("src"),
            date: today(),
            ...action.payload,
          },
          ...state.sources,
        ],
      };

    case "DELETE_SOURCE":
      return {
        ...state,
        sources: state.sources.filter((s) => s.id !== action.id),
      };

    case "CREATE_CHAT":
      return {
        ...state,
        chats: [
          {
            id: generateId("chat"),
            date: today(),
            pinned: false,
            messages: [],
            ...action.payload,
          },
          ...state.chats,
        ],
      };

    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.filter((c) => c.id !== action.id),
      };

    case "PIN_CHAT":
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.id ? { ...c, pinned: action.pinned } : c
        ),
      };

    case "SEND_MESSAGE":
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.chatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: generateId("msg"), ...action.message },
                ],
              }
            : c
        ),
      };

    case "ADD_AI_RESPONSE":
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.chatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: generateId("msg"), ...action.message },
                ],
              }
            : c
        ),
      };

    case "DISMISS_EXPIRED_BANNER":
      return { ...state, dismissedExpiredBanner: true };

    default:
      return state;
  }
}
