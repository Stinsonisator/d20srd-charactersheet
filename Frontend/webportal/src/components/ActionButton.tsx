import { MouseEventHandler } from 'react';

import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

interface Props {
	onClick: MouseEventHandler<HTMLButtonElement>;
	color?: 'inherit' | 'success' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
	iconClassName: string;
}

function ActionButton({ onClick, color, iconClassName }: Props): JSX.Element {
	return (
		<IconButton color={color} onClick={onClick} sx={{ px: 1, py: 0 }}>
			<Icon className={iconClassName} sx={{ fontSize: '16px' }} />
		</IconButton>
	);
}

export default ActionButton;
