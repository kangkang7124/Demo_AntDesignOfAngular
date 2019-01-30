import {TerminalLocationMsg} from './terminalLocationMessage';

export interface WebSocketMessage {
  terminalLocationMsg: TerminalLocationMsg;
  warningMessage: String;
}
