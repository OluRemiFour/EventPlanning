import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const activeUser = atomWithStorage("activeUser", null);
