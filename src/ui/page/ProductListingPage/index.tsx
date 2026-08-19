import {Typography} from "@mui/material";
import ProductGridTable from "./component/ProductGridTable.tsx";

export default function ProductListingPage() {
  return (
      <>
        <Typography variant="h6">Product Listing Page</Typography>
        <ProductGridTable />
      </>
  )
}