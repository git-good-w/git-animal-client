import React from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';

export function AlertDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content>
        <Dialog.Title className={titleStyle}>{props.title}</Dialog.Title>
        <Dialog.Description className={descriptionStyle}>{props.description}</Dialog.Description>
        <Flex gap="8px" justifyContent="flex-end" width="100%">
          <Button onClick={props.onClose} variant="primary" size="m">
            Close
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
}
const titleStyle = css({
  textStyle: 'glyph20.regular',
  textAlign: 'left',
});

const descriptionStyle = css({
  textStyle: 'glyph16.regular',
  textAlign: 'left',
  color: 'white.white_75',
  width: '100%',
});
