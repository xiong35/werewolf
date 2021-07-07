export interface HttpRes<T = {}> {
  status: number;
  msg: string;
  data: T;
}
