import type { ReactNode } from "react";
import { Reshaped } from "reshaped";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <Reshaped defaultColorMode="dark" theme="analog">
      {children}
    </Reshaped>
  );
};

export { App };
