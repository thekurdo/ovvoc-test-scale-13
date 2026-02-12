export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
  logLevel: string;
  maxRetries: number;
}

const defaults: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
  logLevel: 'info',
  maxRetries: 3,
};

export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaults, ...overrides };
}

export function getEnvConfig(): Partial<AppConfig> {
  const env = process.env;
  return {
    ...(env.PORT ? { port: parseInt(env.PORT, 10) } : {}),
    ...(env.HOST ? { host: env.HOST } : {}),
    ...(env.DEBUG ? { debug: env.DEBUG === 'true' } : {}),
  };
}
