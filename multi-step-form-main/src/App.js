import {
	Box,
	Button,
	Card,
	CardMedia,
	Container,
	ThemeProvider,
	Typography,
	createTheme,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import PersonalInfo from './steps/personal-info.component';
import FormProvider from './context/form';

const theme = createTheme({
	status: {
		danger: orange[500],
	},
	typography: {
		fontFamily: 'Ubuntu, sans-serif',
	},
	palette: {
		primary: {
			main: 'hsl(213, 96%, 18%)',
			purplish: 'hsl(243, 100%, 62%)',
			pastel: 'hsl(228, 100%, 84%)',
			light: 'hsl(206, 94%, 87%)',
			strawberry: 'hsl(354, 84%, 57%)',
		},
		secondary: {
			main: 'hsl(231, 11%, 63%)',
			lightGray: 'hsl(229, 24%, 87%)',
			magnolia: 'hsl(217, 100%, 97%)',
			alabaster: 'hsl(231, 100%, 99%)',
			white: 'hsl(0, 0%, 100%)',
		},
	},
});

function App() {
	const [activeStep, setActiveStep] = useState(1);

	const steps = [
		{
			step: 1,
			label: 'Your info',
			title: 'Personal info',
			subtitle: 'Please provide your name, email address, and phone number.',
			component: (
				<PersonalInfo activeStep={activeStep} setNextStep={setActiveStep} />
			),
		},
		{ step: 2, label: 'Select plan', content: 'Select plan' },
		{ step: 3, label: 'Add-ons', content: 'Add-ons' },
		{ step: 4, label: 'Summary', content: 'Summary' },
	];

	return (
		<ThemeProvider theme={theme}>
			<FormProvider>
				<Container
					maxWidth='100vw'
					sx={{
						bgcolor: 'secondary.magnolia',
						height: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					disableGutters
				>
					<Box
						sx={{
							bgcolor: 'secondary.white',
							borderRadius: 2,
							display: 'inline-flex',
							p: 2,
						}}
					>
						{/* LEFT SIDEBAR COLUMN */}
						<Card sx={{ overflow: 'visible', width: '100%' }}>
							<Box sx={{ position: 'relative' }}>
								<CardMedia
									component='img'
									image={'/images/bg-sidebar-desktop.svg'}
									title='Sidebar'
									alt='Sidebar'
									height='500px'
								/>
								<Box
									sx={{
										position: 'absolute',
										color: 'white',
										top: 30,
										left: '10%',
									}}
								>
									{steps.map((item, i) => (
										<Box
											id={i}
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 2,
												mb: 2,
												cursor: 'pointer',
											}}
											// onClick={() => setActiveStep(item.step)}
										>
											<Box>
												<Typography
													sx={{
														p: '3px 11px',
														border: '1px solid',
														borderColor: 'primary.light',
														borderRadius: '50%',
														...(activeStep === item.step && {
															bgcolor: 'primary.light',
															color: 'primary.main',
														}),
													}}
												>
													{item.step}
												</Typography>
											</Box>
											<Box>
												<Typography
													sx={{ fontSize: 11, color: 'secondary.lightGray' }}
												>
													STEP {item.step}
												</Typography>
												<Typography sx={{ fontWeight: 600, fontSize: 14 }}>
													{item.label.toUpperCase()}
												</Typography>
											</Box>
										</Box>
									))}
								</Box>
							</Box>
						</Card>
						{/* RIGHT CONTENT */}
						<Box sx={{ width: '100%' }}>
							{steps.map(
								(item, i) =>
									item.step === activeStep && (
										<Box
											id={i}
											sx={{
												pt: 4,
												px: 15,
												height: '100%',
											}}
										>
											<Typography variant='h5' sx={{ mb: 1, fontWeight: 700 }}>
												{item.title}
											</Typography>
											<Typography
												variant='subtitle2'
												sx={{ color: 'secondary.main', whiteSpace: 'nowrap' }}
											>
												{item.subtitle}
											</Typography>
											<Box sx={{ mt: 4, height: '100%' }}>{item.component}</Box>
										</Box>
									)
							)}
						</Box>
					</Box>
				</Container>
			</FormProvider>
		</ThemeProvider>
	);
}

export default App;
