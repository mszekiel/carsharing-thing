import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom'
import { Grid, Loading } from 'carbon-components-react';
import { Main } from './pages/Main/Main';
import GoogleMap from './components/GoogleMap/GoogleMap';

import './lang/i18n';
import { Booking } from './pages/Booking/Booking';
import { Header } from './components/Header/Header';
import { History } from './pages/History/History';

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 15px;
    pointer-events: none;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <Grid style={{ width: '100%', pointerEvents: 'all' }}>
                    <Header />
                </Grid>
                <Switch>
                    <Route path='/' exact>
                        <Main />
                        <GoogleMap />
                    </Route>
                    <Route path='/book/:id' exact component={() => <Booking />} />
                    <Route path='/history' exact component={() => <History />} />
                </Switch>
            </Container>
        </Suspense>
    );
}

export default App;
