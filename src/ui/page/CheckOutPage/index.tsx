import {Button, Container, Paper, Tooltip, Typography} from "@mui/material";
import CheckOutGridTable from "./component/CheckOutGridTable.tsx";
import {useContext, useEffect, useState} from "react";
import type {TransactionDto} from "../../../data/transaction/transaction.type.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import {useNavigate, useParams} from "@tanstack/react-router";
import {
  getTransactionByTid,
  processTransactionByTid,
  successTransactionByTid
} from "../../../api/transactionApi.ts";
import {UserContext} from "../../../context/UserContext.ts";
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
//import mockData from "./response.json";

export default function CheckOutPage() {

  const navigate = useNavigate({from: "/checkout/$transactionId"});
  const {transactionId} = useParams({from: "/checkout/$transactionId"});

  const loginUser = useContext(UserContext);

  const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const handlePayClick = async () => {
    try {
      setIsPaying(true);
      await processTransactionByTid(transactionId);
      await successTransactionByTid(transactionId);
      void navigate({
        to: "/thankyou",
        state: (prev) => ({...prev, fromCheckout: true}),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPaying(false);
    }
  }

  useEffect(() => {
    document.title = "Check Out";
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setIsLoading(true);
        const responseData = await getTransactionByTid(transactionId);
        setTransactionDto(responseData);
        //setTransactionDto(mockData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if(loginUser) {
      void fetchTransaction();
    } else if(loginUser === null) {
      void navigate({to: "/login"});
    }
  }, [loginUser]);

  return (
      <Container>
        <Typography variant="h6" sx={{m: 1}}>
          Check Out
        </Typography>
        {
          transactionDto && !isLoading
              ? (
                  <>
                    <CheckOutGridTable transactionDto={transactionDto}/>
                    <Paper
                        elevation={2}
                        sx={{
                          m: 1,
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-end"
                        }}
                    >
                      <Typography
                          variant="h5"
                          align="right"
                          sx={{m: 1}}
                      >
                        Total: HK${transactionDto.total.toLocaleString()}
                      </Typography>
                      <Tooltip title="Click to pay">
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PaymentRoundedIcon/>}
                            sx={{
                              textTransform: "none",
                              borderRadius: 50,
                              backgroundColor: "#607D8B",
                              width: "auto"
                            }}
                            onClick={handlePayClick}
                            disabled={isPaying || isLoading}
                        >
                          {isPaying ? "Processing..." : "Proceed to Payment"}
                        </Button>
                      </Tooltip>
                    </Paper>
                  </>
              ) : (
                  <LoadingContainer/>
              )
        }
      </Container>
  )
}