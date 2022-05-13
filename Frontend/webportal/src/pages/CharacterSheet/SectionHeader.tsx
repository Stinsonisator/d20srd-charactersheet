import { PropsWithChildren } from 'react';

import { Box, SxProps, Theme, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import merge from 'lodash/merge';

interface Props {
	sx?: SxProps<Theme>;
}

export default function SectionHeader({ sx, children }: PropsWithChildren<Props>): JSX.Element {
	function getSx(theme: Theme): SystemStyleObject<Theme> {
		const baseSx = {
			p: 1,
			backgroundColor: theme.palette.primary.dark,
			color: theme.palette.text.secondary,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			my: 1
		};
		if (sx && typeof sx === 'function') {
			return {
				...baseSx,
				...sx(theme)
			};
		} else if (sx && typeof sx === 'object') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return merge(baseSx, sx);
		}
		return baseSx;
	}
	return (
		<Box sx={getSx}>
			<Typography>{children}</Typography>
		</Box>
	);
}
