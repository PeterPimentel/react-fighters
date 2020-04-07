import styled, { css } from 'styled-components'
import card_bg from '../../assets/card_bg.jpg'

export const Container = styled.div`
    height: 80vh;
    width: 100vw;
    display: grid;
    grid-template-areas:
    "arenaHeaderUserInfo arenaHeaderUserTurn arenaHeaderOpponentTurn arenaHeaderOpponentInfo"
    "reserveUser arenaUser arenaOpponent reserverOpponent";
    grid-template-columns: 25vw 25vw 25vw 25vw;
    grid-template-rows: 10vh 70vh;
`;

export const GridArea = styled.div`
    grid-area:${({ area }) => area};
`;

export const FighterBox = styled.div`
    height: 100%;
    padding: 4px;
    /* background-image:url(${card_bg}); */

    & .status {
        background-color:hotpink;
        height:20%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 8px;
        font-weight:500;
        .status-energy {
            display: flex;
            align-items: center;
            img {
                margin-right: 4px;
                width: 2.5vw;
                max-width:32px;
                height: auto;
            }
        }
    }

    & .skill {
        background-color:grey;
        height:80%;
        width: 100%;
        background-image:${ ({ bg }) => `url(${bg})`};
        background-repeat:no-repeat;
        padding:4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        ${props => props.flip &&
        css`
            /* transform: scaleX(-1); */
        `}
    }
`;

export const SkillPanel = styled.div`
    display:flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0.8);
    border: 2px solid #000000;
    /* border: 2px solid #fcc010; */
    border-radius: 5px;
    padding: 8px;
    color: white;
    margin-bottom: 8px;
    cursor: pointer;
    
    &:hover {
        border-color:#027ebe;
        -webkit-box-shadow: 0px 0px 8px 2px rgba(2,126,190,1);
        -moz-box-shadow: 0px 0px 8px 2px rgba(2,126,190,1);
        box-shadow: 0px 0px 8px 2px rgba(2,126,190,1);
    }

    & .skillName {
        display: flex;
        justify-content: space-between;
        font-weight: 900;
        padding-bottom: 4px;
        & > div {
            display: flex;
            align-items: center;
            img {
                margin-right: 4px;
                width: 2.5vw;
                max-width:32px;
                height: auto;
            }
        }
    }

    & .skillInfo {
        display: flex;
        align-items:center;
        font-size:small;
    }
`;

export const FloattingCard = styled.div`
    transform: scale(1.2);
    display: ${({ position }) => position > 0 ? `inital` : `none`};
    position: fixed;
    bottom: 200px;
    left:${({ position }) => `${position}px`};

`;

export const UserInfo = styled.div`
    padding:4px;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    & div > p {
        font-size:small;
    }

    & div > button {
        background-color:#fcc010;
        color: white;
        border: 2px solid #f6984c;
        padding: 2px;
        border-radius: 18px;
        font-size: 2em;
        width: 1.5em;
        line-height: 80%;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
`;

export const ReserveArea = styled.div`
    grid-area:${({ area }) => area};
    border: ${({ color }) => `2px solid ${color}`};
    padding: 4px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    ${props => props.flip === false &&
        css`
            align-items: flex-end;
        `
    }
`;

export const ReserveBox = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    background-color: black;
    width: 60%;
    height: 20%;
    ${props => props.flip === false &&
        css`
            clip-path: polygon(0 50%, 25% 0, 100% 0, 100% 100%, 25% 100%);
        `
    }

    & > div {
        clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
        background-color: #c7c7c7;
        width: 97%;
        height: 95%;
        background-image:${ ({ bg }) => `url(${bg})`};
        background-size: cover;
        background-repeat: no-repeat;
        background-position-x: center;
        ${props => props.flip === false &&
        css`
                clip-path: polygon(0 50%, 25% 0, 100% 0, 100% 100%, 25% 100%);
            `
        }
    }
`;
