import {
  Alert, AlertTitle,
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useNavigate, useParams} from "@tanstack/react-router";
import QuantitySelector from "../../component/QuantitySelector.tsx";
import {useContext, useEffect, useState} from "react";
import type {ProductDetailDto} from "../../../data/product/ProductDto.type.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import {putCartItem} from "../../../api/cartItemApi.ts";
import {UserContext} from "../../../context/UserContext.ts";
import {getProductByPid} from "../../../api/productApi.ts";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import axios from "axios";

export default function ProductDetailPage() {

  const {productId} = useParams({from: "/product/$productId"});
  const navigate = useNavigate({from: "/product/$productId"});

  const loginUser = useContext(UserContext);

  const [productDetailDto, setProductDetailDto] = useState<ProductDetailDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);
  const [isQuantityExceedStock, setIsQuantityExceedStock] = useState(false);

  const handleQuantityMinusOne = ()=> {
    if(quantity > 1) {
      setQuantity((prevState) => (prevState - 1));
    }
  }

  const handleQuantityPlusOne = ()=> {
    if(productDetailDto && quantity < productDetailDto.stock) {
      setQuantity((prevState) => (prevState + 1));
    }
  }

  const handleAddToCart = async () => {
    if(loginUser === null) {
      void navigate({to: "/login"});
      return;
    }
    if(productDetailDto && loginUser) {
      try {
          setIsAddingToCart(true);
          setIsQuantityExceedStock(false);
          await putCartItem(productDetailDto.pid, quantity);
          setIsSuccessAddToCart(true);
          setTimeout(()=> {
            setIsSuccessAddToCart(false);
          }, 3000);
      } catch (error: unknown) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            setIsQuantityExceedStock(true);
          }
        }
      } finally {
        setIsAddingToCart(false);
      }
    }
  }

  useEffect(() => {
    const fetchProductByPid = async () => {
      try {
        setIsLoading(true);
        const responseData = await getProductByPid(productId);
        setProductDetailDto(responseData);
        document.title = responseData.name;
      } catch(error) {
        console.log(error);
        void navigate({to: "/error"});
      } finally {
        setIsLoading(false);
      }
    }
    void fetchProductByPid();
  }, [navigate, productId]);

  return (
      <>
        <TopNavigationBar />
        <Grid
            container
            spacing={4}
            sx={{
              alignItems: "center",
              p: 4
            }}
        >
          {
            isLoading ?  <LoadingContainer />
                : (
                    productDetailDto && (
                        <>
                          <Grid
                              size={{xs:12, sm:12, md:6}}
                              sx={{
                                display: "flex",
                                justifyContent: "center"
                              }}
                          >
                            <Box
                                component="img"
                                src={productDetailDto.imageUrl}
                                alt="poster image"
                                sx={{
                                  width: "auto",
                                  maxHeight: 500,
                                  objectFit: "contain",
                                  border: "2px solid black",
                                  boxShadow: 3
                                }}
                            />
                          </Grid>
                          <Grid
                              size={{xs:12, sm:12, md:6}}
                              sx={{
                                display: "flex",
                                justifyContent: "center"
                              }}
                          >
                            <Box
                                component="div"
                                sx={{
                                  display:"flex",
                                  flexDirection: "column",
                                  gap: 1.5
                                }}
                            >
                              <Typography
                                  variant="h6"
                                  sx={{fontWeight: "bold"}}
                              >
                                Name: {productDetailDto.name}
                              </Typography>
                              <Typography
                                  variant="h6"
                                  color="error"
                              >
                                Price: HK${productDetailDto.price.toLocaleString()}
                              </Typography>
                              <Typography variant="body1">
                                <b>Description:</b> {productDetailDto.description}
                              </Typography>
                              <Typography variant="body1">
                                <b>Stock:</b> {productDetailDto.stock}
                              </Typography>
                              <Stack direction={"row"}>
                                <QuantitySelector
                                    quantity={quantity}
                                    handleQuantityMinusOne={handleQuantityMinusOne}
                                    handleQuantityPlusOne={handleQuantityPlusOne}
                                />
                                {
                                  isSuccessAddToCart
                                      ? (
                                          <Button
                                              variant="contained"
                                              size="large"
                                              color="success"
                                              startIcon={<DoneRoundedIcon/>}
                                              sx={{
                                                borderRadius: 50,
                                                textTransform:"none"
                                              }}
                                          >
                                            Added to Cart Successfully
                                          </Button>
                                      ) : (
                                          <Button
                                              variant="contained"
                                              size={"large"}
                                              startIcon={<AddShoppingCartRoundedIcon />}
                                              disabled={productDetailDto.stock <= 0}
                                              onClick={handleAddToCart}
                                              sx={{
                                                borderRadius: 50,
                                                backgroundColor: "#607D8B"
                                              }}
                                          >
                                            {isAddingToCart
                                                ? <CircularProgress enableTrackSlot sx={{color: "#607D8B"}}/>
                                                : "Add to cart"
                                            }
                                          </Button>
                                      )
                                }
                              </Stack>
                              {
                                isQuantityExceedStock &&
                                  <Alert
                                      severity="info"
                                      color="error"
                                      onClose={()=>{setIsQuantityExceedStock(false)}}
                                  >
                                      <AlertTitle>Unable to add to cart</AlertTitle>
                                      Not enough stock.
                                  </Alert>
                              }
                            </Box>
                          </Grid>
                          <Tooltip title="Back to list">
                            <Fab
                                size="small"
                                aria-label="back"
                                sx={{
                                  position:"fixed",
                                  right: 20,
                                  top: 120,
                                  zIndex:1000,
                                  backgroundColor: "#607D8B"
                                }}
                                onClick={()=>{void navigate({to:"/"})}}
                            >
                              <ArrowBackRoundedIcon />
                            </Fab>
                          </Tooltip>
                        </>
                    )
                )
          }
        </Grid>
      </>
  )
}