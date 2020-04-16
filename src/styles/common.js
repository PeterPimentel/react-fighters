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

export const SubTitle = styled.h4`
    font-size: ${({ fontSize }) => fontSize !== undefined ? fontSize : '2.5em'};
    text-align: center;
    font-weight: 900;
    font-style: italic;
    text-transform: uppercase;
    color: #fff6b9;
    background: linear-gradient(0deg,#fff6b9 0%,#fdfbfc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow( 0 0 5px #ba3f0b);
`

export const Text = styled.p`
    font-size: ${({ fontSize }) => fontSize !== undefined ? fontSize : '2em'};
    text-align: center;
    font-weight: 900;
    font-style: italic;
    text-transform: uppercase;
    color: #e8b50a;
    filter: drop-shadow( 0 0 1px #ba3f0b);
`

export const Button = styled.button`
    color:white;
    padding: 0.8em 2.5em;
    border: 1px solid white;
    background: rgb(18,23,27);
    background: linear-gradient(180deg, rgba(18,23,27,1) 71%, rgba(0,3,6,1) 99%);
    font-weight: 900;
    &:hover {
        background: linear-gradient(0deg, #f6984c 0%, #fedc74 100%);
        color: rgb(18,23,27);
        -webkit-box-shadow: inset 0 0 10px red;
        -moz-box-shadow: inset 0 0 10px red;
        box-shadow: inset 0 0 10px red;
        /* -webkit-box-shadow: 0px 0px 14px 0px rgba(186,63,11,1);
        -moz-box-shadow: 0px 0px 14px 0px rgba(186,63,11,1);
        box-shadow: 0px 0px 14px 0px rgba(186,63,11,1); */
    }
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
