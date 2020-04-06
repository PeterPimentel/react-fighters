import styled, { css } from 'styled-components'
import card_bg from '../../assets/card_bg.jpg'

export const Container = styled.div`
    cursor: grab;
    width:184px;
    height: 248px;
    border: 6px solid #ffe166;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    background-image: url(${card_bg});
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 45% 45%;
    grid-template-areas: "header" "image" "info";

    ${props => props.isDragging &&
        css`
            border: 6px dashed #ffe166;
            cursor: grabbing;
            transform: scale(0.5);
            opacity:0.5;
    `}
`;

export const Header = styled.div`
    grid-area: header;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:14px;
    padding: 0 4px 0 4px;
    font-weight: 900;

    span:nth-child(1){
        font-size:70%
    }
`;

export const Image = styled.div`
    grid-area: image;
    background-color: #c7c7c7;
    background-image: ${ ({image}) => `url(${image})`};
    background-size: cover;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 100%;
        height: 100%;
    }
`;

export const Info = styled.div`
    grid-area: info;
    padding: 4px;

    & > div.info-effect {
        font-size: 14px;
        text-align: justify;
        padding: 4px;
        font-weight: 500;
    }

    & > div > .info-skill {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px;
        font-weight: 500;
        font-size: 14px;

        & div.cost {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & div.cost > img {
            width: 14px;
            background-repeat:no-repeat;
            margin-right: 2px;
        }
    }

    & > div > p {
        font-size: xx-small;
        line-height: 90%;
    }
`;

export const Skill = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    font-weight: 500;

    & div.cost {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & div.cost > img {
        width: 16px;
        background-repeat:no-repeat;
        margin-right: 2px;
    }

`;
