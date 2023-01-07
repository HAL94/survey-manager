import { Box, VStack, Heading, Flex } from '@chakra-ui/react'
interface Props {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const QuestionBase = ({ children, title }: Props) => {
  return (
    <Box marginX="auto" width="full" maxWidth={"640px"} marginY={1} minHeight={50} px={3} pt={4} pb={4} borderRadius="3px">
      <VStack display="flex" justifyContent={"start"} alignItems="center">
        <Flex flexDir={"column"} justifyContent="start" alignItems={"center"} alignSelf="flex-start" pb={1}>
          <Heading width="full" size={"sm"} fontWeight="semibold">{title}</Heading>
        </Flex>
        {children}
      </VStack>
    </Box>
  )
}

export default QuestionBase
