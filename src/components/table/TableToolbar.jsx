import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from "react-i18next";
import { alpha } from '@mui/material/styles';

export default function TableToolbar({
  selected,
  handleDeleteRows
}) {
  const { t } = useTranslation();
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
        minHeight: '64px !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <CheckCircleIcon 
          sx={{ 
            color: 'primary.main',
            fontSize: '1.5rem'
          }} 
        />
        <Box>
          <Typography
            variant="h6"
            component="div"
            color="primary.main"
            fontWeight={600}
          >
            {selected} {selected === 1 ? t("item selected") : t("items selected")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("Click the delete button to remove selected items")}
          </Typography>
        </Box>
      </Box>

      <Tooltip title={t("Delete selected items")}>
        <IconButton
          onClick={handleDeleteRows}
          sx={{
            backgroundColor: 'error.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'error.dark',
            },
            minWidth: 48,
            minHeight: 48
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}