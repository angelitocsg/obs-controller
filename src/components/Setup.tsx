import React from "react";

import { IObsController, ObsStatus } from "../interfaces/IObsController";
import { Header } from "./Header";

interface IProps {
  status?: ObsStatus;
  setupData: IObsController;
  toogleSetup: () => void;
  handleSetupChange: (e: any) => void;
}

const Setup: React.FC<IProps> = ({
  status,
  setupData,
  toogleSetup,
  handleSetupChange,
}: IProps) => {
  return (
    <div className="container">
      <Header status={status} toogleSetup={toogleSetup} />
      <form>
        <div id="setupArea">
          <div className="formGroup">
            <label>Hostname</label>
            <input
              name="address"
              value={setupData.address}
              onChange={handleSetupChange}
              type="text"
            />
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              name="password"
              value={setupData.password}
              onChange={handleSetupChange}
              type="password"
              autoComplete="none"
            />
          </div>
          <div className="formGroup">
            <label>Button width</label>
            <input
              name="buttonWidth"
              value={setupData.buttonWidth}
              onChange={handleSetupChange}
              type="number"
              step={15}
              autoComplete="none"
            />
          </div>
          <div className="formGroup">
            <label>Buttons</label>
            <div className="optButton">
              <input
                type="radio"
                value={2}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 2}
              />
              2
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={4}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 4}
              />
              4
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={6}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 6}
              />
              6
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={8}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 8}
              />
              8
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={10}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 10}
              />
              10
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={12}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 12}
              />
              12
            </div>
            <div className="optButton">
              <input
                type="radio"
                value={14}
                onChange={handleSetupChange}
                name="buttons"
                checked={setupData.buttons === 14}
              />
              14
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Setup };
