import React from "react";

import { ObsStatus } from "../interfaces/IObsController";

interface IProps {
  status?: ObsStatus;
  toogleSetup: () => void;
}

const Header: React.FC<IProps> = ({ status, toogleSetup }: IProps) => (
  <div className="status-line">
    <div style={{ flex: 1 }}>Status: {status}</div>
    <div style={{ float: "right" }}>
      <button className="btn-setup" onClick={toogleSetup}>
        SETUP
      </button>
    </div>
  </div>
);

export { Header };
