import styled, { css } from 'styled-components'
import arena_bg from '../../assets/arena_bg.jpg'

export const Background = styled.div`
    background-image: url(${arena_bg});
    width: 100vw;
    height: 100vh;
`;

export const Container = styled.div`
    height: 80vh;
    width: 100vw;
    display: grid;
    grid-template-areas:"reserveUser arenaUser arenaOpponent reserverOpponent";
    grid-template-columns: 20vw 25vw 25vw 20vw;
    grid-template-rows: 70vh;
    grid-gap: 0 1vw;
    justify-content: center;
`;

export const HeaderGrid = styled.div`
    display: grid;
    width: 100vw;
    height: calc(10vh - 8px);
    grid-template-areas:"arenaHeaderUserInfo arenaHeaderUserTurn arenaHeaderOpponentTurn arenaHeaderOpponentInfo";
    grid-template-columns: 20vw 25vw 25vw 20vw;
    grid-gap: 0 1vw;
    justify-content: center;
    color: white;
`;

export const GridArea = styled.div`
    grid-area:${({ area }) => area};
    width:100%;
    height: 100%;
`;

export const EmptyFighterBox = styled.div`
    height: 100%;
    width: 100%;
    border: 2px dashed white;
    & > div {
        background-color: rgb(255, 255, 255,0.2);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        text-align: center;
        font-size: 2em;
        font-weight: 500;
        color: #b7a980;
        font-style: italic;
    }
`;

export const RingContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 4px;
`;

export const FighterBox = styled.div`
    height: 100%;
    background-image:${ ({ bg }) => bg ? `url(${bg})`: `inherit`};
    background-repeat:no-repeat;
    background-size:cover;
    
    & .status {
        background-color: rgb(255, 255, 255,0.2);
        height:20%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 8px;
        font-weight:500;

        & > .figther-name {
            text-align: initial;
            font-size: 1em;
        }

        & > .figther-name.mirror {
            text-align: end;
        }

        & > div.status-energy {
            display: flex;
            align-items: center;
            flex-wrap:wrap;
            img {
                margin-right: 4px;
                width: 2.5vw;
                max-width:16px;
                height: auto;
            }
        }

        & > div.status-life {
            border: 2px solid;
            border-radius: 10px;

            & > div {
                width:${({width}) => `${width}%` };
                border-radius: 10px;
                background: rgb(169,255,151);
                background: linear-gradient(0deg, rgba(155,233,139,1) 0%, rgba(78,198,61,1) 50%, rgba(155,233,139,1) 100%);

                & > span {
                    font-size: 0.8em;
                }
            }
        } 
    }

    & .skill {
        background-color: rgb(255, 255, 255,0.2);
        height:80%;
        width: 100%;
        padding:4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`;

export const SkillPanel = styled.div`
    display:flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0.8);
    border: 2px solid #000000;
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
    transform: scale(1.1);
    display: ${({ position }) => position > 0 ? `inital` : `none`};
    position: fixed;
    bottom: 170px;
    left:${({ position }) => `${position}px`};

`;

export const OpponentCard = styled.div`
    transform: scale(1);
    display: ${({ show }) => show === true ? `inital` : `none`};
    position: fixed;
    bottom: 30vh;
    right: 30px;
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
`;

export const ButtonSkip = styled.button`
    background-color:#fcc010;
    color: white;
    border: 2px solid #f6984c;
    padding: 2px;
    border-radius: 18px;
    font-size: 1.5em;
    width: 1.5em;
    line-height: 80%;
    text-align: center;
    cursor: pointer;
    margin-left: 4px;
    &:hover {
        color: red;
    }
`

export const ReserveArea = styled.div`
    grid-area:${({ area }) => area};
    background-color: rgb(255, 255, 255,0.2);
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
    background-color: #ffe166;
    width: 60%;
    height: 20%;
    ${props => props.flip === false &&
        css`
            clip-path: polygon(0 50%, 25% 0, 100% 0, 100% 100%, 25% 100%);
        `
    }

    & > div {
        clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
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

export const ArenaTitleBox = styled.div`
    position:absolute;
    left:40vw;
    top: 30vh;
`
export const PunchEffect = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    width: 50%;
    height: 60%;
`