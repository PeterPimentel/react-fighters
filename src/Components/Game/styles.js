import styled from 'styled-components'

export const Damage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: ${({damage}) => damage > 0 ? 'flex': 'none'};
    justify-content: center;
    align-items: center;
    background: rgb(254,213,0);
    background: radial-gradient(circle, rgba(254,213,0,1) 0%, rgba(253,29,29,1) 50%, rgba(252,158,69,1) 100%);
    color: white;
    font-size: 20px;
    font-weight: 900;
`;

export const Energy = styled.div`
    margin: 4px 0px 4px 0px;
    display: flex;
    align-items: center;

    img {
        width: 32px;
        height: 32px;
    }

    span {
        padding-left: 6px;
        font-weight: 900;
        font-size: 20px;
    }
`;

export const Perspective = styled.div`
    grid-area: ring;
    /* display: flex;
    justify-content: space-evenly; */
    background-color: burlywood;
    /* perspective: 800px; */
`;

export const FighterOnArena = styled.div`
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items:center;
`;