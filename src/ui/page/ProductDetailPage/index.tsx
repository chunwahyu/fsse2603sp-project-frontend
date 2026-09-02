import {Box, Button, CircularProgress, Grid, Stack, Typography} from "@mui/material";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useNavigate, useParams} from "@tanstack/react-router";
import QuantitySelector from "../../component/QuantitySelector.tsx";
//import mockData from "./response.json"
import {useContext, useEffect, useState} from "react";
import type {ProductDetailDto} from "../../../data/product/ProductDto.type..ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import {putCartItem} from "../../../api/cartItemApi.ts";
import {UserContext} from "../../../context/UserContext.jsx.ts";
import {getProductByPid} from "../../../api/productApi.ts";

export default function ProductDetailPage() {

  const {productId} = useParams({from: "/product/$productId"});
  const navigate = useNavigate({from: "/product/$productId"});

  const loginUser = useContext(UserContext);

  const [productDetailDto, setProductDetailDto] = useState<ProductDetailDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);

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
    }

    if(productDetailDto && loginUser) {
      setIsAddingToCart(true);
      await putCartItem(productDetailDto.pid, quantity);
      setIsAddingToCart(false);
      setIsSuccessAddToCart(true);

      setTimeout(()=> {
        setIsSuccessAddToCart(false);
      }, 3000);
    }
  }

  useEffect(() => {

    const fetchProductByPid = async () => {
      try {
        const responseData = await getProductByPid(productId);
        setProductDetailDto(responseData);
        //setProductDetailDto(mockData);
        setIsLoading(false);
        document.title = responseData.name;
        //document.title = productId;
      } catch {
        void navigate({to: "/error"});
      }
    }
    void fetchProductByPid();
  }, []);

  return (
      <>
        <TopNavigationBar />

        <Grid container spacing={4} sx={{alignItems: "center", m: 4}}>

          {
            productDetailDto && !isLoading
              ? (
                  <>
                    <Grid size={{xs:12, sm:12, md:6}} sx={{display: "flex", justifyContent: "center"}}>
                      <Box
                          component="img"
                          src={productDetailDto.imageUrl}
                          alt="poster image"
                          sx={{
                            width: "auto",
                            maxHeight: 500,
                            border: "2px solid black",
                            boxShadow: 3
                          }}
                      />
                    </Grid>

                    <Grid size={{xs:12, sm:12, md:6}} sx={{display: "flex", justifyContent: "center"}}>
                      <Box
                        component="div" sx={{display:"flex", flexDirection: "column", gap: 1.5}}
                      >
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Name: {productDetailDto.name}</Typography>
                        <Typography variant="h6" color="error">Price: HK${productDetailDto.price.toLocaleString()}</Typography>
                        <Typography variant="body1"><b>Description:</b> {productDetailDto.description}</Typography>
                        <Typography variant="body1"><b>Stock:</b> {productDetailDto.stock}</Typography>
                        <Stack direction={"row"}>
                          <QuantitySelector
                              quantity={quantity}
                              handleQuantityMinusOne={handleQuantityMinusOne}
                              handleQuantityPlusOne={handleQuantityPlusOne}
                          />
                          {
                            isSuccessAddToCart
                              ? (
                                  <Button color="success" disabled={true}>
                                    Added to Cart Successfully
                                  </Button>
                                ) : (
                                  <Button
                                      size={"large"}
                                      startIcon={<AddShoppingCartRoundedIcon />}
                                      disabled={productDetailDto.stock <= 0}
                                      onClick={handleAddToCart}
                                  >
                                    {isAddingToCart ? <CircularProgress/> : "Add to cart"}
                                  </Button>
                                )
                          }
                        </Stack>
                      </Box>
                    </Grid>
                  </>
                )
                : (
                    <LoadingContainer />
                )
          }
        </Grid>
      </>
  )
}