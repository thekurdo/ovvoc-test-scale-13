export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor: number;
}

const defaultOptions: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffFactor: 2,
};

export async function retry<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error | undefined;
  let delay = opts.delayMs;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < opts.maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= opts.backoffFactor;
      }
    }
  }
  throw lastError;
}
