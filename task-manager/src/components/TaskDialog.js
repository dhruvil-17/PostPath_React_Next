"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function TaskDialog({
  open,
  handleClose,
  handleSubmit,
  initialData,
  users,
  role,
}) {
  const {
    control,
    handleSubmit: submitForm,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      assignedTo: "",
      assignedBy: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        assignedTo: "",
        assignedBy: "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    handleSubmit(data);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
     
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 22 }}>
        {initialData ? "✏️ Edit Task" : "🚀 Create New Task"}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="outlined"
              sx={{
                input: { color: "#fff" },
                label: { color: "#aaa" },
              }}
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                textarea: { color: "#fff" },
                label: { color: "#aaa" },
              }}
            />
          )}
        />

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1, opacity: 0.8 }}
        >
          Assignment & Status
        </Typography>

        {/* Assign To */}
        <Controller
          name="assignedTo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Assign To"
              fullWidth
              margin="normal"
              sx={{
                label: { color: "#aaa" },
              }}
            >
              <MenuItem value="">Unassigned</MenuItem>
              {users?.map((user) => (
                <MenuItem key={user.uid} value={user.uid}>
                  👤 {user.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Status"
              fullWidth
              margin="normal"
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="todo">
                <Chip label="Todo" size="small" />
              </MenuItem>
              <MenuItem value="in-progress">
                <Chip label="In Progress" color="warning" size="small" />
              </MenuItem>
              <MenuItem value="done">
                <Chip label="Done" color="success" size="small" />
              </MenuItem>
            </TextField>
          )}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={submitForm(onSubmit)}
          sx={{
            borderRadius: 3,
            px: 4,
            textTransform: "none",
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          }}
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
