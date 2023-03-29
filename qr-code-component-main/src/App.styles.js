import styled from 'styled-components';

export const colors = {
	primary: '#347CE6',
	pageBg: '#D6E1F0',
	bg: '#FFF',
	subtitle: '#b5b5b5',
};

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${colors.pageBg};
	height: 100vh;
`;

export const QrContainer = styled.div`
	background-color: ${colors.primary};
	padding: 40px;
	border-radius: 10px;
`;

export const Card = styled.div`
	max-width: 220px;
	background-color: ${colors.bg};
	padding: 10px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	font-family: 'Ubuntu', sans-serif;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 10px;
`;
export const Title = styled.h4``;

export const Body = styled.p`
	margin: 0 auto;
	color: ${colors.subtitle};
	font-size: 13px;
`;
