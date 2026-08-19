import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function BottomFooter() {
  return (
      <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: "#F0EEE9",
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
      >
        <Container maxWidth="lg">
          <Stack
              component="div"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                textAlign: {xs: 'center', sm: 'left'},
                alignItems: "center"
              }}
          >
            {/* Copyright */}
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </Typography>

            {/* Quick Links */}
            <Stack direction="row" spacing={3}>
              <Link href="#" color="text.secondary" variant="body2" underline="hover">Privacy</Link>
              <Link href="#" color="text.secondary" variant="body2" underline="hover">Terms</Link>
              <Link href="#" color="text.secondary" variant="body2" underline="hover">Contact</Link>
            </Stack>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="inherit" component="a" href="#">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="inherit" component="a" href="#">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="inherit" component="a" href="#">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
  )
}
