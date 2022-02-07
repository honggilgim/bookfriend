import React from 'react';
import AppRouter from './component/route/RouterComponent';
import NavBar from "./component/route/NavBar";

import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;
// 루트 컴포넌트라고 불리며, 이 파일에 브라우저에서
// 실제로 렌더되는 컴포넌트들이 포함되고 있음.