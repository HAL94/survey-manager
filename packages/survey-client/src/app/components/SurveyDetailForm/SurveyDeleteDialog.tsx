import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useDeleteSurveyById } from '../../hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number | string;
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SurveyDeleteDialog = ({ id, isOpen, onOpen, onClose, title }: Props) => {
  const cancelRef = React.useRef<any>();
  const { isLoading, data, mutate } = useDeleteSurveyById(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.success) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {!isLoading && data && data.success && (
            <Alert variant="success">
              <Text>Successfully deleted survey</Text>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </Alert>
          )}
          {isLoading && <Spinner size={'lg'} />}
          {!isLoading && !data?.success && <>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add Survey
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                Are you sure you would like to delete the survey: {title}?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => mutate(id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </>}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SurveyDeleteDialog;
