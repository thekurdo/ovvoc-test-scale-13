export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0, info: 1, warn: 2, error: 3,
};

export class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor(prefix: string, level: LogLevel = 'info') {
    this.prefix = prefix;
    this.level = level;
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (LEVEL_ORDER[level] >= LEVEL_ORDER[this.level]) {
      const timestamp = new Date().toISOString();
      const entry = { timestamp, level, prefix: this.prefix, message, data };
      console.log(JSON.stringify(entry));
    }
  }

  debug(msg: string, data?: unknown): void { this.log('debug', msg, data); }
  info(msg: string, data?: unknown): void { this.log('info', msg, data); }
  warn(msg: string, data?: unknown): void { this.log('warn', msg, data); }
  error(msg: string, data?: unknown): void { this.log('error', msg, data); }
}
