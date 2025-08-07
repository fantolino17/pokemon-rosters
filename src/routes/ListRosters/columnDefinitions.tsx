import { Button } from '@mui/material';

export const getColumnDefinitions = ({
  onEdit,
  onDelete,
}: {
  onEdit: (params: any) => void,
  onDelete: (params: any) => void,
}) => {
  return [
    { field: 'id', headerName: 'ID', width: 75 },
    {
      field: 'name',
      headerName: 'Roster Name',
      width: 225,
    },
    {
      field: 'team',
      headerName: 'Team Ids',
      width: 250,
      valueFormatter: (value: string[]) => value.join(', ').toString(),
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 250,
      valueFormatter: (value: string) => new Date(value).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'long' }),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params: any) => (
        <Button
          variant="text"
          size="large"
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => onEdit(params)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params: any) => (
        <Button
          variant="text"
          color="warning"
          size="large"
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => onDelete(params)}
        >
          Delete
        </Button>
      ),
    },
  ];
}

