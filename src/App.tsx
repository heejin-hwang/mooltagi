import React, { useEffect, useState } from 'react';
import './App.css';
import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';

const App = () => {
  const [inputs, setInputs] = useState({
    averagePrice: 0,
    shares: 0,
    purchasePrice: 0,
    purchaseShares: 0,
  });
  const { averagePrice, shares, purchasePrice, purchaseShares } = inputs;

  const [total, setTotal] = useState<number>(0);
  const [purchaseTotal, setPurchaseTotal] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [finalShares, setFinalShares] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const onChange = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isVisibleCurrent = !!averagePrice && !!shares;
  const isVisiblePurchase = !!purchasePrice && !!purchaseShares;
  const isVisibleTotal = !!total && !!purchaseTotal;
  const isVisibleFinal = !!finalTotal && !!finalShares;

  useEffect(() => {
    if (isVisibleCurrent) {
      setTotal(averagePrice * shares);
    }
  }, [averagePrice, shares]);

  useEffect(() => {
    if (isVisiblePurchase) {
      setPurchaseTotal(purchasePrice * purchaseShares);
    }
  }, [purchasePrice, purchaseShares]);

  useEffect(() => {
    if (isVisibleTotal) {
      setFinalShares(Number(shares) + Number(purchaseShares));
      setFinalTotal(total + purchaseTotal);
    }
  }, [total, purchaseTotal]);

  useEffect(() => {
    if (isVisibleFinal) {
      setFinalPrice(finalTotal / finalShares);
    }
  }, [finalTotal, finalShares]);

  const paperStyle = {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: 1,
  };

  return (
    <div className='App'>
      <Typography variant='h1' sx={{ margin: 5, fontFamily: 'Poor Story' }}>
        물타기
      </Typography>
      <Paper sx={paperStyle}>
        <Stack spacing={2}>
          <TextField
            name='averagePrice'
            label='1주 당 평균구매 가격'
            variant='standard'
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
          <TextField name='shares' label='보유한 주식 수' variant='standard' onChange={onChange} />
          <TextField
            name='total'
            label='총 금액'
            variant='standard'
            value={isVisibleCurrent ? total : ''}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
        </Stack>
      </Paper>
      <Paper sx={paperStyle}>
        <Stack spacing={2}>
          <TextField
            name='purchasePrice'
            label='구입할 주식 가격'
            variant='standard'
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
          <TextField name='purchaseShares' label='구입할 주식 수' variant='standard' onChange={onChange} />
          <TextField
            name='purchaseTotal'
            label='총 금액'
            variant='standard'
            value={isVisiblePurchase ? purchaseTotal : ''}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
        </Stack>
      </Paper>
      <Paper sx={paperStyle}>
        <Stack spacing={2}>
          <TextField
            name='finalPrice'
            label='최종 주식 가격'
            variant='standard'
            value={isVisibleTotal ? finalPrice : ''}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
          <TextField
            name='finalShares'
            label='최종 주식 구입 수'
            variant='standard'
            InputProps={{
              readOnly: true,
            }}
            value={isVisibleTotal ? finalShares : ''}
          />
          <TextField
            name='finalTotal'
            label='총 금액'
            variant='standard'
            value={isVisibleFinal ? finalTotal : ''}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position='end'>₩</InputAdornment>,
            }}
          />
        </Stack>
      </Paper>
    </div>
  );
};

export default App;
