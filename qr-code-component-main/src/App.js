import QRCode from 'react-qr-code';
import { QrContainer, colors, Container, Card, Title, Body, Content } from './App.styles';

function App() {
	const qrValue = 'https://www.frontendmentor.io/';
	return (
		<Container>
			<Card>
				<QrContainer>
					<QRCode
						value={qrValue}
						style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
						viewBox={`0 0 256 256`}
						fgColor='#FFF'
						bgColor={colors.primary}
					/>
				</QrContainer>
				<Content>
        <Title>Improve your front-end skills by building projects</Title>
				<Body>
					Scan the QR code to visit Frontend Mentor and take your coding to the
					next level
				</Body>
        </Content>
			</Card>
		</Container>
	);
}

export default App;
