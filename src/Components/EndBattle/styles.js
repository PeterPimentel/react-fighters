import styled from 'styled-components';
import street_bg from '../../assets/street_bg.jpg'

export const Container = styled.div`
	background-image:url(${street_bg});
	background-color:#032d39;
  height:100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0 0px 0;
	
	& > .back-button {
		width: 30%;
    align-self: center;
		position: relative;
    top: 10vh;
    z-index: 10;
		cursor: pointer;

		& > button {
			width: 100%;
		}
	}
`;

export const BattleResult = styled.div`
	display: flex;
	justify-content: space-between;
`

export const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-image: ${({ bg }) => `url(${bg})`};
	height: 50vh;
	width: 40vw;
	background-size: cover;
	background-repeat: no-repeat;
	justify-content: space-between;

	& .user-info {
		text-align: center;
		color: white;
		padding: 8px;
		background: rgb(0,0,0, 0.7);
		background: linear-gradient(90deg, rgba(0,0,0,0.7) 12%, rgba(0,0,0,0) 100%);

		&.opponent {
			background: linear-gradient(270deg, rgba(0,0,0,0.7) 12%, rgba(0,0,0,0) 100%);
		}
	}
`;