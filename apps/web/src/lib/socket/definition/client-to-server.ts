import { NewMessageData } from "./data"

/* eslint-disable no-unused-vars */
export interface ClientToServer {
  "new message": (data: NewMessageData) => void
}

export type ClientToServerMessages = {
  [K in keyof ClientToServer]: {
    name: K
    params: Parameters<ClientToServer[K]>
  }
}[keyof ClientToServer]

export type ClientToServerMessage<K extends keyof ClientToServer = keyof ClientToServer > = {
  name: K
  params: Parameters<ClientToServer[K]>
}