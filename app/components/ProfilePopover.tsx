import { Button, Popover, Text } from 'antd';

import CreatorProfileAddress from '@/components/Creator/CreatorProfileAddress/CreatorProfileAddress';

const ProfilePopOver = ({ profileAddress }) => {
  return (
    <>
      <Button>Avatar</Button>

      <Popover>
        <Text>profileAddress</Text>
      </Popover>
    </>
  );
};

export default ProfilePopOver;
