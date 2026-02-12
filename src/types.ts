export interface Result<T, E = Error> {
  ok: boolean;
  value?: T;
  error?: E;
}

export type Nullable<T> = T | null | undefined;

export interface Identifiable {
  id: string;
  createdAt: Date;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncFn<T = void> = () => Promise<T>;
