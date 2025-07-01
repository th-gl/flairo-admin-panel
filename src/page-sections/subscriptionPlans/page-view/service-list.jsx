import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DB } from "@/contexts/firebaseContext.jsx";
import HeadingArea from "../HeadingArea.jsx";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Scrollbar from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import Table from "@mui/material/Table";
import ServiceTableHead from "../ServiceTableHead.jsx";
import TableBody from "@mui/material/TableBody";
import ServiceTableRow from "../ServiceTableRow.jsx";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Validation Schema
const subscriptionSchema = Yup.object().shape({
  name: Yup.string()
    .required("Plan name is required")
    .max(50, "Plan name must be at most 50 characters"),
  type: Yup.string().required("Plan type is required"),
  aiprompts: Yup.number()
    .required("AI prompts count is required")
    .min(0, "Must be at least 0")
    .integer("Must be a whole number"),
  features: Yup.object().shape({
    toneAnalysis: Yup.boolean(),
    interestRate: Yup.boolean(),
    mixedSignals: Yup.boolean(),
    unspokenTruth: Yup.boolean(),
    aiSuggestedNextMove: Yup.boolean(),
  }),
});

export default function ServiceList() {
  const { t } = useTranslation();
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleSelectRow,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
    selected,
    isSelected,
    handleChangePage,
  } = useMuiTable({ defaultOrderBy: "name" });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const PLANS = ["Basic", "Standard", "Popular"];

  const featureLabels = {
    toneAnalysis: "Tone Analysis",
    interestRate: "Interest Rate",
    mixedSignals: "Mixed Signals",
    unspokenTruth: "Unspoken Truth",
    aiSuggestedNextMove: "AI Suggested Next Move",
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "Basic",
      aiprompts: 0,
      features: {
        toneAnalysis: false,
        interestRate: false,
        mixedSignals: false,
        unspokenTruth: false,
        aiSuggestedNextMove: false,
      },
    },
    validationSchema: subscriptionSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        
        if (!values.name || !values.type || values.aiprompts === null) {
          toast.error("Please fill all required fields");
          return;
        }

        const currentTime = new Date();
        const subscriptionData = {
          name: values.name,
          type: values.type,
          aiprompts: Number(values.aiprompts),
          features: values.features,
          updatedAt: currentTime,
        };

        if (isEditing && currentPlan) {
          // Update existing document
          await updateDoc(doc(DB, "subscription", currentPlan.id), {
            ...subscriptionData,
            createdAt: currentPlan.createdAt, // Preserve original creation time
          });
          toast.success("Subscription plan updated successfully");
        } else {
          // Create new document
          const docRef = await addDoc(collection(DB, "subscription"), {
            ...subscriptionData,
            createdAt: currentTime,
          });
          subscriptionData.id = docRef.id;
          toast.success("Subscription plan created successfully");
        }

        await fetchPlans();
        setOpenCreateDialog(false);
        resetForm();
        setIsEditing(false);
        setCurrentPlan(null);
      } catch (error) {
        console.error("Error saving subscription:", error);
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} subscription plan`);
      } finally {
        setSubmitting(false);
      }
    },
  });

    const handleEditPlan = (plan) => {
    setCurrentPlan(plan);
    setIsEditing(true);
    formik.setValues({
      name: plan.name,
      type: plan.type,
      aiprompts: plan.aiprompts,
      features: plan.features || {
        toneAnalysis: false,
        interestRate: false,
        mixedSignals: false,
        unspokenTruth: false,
        aiSuggestedNextMove: false,
      },
    });
    setOpenCreateDialog(true);
  };
 const fetchPlans = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(DB, "subscription"));
        const plansData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlans(plansData);
        console.log('plansData',plansData)
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load subscription plans");
      } finally {
        setLoading(false);
      }
    };
  // Fetch existing plans from Firebase
  useEffect(() => {
   

    fetchPlans();
  }, []);

  const filteredPlans = stableSort(plans, getComparator(order, orderBy));

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Card>
            <Box p={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <HeadingArea
                  title="Subscription Plans Management"
                  subtitle="Create and manage subscription plans"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenCreateDialog(true)}
                >
                  Create New Plan
                </Button>
              </Box>
            </Box>

            {selected.length > 0 && (
              <TableToolbar
                selected={selected.length}
                handleDeleteRows={() => {
                  // Handle bulk delete if needed
                }}
              />
            )}

            <TableContainer>
              <Scrollbar autoHide={false}>
                <Table>
                  <ServiceTableHead
                    order={order}
                    orderBy={orderBy}
                    numSelected={selected.length}
                    rowCount={filteredPlans.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllRows={handleSelectAllRows(
                      filteredPlans.map((row) => row.id)
                    )}
                  />

                  <TableBody>
                    {filteredPlans
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((plan) => (
                        <ServiceTableRow
                          key={plan.id}
                          fetchPlans={fetchPlans}
                          plan={plan}
                          isSelected={isSelected(plan.id)}
                          handleSelectRow={handleSelectRow}
                           handleEditPlan={handleEditPlan}
                        />
                      ))}

                    {filteredPlans.length === 0 && (
                      <TableDataNotFound
                        title="No subscription plans found"
                        subtitle="Try creating a new plan"
                      />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={filteredPlans.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Card>

          {/* Create New Plan Dialog */}
          <Dialog
            open={openCreateDialog}
            onClose={() => {
              setOpenCreateDialog(false);
              formik.resetForm();
            }}
            maxWidth="sm"
            fullWidth
          >
            <form onSubmit={formik.handleSubmit}>

              <DialogTitle>
                {isEditing ? "Edit Subscription Plan" : "Create New Subscription Plan"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Plan Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" error={formik.touched.type && Boolean(formik.errors.type)}>
                      <InputLabel>Plan Type</InputLabel>
                      <Select
                        name="type"
                        value={formik.values.type}
                        label="Plan Type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {PLANS.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="aiprompts"
                      label="AI Prompts"
                      value={formik.values.aiprompts}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.aiprompts && Boolean(formik.errors.aiprompts)}
                      helperText={formik.touched.aiprompts && formik.errors.aiprompts}
                      margin="normal"
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                      Features
                    </Typography>
                    <FormGroup>
                      {Object.entries(featureLabels).map(([key, label]) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              name={`features.${key}`}
                              checked={formik.values.features[key]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </FormGroup>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                     <Button
                  onClick={() => {
                    setOpenCreateDialog(false);
                    formik.resetForm();
                    setIsEditing(false);
                    setCurrentPlan(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting 
                    ? isEditing 
                      ? "Updating..." 
                      : "Creating..." 
                    : isEditing 
                      ? "Update Plan" 
                      : "Create Plan"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )}
    </>
  );
}