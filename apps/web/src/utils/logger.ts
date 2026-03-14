/* eslint-disable no-unused-vars */
type LoggerHandler = (...args: any[]) => void

interface ILoggerMethods {
  warn: LoggerHandler;
  log: LoggerHandler;
  info: LoggerHandler;
}

class DevLogger implements ILoggerMethods {
  name!: string;

  constructor(name: string) {
    if (name.trim() === "") {
      throw new Error("Provide valid name for Logger");
    }
    this.name = name;
  }

  getTimemark() {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    return time;
  }

  getName() {
    return (
      this.name.slice(0, 1).toUpperCase() + this.name.slice(1, this.name.length)
    );
  }

  prependMeta() {
    return `${this.getName()} ${this.getTimemark()}`;
  }

  warn = (...args: any) => {
    console.warn(this.prependMeta(), ...args);
  };

  log = (...args: any) => {
    console.log(this.prependMeta(), ...args);
  };

  info = (...args: any) => {
    console.info(this.prependMeta(), ...args);
  };
}

export default class Logger {
  static client: ILoggerMethods = new DevLogger("client");
  static server: ILoggerMethods = new DevLogger("server");
}
