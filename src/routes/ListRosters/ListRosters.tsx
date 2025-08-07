import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Divider, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getColumnDefinitions } from './columnDefinitions';
import { deleteRoster, getRosters } from '../../api/roster';
import type { DeleteRosterResponse, InfoBanner, Roster } from '../../types'

const ListRosters = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ bannerInfo, setBannerInfo ] = useState<InfoBanner>(null);
  const [ rosters, setRosters ] = useState<Roster[]>([]);
  const navigate = useNavigate();

  const fetchRosters = async () => {
    setIsLoading(true);
    const rosters = await getRosters();
    setRosters(rosters);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRosters();
  }, []);

  const handleOnEdit = ({ row }: { row: { id: string, name: string} }) => {
    const { id } = row;
    navigate(`/edit/${id}`);
  };

  // TODO: Add confirmation modal to confirm deletion.
  const handleOnDelete = async ({ row }: { row: { id: string, name: string} }): Promise<void> => {
    setIsLoading(true);
    const { id, name } = row;
    const { error } = await deleteRoster(id) as DeleteRosterResponse;
    if (error) {
      setBannerInfo({
        severity: 'error',
        message: `Failed to delete ${name}, please try again.` 
      });
    } else {
      setBannerInfo({
        severity: 'success',
        message: `Successfully deleted ${name}` 
      });
      fetchRosters();
    }
  };

  const columns = useMemo(() => {
    return getColumnDefinitions({
      onEdit: handleOnEdit,
      onDelete: handleOnDelete
    })
  }, []);

  return (
    <Box sx={{ maxHeight: '75vh', margin: '48px' }}>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr',  alignItems: 'center', margin: '12px' }}>
        <Typography variant="h4">Your Rosters</Typography>
        {bannerInfo &&
          <Alert severity={bannerInfo.severity} onClose={() => setBannerInfo(null)}>
            {bannerInfo.message}
          </Alert>
        }
      </Box>
      <Divider />
      <DataGrid
        density='comfortable'
        sx={{ fontSize: '1.25rem', margin: '24px auto', width: 'fit-content', maxHeight: '70vh' }}
        rowSelection={false}
        rows={rosters}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={isLoading}
      />
    </Box>
  );
};

export default ListRosters;


