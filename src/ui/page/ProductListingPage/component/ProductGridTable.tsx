import {Box, Grid} from "@mui/material";
import ProductGridTableRow from "./ProductGridTableRow.tsx";
import {useEffect, useState} from "react";
//import mockData from "../response.json";
import type {GetAllProductDto} from "../../../../data/product/ProductDto.type..ts";
import LoadingContainer from "../../../component/LoadingContainer.tsx";
import {useNavigate} from "@tanstack/react-router";
import {getAllProduct} from "../../../../api/productApi.ts";

export default function ProductGridTable() {
  const navigate = useNavigate({from: "/"});

  const [productDtoList, setProductDtoList] = useState<GetAllProductDto[] | undefined>(undefined);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDtoList = async () => {
      try {
        const responseData = await getAllProduct();
        setProductDtoList(responseData);
        //setProductDtoList(mockData);
        setIsLoading(false);
        document.title = "Aniposter";
      } catch {
        void navigate({to: "/error"});
      }
    }
    void fetchProductDtoList();
  }, []);

  return (
      productDtoList && !isLoading
      ? (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{m: 2}}>
              {
                productDtoList &&
                productDtoList.map((productDto) => (
                    <Grid key={productDto.pid} size={{xs:12, sm:6, md:4, lg: 3}}>
                      <ProductGridTableRow productDto={productDto}/>
                    </Grid>
                ))
              }
            </Grid>
          </Box>
          )
          : (
              <LoadingContainer />
          )
  )
}