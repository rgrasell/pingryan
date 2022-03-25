import React from 'react';
import {AppShell, Header, Center} from '@mantine/core';
import {HeaderContents} from "./features/header/HeaderContents";
import {PingForm} from "./PingForm";
import {Thankyou} from "./Thankyou";

function App() {

  const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
  const sessionId = queryParams.session_id;
  const completed = !!sessionId;

  return (
    <AppShell
        padding="md"
        header={<Header height={60} p="xs">{<HeaderContents/>}</Header>}
    >
      <Center style={{width: "fill"}}>
        {completed ? <Thankyou sessionId={sessionId}/> : <PingForm/>}
      </Center>
    </AppShell>
  );
}

export default App;
