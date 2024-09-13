import { css } from '_panda/css';
import { Box } from '_panda/jsx';

import Header from '@/components/Layout/Header_v2';

// import Header from '@/components/Layout/Header2';
import DevClient from './Client';

async function DevPage() {
  // const data = await getUser();

  return (
    <Box p={32}>
      <Header />
      <h1>server</h1>

      {/* <div>
        <h3>User</h3>
        <div>{JSON.stringify(data)}</div>
      </div> */}
      <hr className={dividerStyle} />
      <h1>client</h1>
      <DevClient />
    </Box>
  );
}

export default DevPage;

const dividerStyle = css({
  margin: '24px 0',
});