import styled, {css} from 'styled-components'

export const Container = styled.div`
    height: 80vh;
    width: 100vw;
    display: grid;
    grid-template-areas:
    "arenaHeader arenaHeader arenaHeader arenaHeader"
    ". arenaFighter arenaOpponent .";
    grid-template-columns: 25vw 25vw 25vw 25vw;
    grid-template-rows: 10vh 70vh;
`;

export const GridArea =  styled.div`
    grid-area:${({area}) => area};
`;

export const FighterBox = styled.div`
    height: 100%;

    & .status {
        background-color:hotpink;
        height:20%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 8px;
        font-weight:500;
        .status-life {
            
        }
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
        /* background-image:${ ({bg}) => `url(${bg})`}; */
        /* background-repeat:no-repeat; */
        padding:4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        ${props => props.flip &&
        css`
            /* transform: scaleX(-1); */
        `}
    }
    & .skill:before {
        content:"";
        height:100%;
        width: 100%;
        background-image:${ ({bg}) => `url(${bg})`};
        background-repeat:no-repeat;
        ${props => props.flip &&
        css`
            transform: scaleX(-1);
        `}
    }
`;

export const SkillPanel =  styled.div`
    display:flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0.8);
    border: 2px solid #fcc010;
    border-radius: 5px;
    padding: 8px;
    color: white;
    margin-bottom: 8px;
    cursor: pointer;

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
