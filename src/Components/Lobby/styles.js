import styled from 'styled-components'
import lobby_bg from '../../assets/lobby_bg.jpg'

export const Container = styled.div`
    background-image:url(${lobby_bg});
    background-color:#032d39;
    padding:10px;
    height: 100vh;
    width: 100vw;
    background-position: center;
    & .user-list{
        justify-content:space-around;
    }
`;

export const UserList = styled.ul`
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: center;
    width: 40%;
`;

export const UserItem = styled.li`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    color: white;
    border: 4px solid #027ebe;
    margin-bottom: 8px;

    & > span:nth-child(2){
        padding: 2px 6px 2px 6px;
        background-color: grey;
        border-radius: 4px;
    }

    & > button {
        background: none;
        border: none;
        color: white;
        font-size: 1em;
    }
`

export const ChallengeBox = styled.div`
    padding: 16px;
    background-color: #616161;
    color: white;
    border: 4px solid #027ebe;
    font-weight: 900;

    & div:first-child {
        padding: 8px;
    }

    & .challenge-options {
        display: flex;
        justify-content: space-between;

        & button {
            padding: 8px;
            border-radius: 4px;
            color: white;
        }

        & button:first-child {
            background-color: #4acc4a;
            border: #4acc4a;
            font-weight: 900;
        }

        & button:last-child {
            font-weight: 900;
            background-color: #f44336;
            border:#f44336
        }
    }
`;