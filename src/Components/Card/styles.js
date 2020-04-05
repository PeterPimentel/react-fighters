import styled, { css } from 'styled-components'
import cardBg from '../../assets/bg2.png'

export const Container = styled.div`
    cursor: grab;
    width:153px;
    height: 207px;
    border: 6px solid #ffe166;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    ${props =>
        props.isDragging &&
        css`
        border: 8px dashed gray;
        cursor: grabbing;
        transform: scale(0.5);
    `}

    ${props =>
        props.hovered &&
        css`
        -webkit-box-shadow: 0px 0px 20px 10px rgba(165,207,222,1);
        -moz-box-shadow: 0px 0px 20px 10px rgba(165,207,222,1);
        box-shadow: 0px 0px 20px 10px rgba(165,207,222,1);
    `}

`;

export const Box =  styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${cardBg});
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 11% 48% 41%;
    grid-template-areas: "header" "image" "info";
`;

export const Header = styled.div`
    grid-area: header;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:12px;
    padding-left: 4px;
    padding-right: 4px;
    font-weight: 500;

    span:nth-child(1){
        font-size:70%
    }
`;



export const Skill = styled.div`
    padding: 4px;
    div:first-child {
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-between;
        font-size:10px;
    }
    span {
        font-size:8px;
    }

    &:hover {
        border: 2px solid black;
        border-radius: 10px 0px 10px 0px;
        transform: scale(1.2);
        margin-bottom: 3px;
        background: rgb(130,130,130);
        background: linear-gradient(0deg, rgba(0,0,0,0.2) 50%, rgb(130,130,130, 1) 100%);
    }

`;

export const SkillDetail = styled.div`
    display:none;

    /* ${Skill}:hover &{
        position: relative;
        left: 150px;
        bottom: 10px;
        background: rgba(0,0,0,0.7);
        padding: 4px;
        display: block;
        color: white;
        border: 2px solid white;
    } */
`;

