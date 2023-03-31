import {
	Box,
	Chip,
	Container,
	createTheme,
	ThemeProvider,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import JobsListing from './data.json';

const theme = createTheme({
	typography: {
		fontFamily: 'Ubuntu, sans-serif',
	},
	palette: {
		primary: {
			main: 'hsl(180, 29%, 50%)',
			light: 'hsl(180, 8%, 52%)',
		},
		secondary: {
			main: '#353E3D',
		},
	},
});

const defaultFilters = {
	role: '',
	level: '',
	languages: [],
};

function App() {
	const [showFilters, setShowFilters] = useState(defaultFilters);

	const ChipStyled = ({
		role,
		level,
		language,
		id,
		disableClick = false,
		deletable = false,
	}) => (
		<Chip
			id={id}
			label={role || level || language}
			{...(!disableClick && {
				onClick: () =>
					setShowFilters((prev) => {
						return {
							...prev,
							...((!!role && { role }) ||
								(!!level && { level }) ||
								(!!language && {
									languages: !prev.languages.includes(language)
										? [...prev.languages, language]
										: [...prev.languages],
								})),
						};
					}),
			})}
			{...(deletable && {
				onDelete: () => removeFilter(role || level || language),
			})}
			sx={{
				borderRadius: 1,
				backgroundColor: 'hsl(180, 31%, 95%)',
				color: 'hsl(180, 29%, 50%)',
				fontWeight: 600,
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: 'hsl(180, 29%, 50%)',
					color: '#FFF',
				},
			}}
		/>
	);

	const removeFilter = (filter) => {
		const key = Object.entries(showFilters).find(([k, v]) =>
			Array.isArray(v) ? v.includes(filter) : v === filter
		)[0];

		setShowFilters((prev) => ({
			...prev,
			[key]: Array.isArray(prev[key])
				? prev.languages.filter((l) => l !== filter)
				: '',
		}));
	};

	const clearFilters = () => setShowFilters(defaultFilters);

	const validateFilters = (job) => {
		const noFilters = Object.values(showFilters).every((value) =>
			Array.isArray(value) ? !value.length : value === ''
		);

		const containsAllValues = (obj1, obj2) => {
			for (let key in obj1) {
				if (obj1[key].length > 0) {
					if (Array.isArray(obj1[key])) {
						for (let i = 0; i < obj1[key].length; i++) {
							const value = obj1[key][i];
							if (obj2[key].includes(value)) {
								return true;
							}
						}
						return false;
					} else {
						if (obj1[key] !== obj2[key]) {
							return false;
						}
					}
				}
			}
			return true;
		};
		return noFilters || containsAllValues(showFilters, job);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='100%' disableGutters>
				<Box
					component='img'
					alt='header'
					src='/images/bg-header-desktop.svg'
					sx={{
						bgcolor: theme.palette.primary.main,
						width: '100%',
						height: 150,
					}}
				/>
				<Container
					sx={{ bgcolor: 'hsl(180, 52%, 96%)', minWidth: '100vw', p: 5 }}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							width: 800,
							margin: '0 auto',
						}}
					>
						{Object.values(showFilters).some((value) => value.length > 0) && (
							<Box
								sx={{
									bgcolor: '#FFF',
									p: '10px 30px',
									borderRadius: 2,
									display: 'flex',
									width: '100%',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Box sx={{ display: 'flex', gap: 1.5 }}>
									{Object.entries(showFilters).map(
										([key, value], i) =>
											!!value &&
											(!Array.isArray(value) ? (
												<ChipStyled
													{...(value.length > 0 && { [key]: value })}
													id={i}
													disableClick
													deletable
												/>
											) : (
												value.map((v, i2) => (
													<ChipStyled
														language={v}
														id={i2}
														disableClick
														deletable
													/>
												))
											))
									)}
								</Box>
								<Typography
									color='primary'
									onClick={clearFilters}
									sx={{
										'&:hover': { textDecoration: 'underline' },
										fontSize: 14,
										cursor: 'pointer',
										fontWeight: 600,
									}}
								>
									Clear
								</Typography>
							</Box>
						)}
						{JobsListing.map(
							(job, i) =>
								validateFilters(job) && (
									<Box
										id={i}
										sx={{
											display: 'flex',
											alignItems: 'center',
											p: 3,
											bgcolor: '#FFFFFF',
											width: '100%',
											marginTop: 3,
											borderRadius: 1,
											borderLeft: '5px solid transparent',
											boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
											...(job.featured && {
												borderLeft: `4px solid ${theme.palette.primary.main}`,
											}),
										}}
									>
										<Box
											component='img'
											src={job.logo}
											alt='job logo'
											sx={{
												width: 60,
												height: 60,
											}}
										/>
										<Box
											sx={{
												ml: 3,
												display: 'flex',
												flexDirection: 'column',
												width: '100%',
											}}
										>
											<Box sx={{ display: 'flex' }}>
												<Typography
													mr={2}
													color='primary'
													sx={{ fontWeight: 600 }}
												>
													{job.company}
												</Typography>
												{job.new && (
													<Chip
														label='NEW!'
														color='primary'
														size='small'
														sx={{ color: '#FFF', fontWeight: 600 }}
													/>
												)}
												{job.featured && (
													<Chip
														label='FEATURED'
														color='secondary'
														size='small'
														sx={{ color: '#FFF', fontWeight: 600, ml: 1 }}
													/>
												)}
											</Box>
											<Typography
												sx={{
													fontWeight: 600,
													cursor: 'pointer',
													my: 1,
													'&:hover': { color: 'hsl(180, 29%, 50%)' },
												}}
											>
												{job.position}
											</Typography>
											<Box sx={{ display: 'flex', gap: 1.5, color: '#878787' }}>
												<Typography sx={{ fontSize: 14 }}>
													{job.postedAt}
												</Typography>
												•
												<Typography sx={{ fontSize: 14 }}>
													{job.contract}
												</Typography>
												•
												<Typography sx={{ fontSize: 14 }}>
													{job.location}
												</Typography>
											</Box>
										</Box>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'flex-end',
												width: '100%',
												gap: 1.5,
											}}
										>
											<ChipStyled role={job.role} />
											<ChipStyled level={job.level} />
											{job.languages.map((language, i) => (
												<ChipStyled language={language} id={i} />
											))}
										</Box>
									</Box>
								)
						)}
					</Box>
				</Container>
			</Container>
		</ThemeProvider>
	);
}

export default App;
