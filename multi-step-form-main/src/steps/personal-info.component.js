import {
	Box,
	Button,
	FormControl,
	InputBase,
	InputLabel,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useFormData } from '../context/form';

const StyledInput = styled(InputBase)(({ theme, error }) => ({
	'label + &': {
		marginTop: theme.spacing(2.5),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
		border: `1px solid ${error ? 'hsl(354, 84%, 57%)' : '#ced4da'}`,
		fontSize: 16,
		padding: '10px 12px',
		color: 'hsl(231, 11%, 63%)',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
	},
}));

const PersonalInfo = ({ activeStep, setNextStep }) => {
	const { setFormValues } = useFormData();

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm();

	console.log('Errors', errors);

	const onSubmit = (values) => {
		setFormValues(values);
		setNextStep((prev) => prev + 1);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				position: 'relative',
				height: '100%',
			}}
		>
			<FormControl variant='standard' sx={{ mb: 3, width: '100%' }}>
				<InputLabel shrink htmlFor='name-input'>
					Name
				</InputLabel>
				<StyledInput
					size='small'
					variant='outlined'
					id='name-input'
					placeholder='e.g. Stephen King'
					error={Object.keys(errors).includes('name')}
					{...register('name', {
						required: true,
					})}
				/>
				{Object.keys(errors).includes('name') && (
					<Typography
						color='primary.strawberry'
						variant='caption'
						display='block'
						gutterBottom
					>
						This field is required
					</Typography>
				)}
			</FormControl>
			<FormControl variant='standard' sx={{ mb: 3 }}>
				<InputLabel shrink htmlFor='email-input'>
					Email Address
				</InputLabel>
				<StyledInput
					size='small'
					variant='outlined'
					id='email-input'
					placeholder='e.g. stephenking@lorem.com'
					error={Object.keys(errors).includes('email')}
					{...register('email', {
						required: true,
					})}
				/>
        {Object.keys(errors).includes('email') && (
					<Typography
						color='primary.strawberry'
						variant='caption'
						display='block'
						gutterBottom
					>
						This field is required
					</Typography>
				)}
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel shrink htmlFor='phone-input'>
					Phone Number
				</InputLabel>
				<StyledInput
					size='small'
					type='number'
					variant='outlined'
					id='phone-input'
					placeholder='e.g. +1 234 567 890'
					error={Object.keys(errors).includes('phone')}
					{...register('phone', {
						required: true,
					})}
				/>
        {Object.keys(errors).includes('phone') && (
					<Typography
						color='primary.strawberry'
						variant='caption'
						display='block'
						gutterBottom
					>
						This field is required
					</Typography>
				)}
			</FormControl>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					position: 'absolute',
					bottom: 110,
				}}
			>
				{activeStep !== 1 && <Button>Go back</Button>}
				<Button
					type='submit'
					variant='contained'
					sx={{ ml: 'auto', textTransform: 'capitalize' }}
				>
					Next Step
				</Button>
			</Box>
		</Box>
	);
};

export default PersonalInfo;
