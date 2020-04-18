import styled from 'styled-components'

import main_bg from '../../assets/main_bg.jpg'

export const Container = styled.div`
    background-image:url(${main_bg});
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

    & .main-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & .main-title hr{
        width: 80vw;
        border: 0px;
        -webkit-box-shadow: 0px 0px 10px 3px rgba(255,38,0,1);
        -moz-box-shadow: 0px 0px 10px 3px rgba(255,38,0,1);
        box-shadow: 0px 0px 10px 3px rgba(255,38,0,1);
        position: relative;
    }

    & .main-title hr:nth-child(2){
        width: 60vw;
        border: 0px;
        top:24px;
        -webkit-box-shadow:  0px 0px 10px 3px rgba(255,132,0,1);
        -moz-box-shadow:  0px 0px 10px 3px rgba(255,132,0,1);
        box-shadow:  0px 0px 10px 3px rgba(255,132,0,1);
    }

    & .main-title hr:nth-child(1){
        top:13px;
    }

    & .main-title hr:last-child{
        bottom:13px;
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