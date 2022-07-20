import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";
import {nanoid} from "nanoid";

interface LostFiguresProps {
  tittle: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({tittle, figures}) => {
  return (
    <div className="lost">
      <h3>{tittle}</h3>
      {figures.map(figure =>
        <div key={nanoid()}>
          {figure.name} {!!figure.logo && <img width={20} height={20} src={figure.logo} alt=''/>}
        </div>
      )}
    </div>
  );
};

export default LostFigures;