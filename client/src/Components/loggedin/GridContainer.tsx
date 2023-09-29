import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Breaktime from './Breaktime';
import Checkin from './Checkin';


// const StyledCheckin = styled(Checkin)`
//   padding: 8px 16px;
//   background-color: #9400D3;
//   color: #fff;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const StyledBreaktime = styled(Breaktime)`
//   display: flex;
//   align-items: center;
// `;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#ce93d8' : '#9400D3',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border:1,


  
}));

export default function GridContainer() {
  return (
    <div>
    <Item>
  <Checkin />
  <Breaktime checkinrun={false}/>
  </Item>
  </div>
  );
}
