import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/writing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
