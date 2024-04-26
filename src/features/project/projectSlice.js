import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";

const initialState = {
  isLoading: true,
  projects: [],
  totalProjects: 0,
};

export const getAllProjects = createAsyncThunk(
  "allProjects/getProjects",
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage();
    // let url = `/projects/${user.email}`;
    let url = `/projects`;
        
    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
/*export const getTasksByProject = createAsyncThunk(
  "allProjects/getProjects/getProjectTasks",
  async (projectId, thunkAPI) => {
    let url = `/projets/${projectId}/tasks`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);*/

export const updateProjectState = createAsyncThunk(
  "allProjects/updateProjectState",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/projets/modifierEtat", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "allProjects/addNewProject",
  async (newProject, thunkAPI) => {
    let url = "/projects/create";

    try {
      const resp = await customFetch.post(url, newProject);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allProjectsSlice = createSlice({
  name: "allProjects",
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
    /* clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    }, 
    changePage: (state, { payload }) => {
      state.page = payload;
    },*/
    clearAllProjectsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(JSON.stringify(payload));
        // state.projects = payload;
        // state.totalProjects = payload.length;
        state.projects = payload.projects;
        state.totalProjects = payload.projects.length;
        console.log("lmao prjslice: " + payload.projects.length);
      })
      .addCase(getAllProjects.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateProjectState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProjectState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = state.projects.map((project) => {
          if (project.id == payload.task.id)
            return { ...project, etat: payload.task.state };
          return project;
        });

        console.log(payload.task);
      })
      .addCase(updateProjectState.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = [...state.projects, payload.project];
        console.log("project created");
        toast.success("project created successfully!");
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
    /*.addCase(getTasksByProject.pending, (state) => {})
      .addCase(getTasksByProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const currentProjectId = payload.idProjet;
        state.projects = state.projects.map((p) => {
          if (p.id == currentProjectId) p.tasks = payload.tasks;
          return p;
        });

        //toast.success("tasks got from backend");
      })
      .addCase(getTasksByProject.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })*/
  },
});
export default allProjectsSlice.reducer;
