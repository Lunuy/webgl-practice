
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import App from './components/App';
import Practice from './components/Practice';
import NotFound from './components/NotFound';
import Nav from './components/Nav';

const OuterDiv = styled.div`
height: 100vh;
overflow: hidden;
`;
const ContentDiv = styled.div`
width: calc(100% - 180px);
display: inline-block;
float:left;
`;

function Root() {
    return (
        <Router>
            <OuterDiv>
                <Nav/>
                <ContentDiv>
                    <Switch>
                        <Route path="/" exact component={App}/>
                        <Route path="/practice/:id" exact component={Practice}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </ContentDiv>
            </OuterDiv>
        </Router>
    )
}

export default Root;