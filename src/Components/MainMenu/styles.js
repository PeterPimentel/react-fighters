import styled from 'styled-components'

import street_bg from '../../assets/street_bg.jpg'

export const Container = styled.div`
    background-image:url(${street_bg});
    background-color:#032d39;
    padding:10px;
    height: 100vh;
    width: 100vw;
    background-position: center;
    & > ul{
        margin-top: 30vh;
        & > a {
            text-decoration: none;
        }
    }
`;

export const MenuItem = styled.li`
    color: white;
    padding: 0.8em 2.5em;
    border: 1px solid white;
    background: rgb(18,23,27);
    background: linear-gradient(180deg, rgba(18,23,27,1) 71%, rgba(0,3,6,1) 99%);
    font-style: italic;
    width: 30%;
    min-width: 200px;
    border-radius: 0px 0px 50px 0px;
    font-weight: 500;
    margin-bottom: 4px;

    &:hover {
        background: linear-gradient(0deg, #f6984c 0%, #fedc74 100%);
        color: rgb(18,23,27);
        -webkit-box-shadow: 0px 0px 14px 0px rgba(186,63,11,1);
        -moz-box-shadow: 0px 0px 14px 0px rgba(186,63,11,1);
        box-shadow: 0px 0px 14px 0px rgba(186,63,11,1);
    }
`