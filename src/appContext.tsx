import React from "react";

import { IObsController } from "./interfaces/IObsController";

const ObsControllerStateContext = React.createContext<IObsController>({});
const ObsControllerDispatchContext = React.createContext<any>({});

export interface IAction {
  type?: string;
  payload?: any;
}

const defaultState: IObsController = {
  address: "localhost",
  port: 4444,
  buttons: 8,
  buttonWidth: 100,
};

const loadState = (): IObsController => {
  var stateLocal = localStorage.getItem("setup");
  if (!stateLocal) return defaultState;
  return JSON.parse(stateLocal);
};

const initialState: IObsController = loadState();

const obsControllerReducer = (
  state: IObsController,
  action: IAction
): IObsController => {
  switch (action.type) {
    case "setup": {
      saveState({ ...action.payload });
      return {
        ...state,
        ...action.payload,
      };
    }
    case "status": {
      return { ...state, status: action.payload };
    }
    case "scenes": {
      return { ...state, scenes: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const saveState = (setup: IObsController) => {
  localStorage.setItem("setup", JSON.stringify(setup));
};

const ObsProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(
    obsControllerReducer,
    initialState
  );

  return (
    <ObsControllerStateContext.Provider value={state}>
      <ObsControllerDispatchContext.Provider value={dispatch}>
        {children}
      </ObsControllerDispatchContext.Provider>
    </ObsControllerStateContext.Provider>
  );
};

const useObsState = () => {
  const context = React.useContext(ObsControllerStateContext);
  if (context === undefined) {
    throw new Error("useObsState must be used within a CountProvider");
  }
  return context;
};

const useObsDispatch = () => {
  const context = React.useContext(ObsControllerDispatchContext);
  if (context === undefined) {
    throw new Error("useObsDispatch must be used within a CountProvider");
  }
  return context;
};

export { ObsProvider, useObsState, useObsDispatch };
