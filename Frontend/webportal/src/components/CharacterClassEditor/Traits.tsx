import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models';
import { useFormikContext } from 'formik';

import { CharacterClass } from '../../types/CharacterClass';

function Traits(): JSX.Element {
	const { values } = useFormikContext<CharacterClass>();

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'name', headerName: 'Name', flex: 1 },
			{
				field: 'actions',
				headerName: 'Actions',
				sortable: false,
				disableColumnMenu: true,
				renderCell: (params) => (
					<>
						<IconButton onClick={() => console.log(params.row.id)}>
							<Icon className="fa-pen" sx={{ fontSize: 16 }} />
						</IconButton>
						<IconButton onClick={() => console.log(params.row.id)}>
							<Icon className="fa-times" sx={{ fontSize: 16 }} />
						</IconButton>
					</>
				)
			}
		],
		[]
	);

	return (
		<Stack spacing={2} sx={{ height: 500 }}>
			<Box>
				<Button variant="contained" onClick={() => console.log('test')}>
					Add
				</Button>
			</Box>
			<DataGrid
				rows={values.traits ?? []}
				columns={columns}
				hideFooterPagination
				onRowDoubleClick={(params) => console.log(params.row.id)}
				initialState={{
					sorting: { sortModel: [{ field: 'name', sort: 'asc' }] }
				}}
			/>
		</Stack>
	);
}

export default Traits;
