"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/redux/taskSlice";
import { fetchUsers } from "@/redux/usersSlice";
import { useEffect, useState } from "react";
import TaskDialog from "@/components/TaskDialog";
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
} from "@mui/material";


export default function Dashboard() {
  


  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const { tasks, loading } = useSelector((state) => state.tasks);

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { users } = useSelector((state) => state.users);
  const getUserName = (uid) => {
    const user = users.find((u) => u.uid === uid);
    return user ? user.name : "Unknown";
  };

 useEffect(() => {
  if (auth.loading) return; 

  if (!auth.user) {
    router.push("/login");
    return;
  }

  dispatch(fetchUsers());
  dispatch(fetchTasks({uid : auth.user.uid , role : auth.user.role}));
}, [dispatch, auth.user, auth.loading]);

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
        }),
      );
    } else {
      dispatch(
        createTask({
          ...data,
          ownerId: auth.user.uid,
          assignedBy: auth.user.uid,
          dueDate: new Date(),
        
        }),
      );
    }
  };
  const handleLogout = async () => {
    await signOut(firebaseAuth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AppBar
        position="static"
        className="bg-gray-900 shadow-none border-b border-gray-800"
      >
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="font-semibold">
            {auth?.user?.name}'s Dashboard
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            className="normal-case"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h4" className="font-bold">
            My Tasks
          </Typography>

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ textTransform: "none" }}
          >
            + Add Task
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task) => (
            <Card
              key={task.id}
              className="bg-gray-900 border border-gray-800 rounded-xl hover:shadow-xl transition hover:-translate-y-1"
            >
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {task.title}
                </Typography>

                <Typography variant="subtitle1" className="text-gray-400">
                  {task.description}
                </Typography>
                {task.assignedTo && (
                  <Typography variant="body2" className="text-gray-400 mt-2">
                    Assigned To: {getUserName(task.assignedTo)}
                  </Typography>
                )}

                {task.assignedBy && (
                  <Typography variant="body2" className="text-gray-400">
                    Assigned By: {getUserName(task.assignedBy)}
                  </Typography>
                )}

                <Chip label={task.status} size="small" sx={{ mb: 2 }} />

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

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(deleteTask(task.id))}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TaskDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        initialData={editingTask}
        users={users}
      />
    </div>
  );
}
