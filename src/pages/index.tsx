import { Heading, Text, Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Board - ToDo app</title>
			</Head>
			<Flex>

				<Heading color="purple" noOfLines={0}>
					Primeiro aplicativo com <Text color="blue">next.js</Text>
				</Heading>
			</Flex>
		</>
	)
}
