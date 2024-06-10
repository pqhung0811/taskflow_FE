import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux/es/exports";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { toast } from "react-toastify";
import { mapData } from "../../utils/taskMaper";
import { getAllTasks } from "../tasks/allTasksSlice";
import { useDispatch } from "react-redux";

const initialState = {
  isLoading: true,
  members: [],
  tasks: [],
  project: {},
  currentTask: {},
};
export const getProjectMembers = createAsyncThunk(
  "allProjects/getProjects/getProjectMembers",
  async (projectId, thunkAPI) => {
    let url = `/projects/${projectId}/members`;
    // let url = `/projets/${projectId}/members`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const getProjectTasks = createAsyncThunk(
  "allProjects/getProjects/getProjectTasks",
  async (projectId, thunkAPI) => {
    let url = `/projects/${projectId}/tasks`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const getCurrentTask = createAsyncThunk(
  "allTasks/getCurrentTask",
  async (taskId, thunkAPI) => {
    let url = `/tasks/currentTask/${taskId}`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const addMemberToProject = createAsyncThunk(
  "allProjects/getProjects/addMember",
  async (data, thunkAPI) => {
    let url = `/projects/joinMember`;

    try {
      const resp = await customFetch.post(url, data);
      // console.log("postrequest sent");
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const updateTaskState = createAsyncThunk(
  "allTasks/updateTaskState",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/tasks/modifyState", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskTitle = createAsyncThunk(
  "allTasks/updateTaskTitle",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/tasks/modifyTitle", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskDesc = createAsyncThunk(
  "allTasks/updateTaskDesc",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/tasks/modifyDescription", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskProgress = createAsyncThunk(
  "allTasks/updateTaskProgress",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/tasks/modifyProgress", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addCommentToTask = createAsyncThunk(
  "allTasks/addComment",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/tasks/comment", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTaskDeadLine = createAsyncThunk(
  "allTasks/updateTaskDeadLine",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/tasks/modifyDeadline", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const createTask = createAsyncThunk(
  "tasks/addNewTask",
  async (task, thunkAPI) => {
    const task1 = {
      title: task.title,
      deadline: task.deadline.toISOString(),
      email: task.email,
      priority: task.priority,
      projectId: task.projectId,
      description: task.description,
      category: task.category,
    };
    //console.log('tacheEnv');
    //console.log(tache.titre);
    let url = `/tasks/create`;

    try {
      const resp = await customFetch.post(url, task1);

      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
/* const { allProjects } = useSelector((store) => store.allProjects);
export const getCurrentProject = (projectId) => {
  return allProjects.find((p) => p.id == projectId);
}; */

export const addFileAttachment = createAsyncThunk(
  "tasks/addFile",
  async (info, thunkAPI) => {
    let url = `/tasks/addFile`;

    try {
      const resp = await customFetch.post(url, info);

      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteFileAttachment = createAsyncThunk(
  "tasks/deleteFile",
  async (fileId, thunkAPI) => {
    let url = `/file/${fileId}`;

    try {
      const resp = await customFetch.delete(url, fileId);

      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const updatePriority = createAsyncThunk(
  "tasks/modifyPriority",
  async (info, thunkAPI) => {
    let url = `/tasks/modifyPriority`;

    try {
      const resp = await customFetch.patch(url, info);

      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, thunkAPI) => {
    let url = `/tasks/delete/${taskId}`;

    try {
      const resp = await customFetch.delete(url);

      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const removeMember = createAsyncThunk(
  "project/removemember",
  async (info, thunkAPI) => {
    let url = `/projects/deleteMember`;

    try {
      const resp = await customFetch.patch(url, info);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const reAssignTask = createAsyncThunk(
  "project/reAssignTask",
  async (info, thunkAPI) => {
    let url = `/tasks/modifyResponsible`;

    try {
      const resp = await customFetch.patch(url, info);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      //state.page = 1;
      state[name] = value;
    },
    setCurrentProject: (state, payload) => {
      return { ...state, project: payload };
    },
    getCurrentProject: (state) => {
      return state;
      console.log(state);
    },
    /* clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    }, 
    changePage: (state, { payload }) => {
      state.page = payload;
    },*/
    clearCurrentProjectState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectMembers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.members = payload.members;

        console.log(payload.members);
      })
      .addCase(getProjectMembers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getProjectTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload.tasks;

        console.log(payload.tasks);
      })
      .addCase(getProjectTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(addMemberToProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMemberToProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.members = [...state.members, payload.member];

        toast.success(payload.member.name + " is successfully added");
      })
      .addCase(addMemberToProject.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })
      .addCase(updateTaskState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks.forEach((task)=>{
          if(task.id == payload.task.id){
            console.log(task)
            task.state = payload.task.state
          }
        })

        state.mapedTasks = mapData(state.tasks);

        //console.log(payload.task);
      })
      .addCase(updateTaskState.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const task = payload.task;
        state.tasks = [...state.tasks, task];
        console.log("task created" + task);

        toast.success("task created successfully");
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateTaskTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskTitle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        // state.tasks = state.tasks.map((task) => {
        //   if (task.id === editedTask.id) {
        //     state.currentTask = editedTask;
        //     return editedTask;
        //   }
        //   return task;
        // });

        toast.success("title has been successfully changed");
      })
      .addCase(updateTaskTitle.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("there was an error, the title has not been modified");
      })
      .addCase(updateTaskDesc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskDesc.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        toast.success("description of the task modified successfully");
      })
      .addCase(updateTaskDesc.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the description has not been modified"
        );
      })
      .addCase(updateTaskDeadLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskDeadLine.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        toast.success("deadLine of task modified successfully");
      })
      .addCase(updateTaskDeadLine.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("there was an error, the deadLine was not modified");
      })
      .addCase(addCommentToTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentToTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        toast.success("Comment recorded!");
      })
      .addCase(addCommentToTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the comment was not saved"
        );
      })
      .addCase(getCurrentTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.currentTask = payload.task;

        //toast.success('Comment recorded!');
      })
      .addCase(getCurrentTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("there was an error connecting to the server");
      })
      .addCase(updateTaskProgress.pending, (state) => {
        //state.isLoading = true;
      })
      .addCase(updateTaskProgress.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;

        state.currentTask = editedTask;
        //console.log("currentTask : " + state.currentTask);

        toast.success("Modified progress!");
      })
      .addCase(updateTaskProgress.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("there was an error connecting to the server");
      })
      .addCase(addFileAttachment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFileAttachment.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the file was not saved"
        );
      })
      .addCase(addFileAttachment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("File recorded!");
      })
      .addCase(deleteFileAttachment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFileAttachment.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the file was not deleted"
        );
      })
      .addCase(deleteFileAttachment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("File was deleted!");
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(t => t.id !== payload);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("there was an error connecting to the server");
      })
      .addCase(updatePriority.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePriority.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        toast.success("priority of the task modified successfully");
      })
      .addCase(updatePriority.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the priority has not been updated"
        );
      })
      .addCase(removeMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeMember.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.members = payload.members;
        toast.success("member is removed successfully");
      })
      .addCase(removeMember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error, the removing has not been updated"
        );
      })
      .addCase(reAssignTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reAssignTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.task;
        state.currentTask = editedTask;
        toast.success("Success");
      })
      .addCase(reAssignTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(
          "there was an error"
        );
      });

    /* .addCase(getCurrentProject, (state, payload) => {
        state.isLoading = false;
        state.project = payload;
      }) */
  },
});
export default currentProjectSlice.reducer;
export const {
  handleChange,
  setCurrentProject,
  getCurrentProject,
  clearCurrentProjectState,
} = currentProjectSlice.actions;
