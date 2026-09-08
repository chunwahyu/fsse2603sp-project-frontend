import {Box, Button, Container, Paper, Tooltip, Typography} from "@mui/material";
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext.ts";
import ShoppingCartGridTable from "./component/ShoppingCartGridTable.tsx";
import type {CartItemDto} from "../../../data/cartItem/cartItem.type.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import {prepareTransaction} from "../../../api/transactionApi.ts";
import {getUserCart} from "../../../api/cartItemApi.ts";
import {useNavigate} from "@tanstack/react-router";
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';

export default function ShoppingCartPage() {
  const navigate = useNavigate({from: "/cart/"});
  const loginUser = useContext(UserContext);

  const [userCartList, setUserCartList] = useState<CartItemDto[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateTotal = (userCartList: CartItemDto[]) => {
    return userCartList.reduce((previousValue, cartItem) => (
      previousValue + cartItem.cartQuantity * cartItem.price
    ), 0);
  }

  const handleQuantityChangeByPid= (pid: number, quantity: number) => {
    if (userCartList) {
      setUserCartList(userCartList.map((cartItem: CartItemDto) => {
        if (cartItem.pid === pid) {
          cartItem.cartQuantity = quantity;
        }
        return cartItem;
        }));
    }
  }

  const handleDeleteByPid = (pid: number) => {
    if(userCartList) {
      setUserCartList(
          userCartList.filter((cartItem) => (
              cartItem.pid !== pid
          ))
      );
    }
  }

  const handleCheckOutClick = async () => {
    try {
      setIsCheckingOut(true);
      const responseData = await prepareTransaction();
      void navigate({
        to: "/checkout/$transactionId",
        params: {transactionId: responseData.tid.toString()}
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsCheckingOut(false);
    }
  }

  useEffect(() => {
    document.title = "Shopping Cart";
  }, []);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        setIsLoading(true);
        const responseData = await getUserCart();
        setUserCartList(responseData);
      } catch (error) {
        console.log(error);
        void navigate({to:"/error"});
      } finally {
        setIsLoading(false);
      }
    }
    if(loginUser) {
      void fetchUserCart();
    } else if(loginUser === null) {
      void navigate({to: "/login"});
    }
  }, [loginUser, navigate]);

  return (
      <>
        <TopNavigationBar />
        <Container>
          <Typography
              variant="h5"
              sx={{m:2, fontWeight: "500"}}
          >
            Shopping Cart
          </Typography>
          {
            isLoading
              ? (
                    <LoadingContainer/>
                ) : userCartList && userCartList.length > 0
                    ? (
                        <>
                          <ShoppingCartGridTable
                              userCartList={userCartList}
                              handleQuantityChangeByPid={handleQuantityChangeByPid}
                              handleDeleteByPid={handleDeleteByPid}
                          />
                          <Paper elevation={2} sx={{m: 1, p: 2}}>
                            <Typography
                                variant="h5"
                                align="right"
                                sx={{m:1, fontWeight:700}}
                            >
                              Total: HK${calculateTotal(userCartList).toLocaleString()}
                            </Typography>
                            <Box
                                sx={{
                                  display:"flex",
                                  justifyContent:"flex-end",
                                  m:1
                                }}
                            >
                              <Tooltip title="Click to check out">
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingCartCheckoutRoundedIcon />}
                                    disabled={isLoading || isCheckingOut || userCartList.length <= 0}
                                    onClick={handleCheckOutClick}
                                    sx={{backgroundColor: "#607D8B", borderRadius: 50}}
                                    size={"large"}
                                >
                                  {isCheckingOut ? "Processing..." : "Check Out"}
                                </Button>
                              </Tooltip>
                            </Box>
                          </Paper>
                        </>
                      ) : (
                        <Paper
                            sx={{
                              p: 5,
                              textAlign: "center"
                            }}
                            elevation={2}
                        >
                          <Typography variant="h6" gutterBottom>
                            Your shopping cart is empty.
                          </Typography>
                          <Tooltip title="Back to home page">
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingBagRoundedIcon/>}
                                onClick={() => navigate({ to: "/" })}
                                sx={{
                                  mt: 2,
                                  borderRadius:50,
                                  backgroundColor:"#607D8B"
                                }}
                            >
                              Go Shopping
                            </Button>
                          </Tooltip>
                        </Paper>
                    )
          }
        </Container>
      </>
  )
}