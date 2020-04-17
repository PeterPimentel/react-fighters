import styled from 'styled-components';
import street_bg from '../../assets/street_bg.jpg'

export const Container = styled.div`
	background-image:url(${street_bg});
    width:100vw;
    height: 100vh;
    overflow-y: auto;

    & .header {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        & + button {
            height: 32px;
            text-align: center;
            padding: 0.5em 1.5em;
        }

        & > select {
            height:32px;
            background: rgba(0,3,6,1);
            color: white;
            & > option:hover {
                background: #fedc74;
                color: rgb(18,23,27);
                -webkit-box-shadow: inset 0 0 10px red;
                -moz-box-shadow: inset 0 0 10px red;
                box-shadow: inset 0 0 10px red;
            }
        }
    }
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & .card-collection {
        margin: 4px;
    }
`;
