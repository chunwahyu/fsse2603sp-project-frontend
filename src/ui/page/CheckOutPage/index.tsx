import {Button, Container, Paper, Typography} from "@mui/material";
import CheckOutGridTable from "./component/CheckOutGridTable.tsx";
import {useContext, useEffect, useState} from "react";
import type {TransactionDto} from "../../../data/transaction/transaction.type.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
//import mockData from "./response.json";
import {useNavigate, useParams} from "@tanstack/react-router";
import {
  getTransactionByTid,
  processTransactionByTid,
  successTransactionByTid
} from "../../../api/transactionApi.ts";
import {UserContext} from "../../../context/UserContext.jsx.ts";

export default function CheckOutPage() {

  const navigate = useNavigate({from: "/checkout/$transactionId"});
  const {transactionId} = useParams({from: "/checkout/$transactionId"});

  const loginUser = useContext(UserContext);

  const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const handlePayClick = async () => {
    setIsPaying(true);
    await processTransactionByTid(transactionId);
    await successTransactionByTid(transactionId);
    void navigate({to: "/thankyou"});
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      const responseData = await getTransactionByTid(transactionId);
      setTransactionDto(responseData);
      //setTransactionDto(mockData);
      setIsLoading(false);
      document.title = "Check Out";
    }
    if(loginUser) {
      void fetchTransaction();
    } else if(loginUser === null) {
      void navigate({to: "/login"});
    }
  }, [loginUser]);

  return (
      <>
        <Container>
          <Typography variant="h6" sx={{m: 1}}>
            Check Out
          </Typography>
          {
            transactionDto && !isLoading
              ? (
                    <>
                      <CheckOutGridTable transactionDto={transactionDto}/>
                      <Paper elevation={2}
                             sx={{m: 1, p: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                        <Typography variant="body1" align="right">
                          Total: HK${transactionDto.total.toLocaleString()}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{textTransform: "none"}}
                            onClick={handlePayClick}
                            disabled={isPaying}
                        >
                          Process to Payment</Button>
                      </Paper>
                    </>
                ):(
                    <LoadingContainer />
                )
          }
        </Container>
      </>
  )
}