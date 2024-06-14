import { Box } from '@chakra-ui/react';
import LoadingBar from 'react-redux-loading-bar';

export default function CustomLoading() {
  const loadingBarStyle = {
    backgroundColor: '#1D566E',
  };

  return (
    <Box position="sticky" top={0} zIndex={9999}>
      <LoadingBar style={loadingBarStyle} />
    </Box>
  );
}
