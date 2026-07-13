import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

export default function App() {
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
