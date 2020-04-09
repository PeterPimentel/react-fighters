import styled from 'styled-components'

export const Loader = styled.div`
    color: #fcc010;
    font-size: 20px;
    margin: 100px auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
`;

export const Title = styled.h3`
    font-size: 2.5em;
    font-size: ${({ fontSize }) => fontSize !== undefined ? fontSize : '2.5em'};
    text-align: center;
    font-weight: 900;
    font-style: italic;
    text-transform: uppercase;
    color: #fcc010;
    background: linear-gradient(0deg, #f6984c 0%, #fedc74 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow( 0 0 10px red);
`

export const Row = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 100%;
`;

export const Column = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 100%;
`;