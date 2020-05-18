import React from "react";
import { IObsController } from "./interfaces/IObsController";

const ObsControllerStateContext = React.createContext<IObsController>({});
const ObsControllerDispatchContext = React.createContext<any>({});

export interface IAction {
  type?: string;
  payload?: any;
}

const initialState: IObsController = {
  address: "localhost:4444",
};

const obsControllerReducer = (
  state: IObsController,
  action: IAction
): IObsController => {
  switch (action.type) {
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
