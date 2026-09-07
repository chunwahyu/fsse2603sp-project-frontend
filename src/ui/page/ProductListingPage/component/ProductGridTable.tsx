import {Box, Grid, IconButton, InputAdornment, Pagination, TextField} from "@mui/material";
import ProductGridTableRow from "./ProductGridTableRow.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import type {GetAllProductDto} from "../../../../data/product/ProductDto.type.ts";
import LoadingContainer from "../../../component/LoadingContainer.tsx";
import {useNavigate} from "@tanstack/react-router";
import {getAllProduct} from "../../../../api/productApi.ts";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
//import mockData from "../response.json";

const ITEMS_PER_PAGE = 8;

export default function ProductGridTable() {
  const navigate = useNavigate({from: "/"});

  const [productDtoList, setProductDtoList] = useState<GetAllProductDto[] | undefined>(undefined);
  const[isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const filteredItems = productDtoList?.filter((result) => (result.name.toLowerCase().includes(searchValue.toLowerCase())));
  const totalPages = Math.ceil((filteredItems?.length || 0) / ITEMS_PER_PAGE);
  const selectedItems = filteredItems?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1);
  }

  const handleClearSearch = () => {
    setSearchValue("");
    setPage(1);
  }

  return (
      productDtoList && !isLoading
      ? (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  m:2
                }}
            >
              <TextField
                  size="small"
                  variant="outlined"
                  label="Search Poster"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  sx={{width: "360px"}}
                  slotProps={{
                    input: {
                      startAdornment: (
                          <InputAdornment position="start">
                            <SearchRoundedIcon />
                          </InputAdornment>
                      ),
                      endAdornment: searchValue && (
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="clear search text"
                                onClick={handleClearSearch}
                            >
                              <CancelRoundedIcon/>
                            </IconButton>
                          </InputAdornment>
                      )
                    },
                  }}
              />
            </Grid>
            <Grid
                container
                spacing={2}
                sx={{m: 2}}
            >
              {
                productDtoList &&
                selectedItems?.map((productDto) => (
                    <Grid key={productDto.pid} size={{xs:12, sm:6, md:4, lg: 3}}>
                      <ProductGridTableRow productDto={productDto}/>
                    </Grid>
                ))
              }
            </Grid>
            {
              totalPages > 0 && (
                    <Grid
                        spacing={2}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          m:2}}
                    >
                      <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handlePageChange}
                          size="large"
                          showFirstButton
                          showLastButton
                          sx={{color: "#607D8B"}}
                      />
                    </Grid>
                )
            }
          </Box>
          )
          : (
              <LoadingContainer />
          )
  )
}