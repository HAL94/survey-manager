import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BiDotsVerticalRounded, BiTrash } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SurveyDeleteDialog from '../SurveyDetailForm/SurveyDeleteDialog';

interface Props {
  id: number | string;
  title: string;
  description: string;
}

const SurveyCard: React.FC<Props> = ({ id, title, description }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card p={3} marginY={10} className="border">
      <CardHeader>
        <Box display="flex" justifyContent="between" alignItems="center">
          <Heading size={'lg'}>{title}</Heading>
          <Box
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            marginLeft="auto"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BiDotsVerticalRounded />}
                variant="outline"
              />

              <MenuList>
                <MenuItem
                  icon={<BsEye size={20} />}
                  onClick={() => navigate(`/survey/${id}`)}
                >
                  View
                </MenuItem>
                <MenuItem icon={<BiTrash size={20} />} onClick={onOpen}>
                  Delete
                  <SurveyDeleteDialog
                    id={id}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    title={title}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </CardHeader>
      <CardBody>
        <Box display="flex" justifyContent="between" alignItems="center">
          <Text size="md">{description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default SurveyCard;
