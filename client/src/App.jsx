import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/common/PageLoader";

export default function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <div>
      <>
        <header>
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
      </>
    </div>
  );
}
