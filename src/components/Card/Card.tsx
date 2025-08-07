import {
	Box,
  Card as MUICard,
	CardContent,
	Divider,
  Typography,
} from '@mui/material';

export const Card = ({
	key,
	title = '',
	subtitles = [],
	imageUrl = '/src/assets/pokeball.png',
}: {
	key: any,
	title: string,
	subtitles?: string[],
	imageUrl: string,
}) => {
	return (
    <MUICard key={key} sx={{ height: 175, width: 150, display: 'flex', flexDirection: 'column' }}>
			<Box>
				<Typography variant="h6" sx={{ textAlign: 'center', lineHeight: title.length > 10 ? '1' : '1.6', marginTop: title.length > 10 ? '6px' : '' }}>
					{title}
				</Typography>
				
				<Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
					{subtitles.map((subtitle: string) => subtitle).join(', ')}
				</Typography>
			</Box>

			<Divider />

			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexGrow: 1,
				padding: '2px 0px',
				height: title.length > 10 ? '45%' : '65%',
			}}>
				<img src={imageUrl} alt={`Image for ${title}`} style={{ maxHeight: '100%', maxWidth: '100%', padding: '0px' }}/>
			</Box>
		</MUICard>
	);
};