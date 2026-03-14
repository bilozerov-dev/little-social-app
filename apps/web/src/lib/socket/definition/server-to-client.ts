/* eslint-disable no-unused-vars */
import { NewMessageData } from "./data";

export interface ServerToClient {
  "new message": (data: NewMessageData) => void
}
