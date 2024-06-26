import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { toast } from 'react-toastify';
import { mapData } from '../../utils/taskMaper';

const initialState = {
  isLoading: true,
  tasks: [],
  totalTasks: 0,
  mapedTasks: {},
};

export const getAllTasks = createAsyncThunk(
  'allTasks/getTasks',
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage();
    // let url = `/taches/${user.email}`;
    let url = '/tasks'

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
export const updateTaskState = createAsyncThunk(
  'allTasks/updateTaskState',
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/tasks/modifyState', info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const allTasksSlice = createSlice({
  name: 'allTasks',
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
    clearAllTasksState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload.tasks;
        state.mapedTasks = mapData(state.tasks);
        console.log(`statemapedtasks ${state.mapedTasks.lanes}`);
        state.totalTasks = payload.tasks.length;
        console.log(payload.tasks);
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateTaskState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) => {
          if (task.id == payload.task.id)
            return { ...task, state: payload.task.state };
          return task;
        });
        state.mapedTasks = mapData(state.tasks);

        //console.log(payload.task);
      })
      .addCase(updateTaskState.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export default allTasksSlice.reducer;
