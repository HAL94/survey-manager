import { Container } from '@chakra-ui/react'

const ContentContainer = ({ children }: { children: JSX.Element | JSX.Element[] | React.ReactNode[] }) => {
  return <Container maxW="container.xl" marginY={10}>{children}</Container>;
};

export default ContentContainer;
