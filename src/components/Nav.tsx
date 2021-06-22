
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import practiceInfos from '../practices';

const NavBlock = styled.nav`
width: 180px;
display: inline-block;
min-height: 100vh;
overflow: auto;
background-color: rgb(230, 230, 230);
float:left;
`;

function Nav() {
    return (
        <NavBlock>
            <ul>
                <li><Link to="/">WebGL Practices</Link></li>
                {
                    practiceInfos.map(({ name }, id) =>
                        <li key={id}><Link to={`/practice/${id}`}>{name}</Link></li>
                    )
                }
            </ul>
        </NavBlock>
    )
}

export default Nav;