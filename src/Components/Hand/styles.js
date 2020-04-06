import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
    overflow-x: auto;
    position: absolute;
    bottom: 0;
    margin-left: 8px;
    /* transform: translateY(20vh); */

    & > div {
        margin-right: 8px;
        &:hover {
            /* background-color: red; */
            /* transform: translateY(-20vh); */
        }
    }

`;