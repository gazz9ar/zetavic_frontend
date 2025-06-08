import { CanMatchFn } from "@angular/router";

export const isFirstTimer: CanMatchFn = (route, segments) => {
  return true;
};
