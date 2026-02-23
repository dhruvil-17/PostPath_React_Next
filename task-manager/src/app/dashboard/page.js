"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, stack } from "@mui/material"
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/redux/taskSlice";
import { fetchUsers } from "@/redux/usersSlice";
import { useEffect, useState } from "react";
import TaskDialog from "@/components/TaskDialog";
import AdminPanelDialog from "@/components/AdminPanelDialog";
import { signOut } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebaseClient";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Box,
  Grid,
} from "@mui/material";



export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);



  //for pagination 
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const [adminOpen, setAdminOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);


  // Helpers
  const getUserName = (uid) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.name : "Themselves";
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "todo":
        return "in-progress";
      case "in-progress":
        return "done";
      case "done":
        return "todo";
      default:
        return "todo";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "primary";
      case "in-progress":
        return "warning";
      case "done":
        return "success";
      default:
        return "default";
    }
  };

  const getNextStatusColor = (status) => {
    const next = getNextStatus(status);
    return getStatusColor(next);
  };

  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.toLowerCase();
    return (
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  });
  const formatDate = (date) => {
    if (!date) return "—";


    const d = date?.seconds ? new Date(date.seconds * 1000) : new Date(date);

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Effects


  useEffect(() => {
    if (auth.loading) return;

    if (!auth.user) {
      router.push("/login");
      return;
    }

    dispatch(fetchUsers());
    dispatch(fetchTasks(auth.user.uid));
  }, [dispatch, auth.user, auth.loading]);


  // Handlers


  const handleCreate = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingTask) {
      dispatch(
        updateTask({
          id: editingTask.id,
          updates: data,
        })
      );
    } else {
      dispatch(
        createTask({
          ...data,
          ownerId: auth.user.uid,
          assignedBy: auth.user.uid,
          dueDate: new Date(),
        })
      );
    }
  };

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    router.push("/login");
  };

  const handleStatusToggle = (task) => {
    const nextStatus = getNextStatus(task.status);

    dispatch(
      updateTask({
        id: task.id,
        updates: { status: nextStatus },
      })
    );
  };

  // CSV Export


  const exportToCSV = () => {
    const headers = [
      "Title",
      "Description",
      "Status",
      "Assigned To",
      "Created By",
    ];

    const rows = paginatedTasks.map((task) => [
      task.title,
      task.description,
      task.status,
      task.assignedTo ? getUserName(task.assignedTo) : "Themselves",
      getUserName(task.assignedBy),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tasks.csv";
    link.click();
  };


  // UI


  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(17, 24, 39, 0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Welcome, {auth?.user?.name}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ borderRadius: 3, textTransform: "none", px: 3 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className="max-w-6xl mx-auto px-6 py-8">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 mb-8 rounded-xl bg-gray-900 border border-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />


        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Tasks
          </Typography>

          <div className="flex gap-3">
            {auth?.user?.role === "admin" && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setAdminOpen(true)}
                  sx={{ textTransform: "none", borderRadius: 3 }}
                >
                  Admin Panel
                </Button>

                <Button
                  variant="outlined"
                  onClick={exportToCSV}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    borderColor: "#4F46E5",
                    color: "#6366F1",
                  }}
                >
                  Export CSV
                </Button>
              </>
            )}

            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                background: "#6366F1",
              }}
            >
              + Add Task
            </Button>
          </div>
        </div>


        {loading && (
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        )}


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks?.map((task) => (
            <Card
              key={task.id}
              sx={{
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}>
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
                >
                  {task.description}
                </Typography>

                {task.assignedTo && (
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Assigned To: {getUserName(task.assignedTo)}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
                >
                  Created By: {getUserName(task.assignedBy)}
                </Typography>
                <Stack spacing={0.5} mb={2}>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                    Created: {formatDate(task.createdAt)}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        new Date(task.dueDate) < new Date()
                          ? "#f87171"
                          : "rgba(255,255,255,0.5)",
                    }}
                  >
                    Due: {formatDate(task.dueDate)}
                  </Typography>
                </Stack>


                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Typography variant="body2 " sx={{ color: "rgba(255,255,255,0.6)" }}>Status:</Typography>
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    size="small"
                    sx={
                      task.status === "todo"
                        ? {
                          backgroundColor: "#1e293b",
                          color: "#60a5fa",
                          fontWeight: 500,
                        }
                        : {}
                    }
                  />
                </Stack>


                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color={getNextStatusColor(task.status)}
                  onClick={() => handleStatusToggle(task)}
                  sx={{ textTransform: "none", mb: 2, borderRadius: 2 }}
                >
                  Move to {getNextStatus(task.status)}
                </Button>


                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      setEditingTask(task);
                      setOpen(true);
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>

                  {(auth?.user?.role === "admin" ||
                    task.ownerId === auth?.user?.uid) && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        Delete
                      </Button>
                    )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Stack spacing={2} alignItems="center" mt={4}>
        <Pagination
          count={Math.ceil(tasks.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>

      <TaskDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        initialData={editingTask}
        users={users}
        role={auth?.user?.role}
      />

      <AdminPanelDialog
        open={adminOpen}
        handleClose={() => setAdminOpen(false)}
        users={users}
        tasks={tasks}
      />
    </div>
  );
}