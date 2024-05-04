"use client";

import type { ReactNode } from "react";
import { Reshaped } from "reshaped";

const App = ({ children }: { children: ReactNode }) => {
  return <Reshaped theme="reshaped">{children}</Reshaped>;
};

export { App };
