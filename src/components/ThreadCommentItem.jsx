import React from 'react';
import {
  Avatar, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ThreadUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ThreadCommentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ThreadUserShape),
};

function ThreadCommentItem({
  content,
  createdAt,
  owner,
}) {
  const formattedDate = format(new Date(createdAt), 'dd MMM yyyy HH:mm');

  return (
    <CardBody m={-2}>
      <Card bg="#FFFFFF">
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="#3AB5AD"
          p={2}
          borderBottom="1px solid #3AB5AD"
        >
          <Flex align="center" gap={2}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            <Heading as="p" fontSize="lg" fontFamily="Montserrat" color="#FFFFFF">
              {owner.name}
            </Heading>
          </Flex>
        </CardHeader>
        <CardBody mt={5} p={5}>
          <Text as="div" color="#1A202C" fontFamily="Montserrat">
            {parse(content)}
          </Text>
        </CardBody>
        <CardFooter bg="white" p={2}>
          <Text color="black">{formattedDate}</Text>
        </CardFooter>
      </Card>
    </CardBody>
  );
}

ThreadCommentItem.propTypes = {
  ...ThreadCommentShape,
};

export default ThreadCommentItem;
