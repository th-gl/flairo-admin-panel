import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'; // CUSTOM COMPONENT
import { useTranslation } from "react-i18next";
import FlexRowAlign from '@/components/flexbox/FlexRowAlign';
export default function TabledataIsLoading() {
  const { t } = useTranslation();
  return <TableRow>
      <TableCell colSpan={7}>
        <FlexRowAlign m={2} fontSize={18} minHeight={300} fontWeight={700} borderRadius={2} bgcolor="action.selected">
         {t("Data is Loading")}
         {/* {t("Data is Loading")} */}
        </FlexRowAlign>
      </TableCell>
    </TableRow>;
}